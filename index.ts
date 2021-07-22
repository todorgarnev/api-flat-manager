import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send("Hello World!");
}
);

try {
  app.listen(process.env.PORT, (): void => {
    console.log(`Connected successfully on port ${process.env.PORT} ⚡`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}