import express, { Application, NextFunction, Request, Response, Router } from "express";
import config from "./config/default";
import connect from "./src/db/connect";
import userRoutes from "./src/routes/user.routes";
import paymentRoutes from "./src/routes/payment.routes";

const port: number = config.PORT;
const host: string = config.HOST;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// should be a middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, OPTIONS");

  next();
});

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

try {
  app.listen(port, host, (): void => {
    console.log(`Server is listening at http://${host}:${port} ⚡`);

    connect();
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}