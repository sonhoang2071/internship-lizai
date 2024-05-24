const { where } = require("sequelize");
const Post = require("../models/post.model");

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll();
        return res.status(200).json({
            message: "Get successfully",
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};
const createPost = async (req, res, next) => {
    const { title, content } = req.body;
    try {
        const post = await Post.findOne({ where: { title: title } });
        if (post) {
            return res.status(409).json({
                message: "Title post is existed",
            });
        } else {
            const newPost = await Post.create({ title, content });
            return res.status(201).json({
                message: "Created successfully",
                data: newPost,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ where: { id: id } });
        if (post) {
            return res.status(200).json({
                message: "Get successfully",
                data: post,
            });
        } else {
            return res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const postById = await Post.findOne({ where: { id: id } });
        if (postById) {
            const postByTitle = await Post.findOne({ where: { title: title } });
            if (postByTitle && postByTitle.title !== postById.title) {
                return res.status(409).json({
                    message: "Title post is existed",
                });
            } else {
                postById.title = title;
                postById.content = content;
                await postById.save();
                return res.status(200).json({
                    message: "Updated successfully",
                    data: postById,
                });
            }
        } else {
            return res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Post.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(200).json({
                message: "Deleted successfully",
            });
        } else {
            return res.status(200).json({
                message: "Cannot delete",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
};
