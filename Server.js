const express = require("express");
const PORT = process.env.PORT || 2030;
const app = express();
require("./Config/db");
const cors = require("cors");
const routerPath = require("./Controller/Router");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running");
});
app.use(cors({ origin: "*" }));

app.use("/api", routerPath);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
