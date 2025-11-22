class dashboardController {
  async dashboard(req, res) {
    //[GET] ./admin/
    res.render("./admin/pages/dashboard/index");
  }
}

module.exports = new dashboardController();
