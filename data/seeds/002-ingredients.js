const seed_data = [
  //vegetable
  {id: 1, name: 'asparagus', category: 'vegetable'},
  {id: 2, name: 'avacado', category: 'vegetable'},
  {id: 3, name: 'canned beans', category: 'vegetable'},
  {id: 4, name: 'green beans', category: 'vegetable'},
  {id: 5, name: 'beets', category: 'vegetable'},
  {id: 6, name: 'bell peppers', category: 'vegetable'},
  {id: 7, name: 'broccoli', category: 'vegetable'},
  {id: 8, name: 'brussels sprouts', category: 'vegetable'},
  {id: 9, name: 'cabbage', category: 'vegetable'},
  {id: 10, name: 'carrots', category: 'vegetable'},
  {id: 11, name: 'cauliflower', category: 'vegetable'},
  {id: 12, name: 'celery', category: 'vegetable'},
  {id: 13, name: 'corn', category: 'vegetable'},
  {id: 14, name: 'cucumber', category: 'vegetable'},
  {id: 15, name: 'eggplant', category: 'vegetable'},
  {id: 16, name: 'green chilies', category: 'vegetable'},
  {id: 17, name: 'greens', category: 'vegetable'},
  {id: 18, name: 'kale', category: 'vegetable'},
  {id: 19, name: 'leeks', category: 'vegetable'},
  {id: 20, name: 'mixed vegetables', category: 'vegetable'},
  {id: 21, name: 'mushrooms', category: 'vegetable'},
  {id: 22, name: 'onions', category: 'vegetable'},
  {id: 23, name: 'green onions', category: 'vegetable'},
  {id: 24, name: 'red onions', category: 'vegetable'},
  {id: 25, name: 'peas', category: 'vegetable'},
  {id: 26, name: 'potatoes', category: 'vegetable'},
  {id: 27, name: 'sweet potatoes', category: 'vegetable'},
  {id: 28, name: 'pumpkin', category: 'vegetable'},
  {id: 29, name: 'radishes', category: 'vegetable'},
  {id: 30, name: 'rhubarb', category: 'vegetable'},
  {id: 31, name: 'salad greens', category: 'vegetable'},
  {id: 32, name: 'spinach', category: 'vegetable'},
  {id: 33, name: 'canned tomatoes', category: 'vegetable'},
  {id: 34, name: 'fresh tomatoes', category: 'vegetable'},
  {id: 35, name: 'tomato sauce', category: 'vegetable'},
  {id: 36, name: 'turnips', category: 'vegetable'},
  {id: 37, name: 'winter squash', category: 'vegetable'},
  {id: 38, name: 'zucchini', category: 'vegetable'},
  //fruits
  {id: 39, name: 'apples', category: 'fruit'},
  {id: 40, name: 'applesauce', category: 'fruit'},
  {id: 41, name: 'bananas', category: 'fruit'},
  {id: 42, name: 'blueberries', category: 'fruit'},
  {id: 43, name: 'cherries', category: 'fruit'},
  {id: 44, name: 'cranberries', category: 'fruit'},
  {id: 45, name: 'fresh cranberries', category: 'fruit'},
  {id: 46, name: 'frozen cranberries', category: 'fruit'},
  {id: 47, name: 'fruit juice', category: 'fruit'},
  {id: 48, name: 'grapes', category: 'fruit'},
  {id: 49, name: 'kiwi', category: 'fruit'},
  {id: 50, name: 'melon', category: 'fruit'},
  {id: 51, name: 'mixed fruits', category: 'fruit'},
  {id: 52, name: 'canned oranges', category: 'fruit'},
  {id: 53, name: 'fresh oranges', category: 'fruit'},
  {id: 54, name: 'peaches', category: 'fruit'},
  {id: 55, name: 'cream', category: 'fruit'},
  {id: 56, name: 'pears', category: 'fruit'},
  {id: 57, name: 'pineapple', category: 'fruit'},
  {id: 58, name: 'raisins', category: 'fruit'},
  {id: 59, name: 'rapberries', category: 'fruit'},
  {id: 60, name: 'strawberries', category: 'fruit'},
  {id: 61, name: 'watermelon', category: 'fruit'},
  //grains
  {id: 62, name: 'baking mix', category: 'grain'},
  {id: 63, name: 'barley', category: 'grain'},
  {id: 64, name: 'bread', category: 'grain'},
  {id: 65, name: 'bread crumbs', category: 'grain'},
  {id: 66, name: 'english muffin', category: 'grain'},
  {id: 67, name: 'bulgur', category: 'grain'},
  {id: 68, name: 'cornmeal', category: 'grain'},
  {id: 69, name: 'couscous', category: 'grain'},
  {id: 70, name: 'flour (all purpose', category: 'grain'},
  {id: 71, name: 'flour (whole wheat)', category: 'grain'},
  {id: 72, name: 'noodles', category: 'grain'},
  {id: 73, name: 'oats (old fashioned)', category: 'grain'},
  {id: 74, name: 'oats (quick)', category: 'grain'},
  {id: 75, name: 'oats (steel cut)', category: 'grain'},
  {id: 76, name: 'pasta', category: 'grain'},
  {id: 77, name: 'quinoa', category: 'grain'},
  {id: 78, name: 'cereal', category: 'grain'},
  {id: 79, name: 'rice (cooked)', category: 'grain'},
  {id: 80, name: 'rice (uncooked)', category: 'grain'},
  {id: 81, name: 'tortillas', category: 'grain'},
  {id: 82, name: 'whole grains', category: 'grain'},
  //dairy
  {id: 83, name: 'buttermilk', category: 'dairy'},
  {id: 84, name: 'cheese', category: 'dairy'},
  {id: 85, name: 'cottage cheese', category: 'dairy'},
  {id: 86, name: 'milk', category: 'dairy'},
  {id: 87, name: 'milk alternative', category: 'dairy'},
  {id: 88, name: 'ricotta cheese', category: 'dairy'},
  {id: 89, name: 'sour cream', category: 'dairy'},
  {id: 90, name: 'yogurt (flavored)', category: 'dairy'},
  {id: 91, name: 'yogurt (plain)', category: 'dairy'},
  //protein
  {id: 92, name: 'beans (canned)', category: 'protein'},
  {id: 93, name: 'beef', category: 'protein'},
  {id: 94, name: 'chicken (pre-cooked)', category: 'protein'},
  {id: 95, name: 'chicken (uncooked)', category: 'protein'},
  {id: 96, name: 'eggs', category: 'protein'},
  {id: 97, name: 'fish (all types)', category: 'protein'},
  {id: 98, name: 'fish (salmon)', category: 'protein'},
  {id: 99, name: 'fish (tuna)', category: 'protein'},
  {id: 101, name: 'lentils', category: 'protein'},
  {id: 102, name: 'split peas', category: 'protein'},
  {id: 103, name: 'nut butters', category: 'protein'},
  {id: 104, name: 'nuts and seeds', category: 'protein'},
  {id: 105, name: 'porking', category: 'protein'},
  {id: 106, name: 'refried beans', category: 'protein'},
  {id: 107, name: 'sausage', category: 'protein'},
  {id: 108, name: 'tofu', category: 'protein'},
  {id: 109, name: 'turkey', category: 'protein'},
]

// So we can import seed_data for testing
exports.ingredients_data = seed_data

exports.seed = knex => knex('ingredients').insert(seed_data);
