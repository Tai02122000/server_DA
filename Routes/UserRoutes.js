import express from "express";
import asyncHandler from 'express-async-handler';
import User from './../Models/UserModel.js';
import genegateToken from "../utils/RenegateToken.js";
import protect from "../Middleware/AuthMiddleware.js";

const userRouter = express.Router()

// login
userRouter.post("/login", asyncHandler(
    async (req, res) => {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: genegateToken(user._id),
                createdAt: user.createAt,
            });
        } else {
            res.status(404);
            throw new Error("Invalid Email or Pass");
        }
    }));


// login
userRouter.post("/login", asyncHandler(
    async (req, res) => {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: genegateToken(user._id),
                createdAt: user.createAt,
            });
        } else {
            res.status(404);
            throw new Error("Invalid Email or Pass");
        }
    }));

//register
userRouter.post("/",

    asyncHandler(
        async (req, res) => {
            const {
                name,
                email,
                password
            } = req.body;
            const userExits = await User.findOne({
                email
            });

            if (userExits) {
                res.status(400);
                throw new Error("User already exits");
            }

            const user = await User.create({
                name,
                email,
                password,
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: genegateToken(user._id),
                });
            } else {
                res.status(400);
                throw new Error("Invalid user data ");
            }
        }));

// profile
userRouter.get("/profile",
    protect,
    asyncHandler(
        async (req, res) => {
            const user = await User.findById(req.user._id);
            if (user) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createAt,
                })
            } else {
                res.status(404);
                throw new Error("user not found");
            }
        }));
// update profile
userRouter.put("/profile",
    protect,
    asyncHandler(
        async (req, res) => {
            const user = await User.findById(req.user._id);
            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = req.body.password;
                }

                const updateUser = await user.save();
                res.json({
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    isAdmin: updateUser.isAdmin,
                    createdAt: updateUser.createAt,
                    token: genegateToken(updateUser._id),
                });
            } else {
                res.status(404);
                throw new Error("user not found");
            }
        }));



export default userRouter;