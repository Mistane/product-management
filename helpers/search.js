module.exports = (query) => {
  const objectSearch = {
    keyword: "",
    regex: "",
  };
  objectSearch.keyword = query.keyword;
  if (objectSearch.keyword) {
    objectSearch.regex = new RegExp(objectSearch.keyword, "i");
  }
  return objectSearch;
};
