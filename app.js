const express = require("express");
const methodOverride = require("method-override");
const app = express();
const db = require("./config/database");

app.use(express.static("public"));
app.use(methodOverride("_method"));

require("dotenv").config();
const port = process.env.PORT;

const Route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//local  variables
const systemVar = require("./config/system");
app.locals.prefixAdmin = systemVar.prefixAdmin;

//Routing
Route(app);
adminRoute(app);

db.connect();

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
