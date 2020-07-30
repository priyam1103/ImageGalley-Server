const express = require("express");
const app = express();
const config = require("./service/config");
const cors = require("cors");
const { connectDb } = require("./service/db");

app.use(cors());
app.use(express.static(__dirname + "/public"));
require("./service/routes")(app);
connectDb().then(() => {
  console.log("Connected to Db");
  const PORT = config.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`connected to PORT ${PORT}`);
  });
});
