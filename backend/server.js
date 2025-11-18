import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5001;

// Global handlers to avoid process exit and to log useful info
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // do NOT exit; log and keep running for debugging
});

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
