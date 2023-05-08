import express from "express";
import User from "./Models/UserModel.js";
import users from './data/users.js';
import Product from './Models/ProductModel.js'
import products from "./data/Products.js";
import asyncHandler from 'express-async-handler';

const ImportData = express.Router()

ImportData.post("/user", asyncHandler(
    async (req, res) => {
        try {
            await User.remove({})
            const importUser = await User.insertMany(users)
            res.send({
                importUser
            })
        } catch (error) {
            console.log('error');
        }
    }
));
ImportData.post("/products", asyncHandler(
    async (req, res) => {
        try {
            await Product.remove({})
            const importProducts = await Product.insertMany(products);
            res.send({
                importProducts
            })
        } catch (error) {
            console.log('error');
        }
    }
));

export default ImportData;