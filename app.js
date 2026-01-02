const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const fileRoutes = require("./routes/fileRoutes");
const ReelRoutes = require("./routes/ReelRoutes")

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use("/api/files", fileRoutes);


app.get("/", (req, res) => {
  res.send("File Upload API Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
