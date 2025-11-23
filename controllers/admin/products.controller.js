const Product = require("../.././models/project.model");

class productsController {
  //[GET] /admin/products
  async index(req, res) {
    let filterStatus = [
      {
        name: "Tat ca",
        status: "",
        class: "",
      },

      {
        name: "Hoat dong",
        status: "active",
        class: "",
      },

      {
        name: "Dung hoat dong",
        status: "inactive",
        class: "",
      },
    ];

    const status = req.query.status;
    console.log(status);
    const find = {
      deleted: false,
    };
    if (status) {
      find.status = status;
      const idx = filterStatus.findIndex((item) => {
        return item.status === status;
      });
      filterStatus[idx].class = "active";
    } else {
      const idx = filterStatus.findIndex((item) => {
        return item.status === "";
      });
      filterStatus[idx].class = "active";
    }
    //------------phan tim kiem
    const keyword = req.query.keyword;
    if (keyword) {
      find.title = keyword;
    }
    const products = await Product.find(find);

    //-----------------------------------------

    res.render("./admin/pages/products/index", {
      pageTitle: "Trang san pham",
      products,
      filter: filterStatus,
      keyword,
    });
  }
}

module.exports = new productsController();
