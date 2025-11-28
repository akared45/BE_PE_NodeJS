require("dotenv").config();
const {
  connect,
} = require("./src/infrastructure/database/nosql/mongoose_config");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const morgan = require("morgan");

//init middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//init routers
const authRoutes = require("./src/presentation/routes/AuthRoutes");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

(async () => {
  await connect();
})();
