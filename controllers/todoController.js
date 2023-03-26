const Todo = require('../dbModels/todo')
const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler');

const createTodo = async (req, res) => {
    try {
        const { body } = req;
        const todo = await Todo.insert({body})
        return successResponse ({res, data: { todo }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getAllTodos = async (req, res) => {
    try {
        const { userId } = req;
        const todos = await Todo.find({userId: userId})
        return successResponse ({res, data: { todos }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getTodo = async (req, res) => {
    try {
        const { id } = req
        const todo = await Todo.findOne({_id: id})
        return successResponse ({res, data: { todo }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}
const updateTodo = async (req, res) => {
    try {
        const { id } = req;
        const todo = await Todo.findOneAndUpdate({_id: id}, req.body, { new: true })
        return successResponse ({res, data: { todo }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req;
        const todo = await Todo.findOneAndDelete({_id: id})
        return successResponse ({res, data: { todo }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

module.exports = {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    getAllTodos
}