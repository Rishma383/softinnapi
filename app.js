const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Router
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const clientsRouter = require("./routes/clients");
const countryStateRouter = require("./routes/countryState");
const hotelRouter = require("./routes/hotelDetail");
const roomtypeRouter = require("./routes/roomtype");
const roomRouter = require("./routes/rooms");
const itemtypesRouter = require("./routes/itemtypes");
const itemcategoriesRouter = require("./routes/itemcategories");
const kitchenRouter = require("./routes/kitchens");
const discountRouter = require("./routes/discounts");
const menucodeRouter = require("./routes/menucodes");
const menuitemRouter = require("./routes/menuitems");
const tableRouter = require("./routes/tables");
const restaurantRouter = require("./routes/restaurants");
const staffRouter = require("./routes/staffs");
const customerRouter = require("./routes/customers");
const cartRouter = require("./routes/carts");
const orderRouter = require("./routes/orders");
// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");
global.__basedir = __dirname;
// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/admin", usersRouter);
app.use("/api/client", clientsRouter);
app.use("/api/countrystate", countryStateRouter);
app.use("/api/hotel",hotelRouter);
app.use("/api/roomtype",roomtypeRouter);
app.use("/api/room",roomRouter);
app.use("/api/itemtypes",itemtypesRouter);
app.use("/api/itemcategory",itemcategoriesRouter);
app.use("/api/kitchen",kitchenRouter);
app.use("/api/discount",discountRouter);
app.use("/api/menucode",menucodeRouter);
app.use("/api/menuitem",menuitemRouter);
app.use("/api/table",tableRouter);
app.use("/api/restaurant",restaurantRouter);
app.use("/api/staff",staffRouter);
app.use("/api/customer",customerRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.use(express.static('public'));  
app.use('/menuItem', express.static('menuItemImage'));
// route included
//app.use("/payment", paymentRouter);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
