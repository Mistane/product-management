const Product = require("../.././models/project.model");
const filterStatusHelper = require("../.././helpers/filterStatus");
const searchHelper = require("../.././helpers/search");
const paginationHelper = require("../.././helpers/pagination");

class productsController {
  //[GET] /admin/products
  async index(req, res) {
    //------------query--------------------
    const find = {
      deleted: false,
    };

    //----------------------------------------

    //------------phan filterStatus------------
    const filterStatus = filterStatusHelper(req.query);
    if (req.query.status) {
      find.status = req.query.status;
    }
    //-------------------------------------------

    //------------phan tim kiem------------------
    const objectSearch = searchHelper(req.query);
    if (objectSearch.keyword) {
      find.title = objectSearch.regex;
    }

    //------------phan pagination----------------
    const objectPagination = paginationHelper(req.query);
    const productsCount = await Product.find(find);

    objectPagination.pages = Math.ceil(
      productsCount.length / objectPagination.limitItems,
    );

    objectPagination.productsSkip =
      (objectPagination.currentPage - 1) * objectPagination.limitItems;
    //-------------------------------------------
    const products = await Product.find(find)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.productsSkip);

    res.render("./admin/pages/products/index", {
      pageTitle: "Trang san pham",
      products,
      filterStatus,
      keyword: objectSearch.keyword,
      objectPagination,
    });
  }
  //[PATCH] /admin/products/change-status/:status/:id
  async changeStatus(req, res) {
    const { status, id } = req.params;
    await Product.updateOne({ _id: id }, { status: status });
    res.redirect(req.get("Referrer") || "/");
  }

  //[PATCH] /admin/products/change-multi
  async changeMulti(req, res) {
    let { type, ids } = req.body;
    ids = ids.split(",");
    switch (type) {
      case "active":
        await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        break;
      case "delete-all":
        await Product.updateMany(
          { _id: { $in: ids } },
          { deleted: true, deletedAt: new Date() },
        );
        break;
      default:
        break;
    }
    res.redirect(req.get("Referrer") || "/");
  }

  //[DELETE] /admin/products/delete/:id
  async delete(req, res) {
    const { id } = req.params;
    await Product.updateOne(
      { _id: id },
      { deleted: true, deletedAt: new Date() },
    );
    res.redirect(req.get("Referrer") || "/");
  }
}

module.exports = new productsController();
