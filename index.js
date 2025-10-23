const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const sequelize = require("./utils/db");
const bookingRoutes = require("./routers/bookingRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/booking", bookingRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

sequelize.sync().then(() => console.log("Database connected"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
