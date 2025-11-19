const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

const route = require("./routes/client/index.route");

app.set("view engine", "pug");
app.set("views", "./views");

//Routing
route(app);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
