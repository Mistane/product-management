const ProductCategory = require("../.././models/project.model-category");
const createTreeHelper = require("../.././helpers/createCategoryTree");

module.exports.category = async (req, res, next) => {
  const records = await ProductCategory.find({ deleted: false });
  let newRecords = createTreeHelper(records);

  res.locals.layoutProductCategory = newRecords;

  next();
};
