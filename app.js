const express = require("express");
const path = require("path");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const methodOverride = require("method-override");
const app = express();
const db = require("./config/database");

app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));

//express-flash
app.use(cookieParser("Shinonome Ena"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

//tinyMce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce")),
);

require("dotenv").config();
const port = process.env.PORT;

const Route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

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
