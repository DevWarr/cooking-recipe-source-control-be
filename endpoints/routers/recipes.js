const router = require("express").Router();
const model = require("../models/recipes");
const tbl = "recipes";
const validate = require("../middleware/validate");

//add a recipe
router.post(`/${tbl}`, validate.token, validate.recipe, async (req, res) => {
  try {
    const new_recipe_id = await model.add_one({
      ...res.locals.recipe,
      owner_id: req.user.id
    });
    const new_recipe = await model.get_one({id: new_recipe_id})
    if (!new_recipe) throw {message: "There was an error adding a new recipe."}
    else {
      res.status(200).json(new_recipe);
    }
  } catch (err) {
    console.log("err", err);
    if (err && err.userError) res.status(400).json(err);
    else res.status(500).json(err);
  }
});

//get one recipe
router.get(`/${tbl}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await model.get_one({ id });
    recipe
      ? res.status(200).json(recipe)
      : res.status(404).json("No recipe found.");
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err);
  }
});

//get all recipes
router.get(`/${tbl}`, async (req, res) => {
  try {
    // If there is a search, use it. If no search, use an empty string
    const recipes = await model.get_all(req.query.title || "");

    recipes.length > 0
      ? res.status(200).json(recipes)
      : res.status(404).json("No recipes found.");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get(`/cookbook`, validate.token, async (req, res) => {
  const course = req.query.course;
  try {
    recipes = await model.get_by_course(req.user.id, course);
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a recipe
router.put(
  `/${tbl}/:id`,
  validate.token,
  validate.recipe,
  validate.user_recipe,
  async (req, res) => {
    try {
      const success = await model.update_one(req.params.id, {
        ...res.locals.recipe,
        owner_id: req.user.id
      });
      if (success) {
        const recipe = await model.get_one({id: req.params.id})
        return res.status(200).json(recipe)
      } else res.status(404).json(`Couldn't update recipe`);
    } catch (err) {
      if (err && err.userError) res.status(400).json(err);
      else res.status(500).json(err);
    }
  }
);

//terminate a recipe
router.delete(
  `/${tbl}/:id`,
  validate.token,
  validate.user_recipe,
  async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await model.remove_one(id);
      // ↑ Returns an array of the recipe, ↓ so we use the [0]th index.
      res.status(200).json(`${recipe[0].title} has been terminated.`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//terminate all recipes
router.delete(`/${tbl}`, validate.token, validate.admin, async (req, res) => {
  try {
    await model.remove_all();
    res.status(200).json("All recipes have been eliminated.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
