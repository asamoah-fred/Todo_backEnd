import mongoose from 'mongoose';
//import todoModel from './schema/schema.js';
const { Schema, model } = mongoose;

//Use Schema to structure the data in a database

const todoSchema = Schema({
    todoTitle: {
        type: String,
        require: true
    },

    category: {
        type: String,
        require: true
    },

});

const TodoModel = model('todo', todoSchema);
//default export
export default TodoModel;

//the statement below is a name export
//export {TodoModel as TodoModel};