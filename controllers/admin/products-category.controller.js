const Record = require("../.././models/project.model-category");
const filterStatusHelper = require("../.././helpers/filterStatus");
const searchHelper = require("../.././helpers/search");
const paginationHelper = require("../.././helpers/pagination");
const createTreeHelper = require("../.././helpers/createCategoryTree");
const systemConfig = require("../.././config/system");

class productsCategoryController {
  //[GET] /admin/products-category
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
    const productsCount = await Record.find(find);

    objectPagination.pages = Math.ceil(
      productsCount.length / objectPagination.limitItems,
    );

    objectPagination.productsSkip =
      (objectPagination.currentPage - 1) * objectPagination.limitItems;
    //-------------------------------------------

    //--------sort----------------------------------------
    let sort = {};
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    if (sortKey && sortValue) {
      sort[sortKey] = sortValue;
    } else sort.position = "desc";

    const records = await Record.find(find);

    const newRecords = createTreeHelper(records);
    res.render("./admin/pages/products-category/index", {
      pageTitle: "Trang danh muc san pham",
      records: newRecords,
      filterStatus,
      keyword: objectSearch.keyword,
    });
  }
  //[PATCH] /admin/products-category/change-status/:status/:id
  async changeStatus(req, res) {
    const { status, id } = req.params;
    req.flash("success", "Cap nhat trang thai thanh cong !");
    await Record.updateOne({ _id: id }, { status: status });
    res.redirect(req.get("Referrer") || "/");
  }

  //[PATCH] /admin/products-category/change-multi
  async changeMulti(req, res) {
    let { type, ids } = req.body;
    ids = ids.split(",");
    switch (type) {
      case "active":
        await Record.updateMany({ _id: { $in: ids } }, { status: "active" });
        break;
      case "inactive":
        await Record.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        break;
      case "delete-all":
        await Record.updateMany(
          { _id: { $in: ids } },
          { deleted: true, deletedAt: new Date() },
        );
        break;
      case "change-pos":
        //lay ra id va pos tu ids
        ids.forEach(async (item) => {
          const [id, pos] = item.split("-");
          await Record.updateOne({ _id: id }, { position: pos });
        });
        break;
      default:
        break;
    }
    req.flash(
      "success",
      `Cap nhat trang thai cho ${ids.length} san pham thanh cong !`,
    );
    res.redirect(req.get("Referrer") || "/");
  }

  //[DELETE] /admin/products-category/delete/:id
  async delete(req, res) {
    const { id } = req.params;
    await Record.updateOne(
      { _id: id },
      { deleted: true, deletedAt: new Date() },
    );
    req.flash("success", "Xoa san pham thanh cong !");
    res.redirect(req.get("Referrer") || "/");
  }

  //[GET] /admin/products-category/create
  async create(req, res) {
    const records = await Record.find({ deleted: false });

    //create product category tree
    const newRecords = createTreeHelper(records);
    res.render("./admin/pages/products-category/create", {
      pageTitle: "Trang tao san pham",
      records: newRecords,
    });
  }

  //[POST] /admin/products-catogory/create
  async createPost(req, res) {
    if (req.body.position === "") {
      const count = await Record.countDocuments();
      req.body.position = count + 1;
    } else req.body.position = parseInt(req.body.position);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    const newRecord = new Record(req.body);
    await newRecord.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }

  //[GET] /admin/product-category/edit/:id
  async edit(req, res) {
    try {
      const id = req.params.id;
      const find = { deleted: false };
      if (id) {
        find._id = id;
      }
      const product = await Record.findOne({ _id: id });
      const records = await Record.find({});
      const newRecords = createTreeHelper(records);
      res.render("./admin/pages/products-category/edit", {
        product: product,
        records: newRecords,
      });
    } catch {
      res.redirect(req.get("Referrer") || "/");
    }
  }

  //[PATCH] /admin/products-category/edit/:id
  async editPatch(req, res) {
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position);
    req.body.stock = parseInt(req.body.stock);
    req.body.price = parseInt(req.body.price);
    const id = req.params.id;
    await Record.updateOne({ _id: id }, req.body);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }

  //[GET] /admin/products-category/detail/:id
  async detail(req, res) {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Record.findOne(find);
    res.render("admin/pages/products-category/detail", {
      pageTitle: product.title,
      product: product,
    });
  }
}

module.exports = new productsCategoryController();
