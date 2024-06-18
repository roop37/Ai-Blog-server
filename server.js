const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const blogPostRoutes = require("./routes/blogPostRoutes");
const commentRoutes = require("./routes/commentRoutes");
const connectDB = require("./utils/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/blogposts", blogPostRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
