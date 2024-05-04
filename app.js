var express = require("express");
const connectDB = require("./controllers/db/db.js");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());

connectDB();

const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
