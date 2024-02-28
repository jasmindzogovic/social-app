const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err);
  process.exit(1);
});

dotenv.config();
const app = require("./index");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database connection established"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
