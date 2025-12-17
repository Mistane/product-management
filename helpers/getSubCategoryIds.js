const ProductCategory = require(".././models/project.model-category");

module.exports.get = async (parentId) => {
  const getChildrenCategoryId = async (parentId) => {
    let subIds = [];
    let childIds = [];
    const children = await ProductCategory.find({
      deleted: false,
      status: "active",
      parent_id: parentId,
    });
    if (children.length == 0) {
      return [parentId];
    } else {
      for (const child of children) {
        childIds = await getChildrenCategoryId(child.id);
        subIds = subIds.concat(childIds);
      }
      subIds = subIds.concat(parentId);
      return subIds;
    }
  };
  const result = await getChildrenCategoryId(parentId);
  return result;
};
