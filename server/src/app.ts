import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { ENV_VARIABLES } from "./config/constants";
import { errorHandler } from "./middlewares/error-handler";
import routes from "./routes";

dotenv.config();
const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",");
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. curl/postman) or from allowedOrigins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);

// middleware
app.use(express.json());
// app.use(morgan("dev"));

// Swagger
const swaggerDoc = YAML.load("./src/swagger.yml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// app routes & error handler
app.use("/api", routes);
app.use(errorHandler);

const PORT = ENV_VARIABLES.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
