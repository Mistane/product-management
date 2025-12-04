let cnt = 1;
function create(arr, parentId = "") {
  let tree = [];
  arr.forEach((item) => {
    if (item.parent_id == parentId) {
      const newItem = item;
      newItem.index = cnt++;
      let children = create(arr, newItem.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports = (arr) => {
  cnt = 1;
  return create(arr);
};
