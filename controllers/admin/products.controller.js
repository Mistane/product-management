const Product = require("../.././models/project.model");
const filterStatusHelper = require("../.././helpers/filterStatus");
const searchHelper = require("../.././helpers/search");
const paginationHelper = require("../.././helpers/pagination");
const systemConfig = require("../.././config/system");

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

    //--------sort----------------------------------------
    let sort = {};
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    if (sortKey && sortValue) {
      sort[sortKey] = sortValue;
    } else sort.position = "desc";
    const products = await Product.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.productsSkip);

    console.log(products);
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
    req.flash("success", "Cap nhat trang thai thanh cong !");
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
      case "change-pos":
        //lay ra id va pos tu ids
        ids.forEach(async (item) => {
          const [id, pos] = item.split("-");
          await Product.updateOne({ _id: id }, { position: pos });
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

  //[DELETE] /admin/products/delete/:id
  async delete(req, res) {
    const { id } = req.params;
    await Product.updateOne(
      { _id: id },
      { deleted: true, deletedAt: new Date() },
    );
    req.flash("success", "Xoa san pham thanh cong !");
    res.redirect(req.get("Referrer") || "/");
  }

  //[GET] /admin/products/create
  async create(req, res) {
    res.render("./admin/pages/products/create", {
      pageTitle: "Trang tao san pham",
    });
  }

  //[POST] /admin/products/create
  async createPost(req, res) {
    if (req.body.position === "") {
      const count = await Product.countDocuments();
      req.body.position = count + 1;
    } else req.body.position = parseInt(req.body.position);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.file) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }

  //[GET] /admin/product/edit/:id
  async edit(req, res) {
    try {
      const id = req.params.id;
      const find = { deleted: false };
      if (id) {
        find._id = id;
      }
      const product = await Product.findOne({ _id: id });
      res.render("./admin/pages/products/edit", { product: product });
    } catch {
      res.redirect(req.get("Referrer") || "/");
    }
  }

  //[PATCH] /admin/products/edit/:id
  async editPatch(req, res) {
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position);
    req.body.stock = parseInt(req.body.stock);
    req.body.price = parseInt(req.body.price);
    const id = req.params.id;
    await Product.updateOne({ _id: id }, req.body);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }

  //[GET] /admin/products/detail/:id
  async detail(req, res) {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  }
}

module.exports = new productsController();
