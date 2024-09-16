const express = require("express");
const { connectToMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const PORT = 3001;
// Creating a Connection to the mongoDB server
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDb Connected");
});

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// using the middleware to parse(process) the request's object body correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
