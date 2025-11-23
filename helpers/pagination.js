module.exports = (query) => {
  const objectPagination = {
    limitItems: 4,
    currentPage: 1,
    productsSkip: "",
    pages: "",
  };
  const currentPage = parseInt(query.page);
  if (currentPage && !isNaN(currentPage)) {
    objectPagination.currentPage = parseInt(currentPage);
  }
  return objectPagination;
};
