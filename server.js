import express from "express";
import "dotenv/config";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";
import workDayRoutes from "./src/routes/workDay.route.js";
import activityRecordRoutes from "./src/routes/activityRecord.route.js";
import userProfileRoutes from "./src/routes/user.route.js"
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://log-metrics.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use("/api/auth", authRoutes);
app.use("/api/work-day" , workDayRoutes);
app.use("/api/activity-record" , activityRecordRoutes);
app.use("/api/user" , userProfileRoutes);

export default app;