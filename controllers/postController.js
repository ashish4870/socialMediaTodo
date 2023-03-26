const Post = require('../dbModels/post');
const Comment = require('../dbModels/comment');
const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler');

const createPost = async (req, res) => {
    try {
        const { body } = req;
        const post = await Post.insert({body})
        return successResponse ({res, data: { post }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getAllPosts = async (req, res) => {
    try {
        const { userId } = req;
        const posts = await Post.find({userId: userId})
        return successResponse ({res, data: { posts }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req
        const post = await Post.findOne({_id: id})
        return successResponse ({res, data: { post }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}
const updatePost = async (req, res) => {
    try {
        const { id } = req;
        const post = await Post.findOneAndUpdate({_id: id}, req.body, { new: true })
        return successResponse ({res, data: { post }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req;
        const post = await Post.findOneAndDelete({_id: id})
        return successResponse ({res, data: { post }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getComments = async (req, res) => {
    try {
        const { id } = req;
        const comments = await Comment.find({postId: id})
        return successResponse ({res, data: { comments }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const addComment = async (req, res) => {
    try {
        const { body } = req;
        const comment = await Comment.insert({body})
        return successResponse ({res, data: { comment }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getAllPosts,
    getComments,
    addComment
}