import express from "express";
import products from './data/Products.js';
import dotenv from "dotenv";
import connectDatabase from './config/MongoDb.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js'
import { notFound, errorHandler } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import cors from "cors";




dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());

//api
app.use('/image', express.static('./image'))
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);

// error
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API is running ....");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running ${PORT}`));