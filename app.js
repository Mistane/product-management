const express = require("express");
const app = express();
const port = 3000;
const Route = require("./routes/client/index.route");

app.set("view engine", "pug");
app.set("views", "./views");

Route(app);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
