const jwt = require("jsonwebtoken");
const decode_jwt = require("jwt-decode");
const crypt = require("bcryptjs");
const settings = require("../../config/settings");
const user_model = require("../models/users");
const recipe_model = require("../models/recipes");

/**
 * Generates a token from the given information.
 * 
 * @param {Object}   user - User information
 * @param {string}   user.username - username of the user
 * @param {number}   user.id - id of the user form the database
 * @param {string[]} user.roles - roles the user currently has
 * 
 * @returns {Object<string, string>}
 */
const generate_token = user => {
  //token settings
  const payload = {
    username: user.username,
    id: user.id,
    roles: user.roles
  };
  const options = {
    expiresIn: settings.token_expiration_time
  };
  //create user token
  const token = jwt.sign(payload, settings.token_secret, options);
  //extract expiration date from token
  const expiration_date = new Date(decode_jwt(token).exp * 1000).toISOString();
  //return token and expiration date as object
  return { token, expiration_date };
};

/**
 * Create token for user upon signup/login.
 * 
 * If a user with the given username exists in the database, and the passwords match, this 
 * function sets the user information to `req.user`, the token information to `req.token`,
 * and calls `next()`.
 * 
 * If no user information is provided, or the user is not verified,
 * simply call `next()` without setting any information.
 * 
 * @param {Object}              req - Express Request object.
 * @param {Object}              req.body - Body of data from web request.
 * @param {string}              req.body.username - Username from web request.
 * @param {string}              req.body.username - Password from web request.
 * @param {Object<string, any>} res - Express Response object.
 * @param {Function}            next - Express Next function.
 */
const user = async (req, res, next) => {
  const { username, password } = req.body;
  //get user from database
  const user = await user_model.get_one({ username });
  if (user && crypt.compareSync(password, user.password)) {
    //remove password from response
    delete user.password;
    //store user and token in the request
    req.user = user;
    req.token = generate_token(user);
  }
  next();
};

/**
 * Checks the user has a token and it's legit.
 * 
 * If a user has a token passed in the request headers, this function verifies the jwt.
 * If the token is verified, sets the user info to `req.user` and calls `next()`.
 * 
 * If no token is provided, or the token is not verified, responds with a `400`/`401` status.
 * 
 * @param {Object}              req - Express Request object.
 * @param {Object}              req.headers - headers from web request.
 * @param {string}              req.headers.authorization - Authorization within the request headers.
 * @param {Object<string, any>} res - Express Response object.
 * @param {Function}            next - Express Next function.
 */
const token = async (req, res, next) => {
  //grab and check for jwt
  const webtoken = req.headers.authorization;
  webtoken
    ? //check if token is valid
      jwt.verify(webtoken, settings.token_secret, (err, decoded_token) => {
        if (err) {
          //if not, send an error
          res.status(401).json({
            message: `Nice try. This token hasn't been validated by the Citadel of Ricks.`
          });
        } else {
          //otherwise move on
          req.user = decoded_token;
          next();
        }
      })
    : //send error if no token is provided
      res.status(404).json({ message: `What's the password?` });
};

/**
 * Checks the user roles and only allows a user to pass if they have the admin role.
 * 
 * REQUIRES the token function to be called before this function, as this needs
 * access to `req.user`.
 * 
 * @param {Object}                 req - Express Request object.
 * @param {Object}                 req.user - User object created from `validate.token`.
 * @param {string[]}               req.user.roles - array of roles the logged in user has.
 * @param {Object<string, any>}    res - Express Response object.
 * @param {Function}               next - Express Next function.
 */
const admin = (req, res, next) => {
  if (!req.user.roles.includes("admin")) {
    res
      .status(403)
      .json({ message: "You do not have permission to view this page." });
  } else next();
};

/**
 * Validates the incoming request to ensure a full recipe object has been given in the `req.body`.
 * 
 * If the recipe is valid, this function sets the recipe information to `res.locals.recipe` 
 * and calls `next()`.
 * 
 * If any required elements are missing from the recipe, responds with a `400` status.
 * 
 * @param {Object}                 req - Express Request object.
 * @param {Object<string, any>}    req.body - Recipe information from web request.
 * @param {Object<string, any>}    res - Express Response object.
 * @param {Function}               next - Express Next function.
 */
const recipe = (req, res, next) => {
  // title, ingredients, instructions, tags are required
  // desc, notes, img, are optional
  // The recipe needs EITHER a prep_time or cook_time
  const {
    title,
    ingredients,
    instructions,
    tags,
    description,
    notes,
    prep_time,
    cook_time,
    img
  } = req.body;

  // Check the required props. If they don't exist, put them in the array
  const missing = [];
  if (!title || !title.length) missing.push("title");
  if (!ingredients || !ingredients.length) missing.push("ingredients");
  if (!instructions || !instructions.length) missing.push("instructions");
  if (!tags || !tags.length) missing.push("tags");
  if (!prep_time && !cook_time) missing.push("prep_time and/or cook_time");

  // If the array has stuff, respond saying "Yo, we need the stuff"
  if (missing.length) {
    res.status(400).json({ message: "You are missing these fields:", missing });
  } else {
    // Otherwise, save our good ol recipe and go to the next() thing
    res.locals.recipe = {
      title,
      ingredients,
      instructions,
      tags,
      description: description || null,
      notes: notes,
      prep_time: prep_time || null,
      cook_time: cook_time || null,
      img: img || null
    };
    next();
  }
};

const user_recipe = (req, res, next) => {
  recipe_id = req.params.id;
  user_id = req.user.id;
  if (!recipe_id)
    res.status(400).json({ message: "You need a recipe id for this action!" });
  if (!user_id)
    res.status(400).json({ message: "You need a user id for this action!" });
  return recipe_model.get_one({ id: recipe_id }).then(recipe => {
    // Recipe doesn't exist? Error!
    if (!recipe)
      return res.status(404).json({ message: "No recipe found with this id." });
    // User owns to recipe OR user is the admin? Continue.
    if (recipe.owner.user_id === user_id || req.user.roles.includes("admin")) {
      next();
    } else {
      // Otherwise - 403
      return res
        .status(403)
        .json({ message: "You must be the owner of this recipe. Shoo." });
    }
  });
};

module.exports = {
  generate_token,
  user,
  token,
  admin,
  recipe,
  user_recipe
};