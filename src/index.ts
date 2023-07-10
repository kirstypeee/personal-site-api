import config from "./shared/config";
import express from "express";
import routes from "./routes/index"
const app = express();

app.use(express.json());

app.use('/api', routes)

app.listen(config.port, () => {
  console.log(`Server Started at ${config.port}`);
});
