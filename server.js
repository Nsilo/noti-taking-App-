const express = require("express");
const app = express();
const apiRoutes = require("./routes/api-routes");
const clientRoutes = require("./routes/client-routes");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", clientRoutes);

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
