import "./app/common/config/env.js";

import express, {
  Application,
  Request,
  Response,
  NextFunction
} from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import routes from "./app/routes.js";
import { connectDB } from "./app/common/config/db.js";
import { errorMiddleware } from "./app/common/middlewares/error.middleware.js";
import passport from "./app/common/config/passport.js";
import { ENV } from "./app/common/config/env.js";

const app: Application = express();


app.use(helmet());
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use(passport.initialize());


app.use("/api/v1", routes);


app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});


app.use(errorMiddleware);


const PORT: number = Number(ENV.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start", error);
    process.exit(1);
  }
};

startServer();
