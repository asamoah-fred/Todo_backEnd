import dotenv from 'dotenv';
import todoModel from './schema/schema.js';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());

const PORT =  process.env.PORT || 5000;

const db = process.env.DB_URL;

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

//get()
app.get(
    '/todos', async(req, res) => {


        //res.send('Aisha learn');
        const allTodos = todoModel.find({});
        if (allTodos) {
            return res.status(200).json({
                message: 'Todos fetched successfully',
                data: allTodos
            });
        } else {
            return res.status(500).json({
                message: 'Oops!, unable to fetch todos'
            })
        }
    }

)

app.get(
    '/todos/:category', async(req, res) => {
        const { category } = req.params;
        const allCategoryTodos = await todoModel.find({})
            .where("category").equals(category);
        if (allCategoryTodos) {
            return res.status(200).status({
                message: `Category todos fetched successfully`,
                data: allCategoryTodos
            });
        } else {
            return res.status(500).json({
                message: 'Oops!, unable to fetch todos'
            })
        }
    })

//post()
// app.post(
//     '/todo', async(req, res) => {
//         res.send('Use this route to create a new todo');
//     }
// )

//Creating a new Todo
app.post(
    '/todo', async(req, res) => {
        const { todoTitle, category } = req.body;
        const newTodo = await todoModel.create({
            todoTitle,
            category
        })
        if (newTodo) {
            //success
            return res.status(200).json({
                message: `Todo was created successfully`,
            })
        } else {
            //error
            return res.status(500).json({
                message: `Oop!, you are unable to create a new Todo`,
            });
        }

    })

//patch()
// app.patch(
//     '/todo',(req,res)=>{
//         res.send('Use this route to create a new todo');
//     }
// )

//put()
/*app.put(
    '/todo',async(req,res)=>{
        res.send('Use this route to change all the data');
    }
)

delete(
app.delete(
    '/todo',(req,res)=>{
        res.send('Use this route to delete data');
    }
))*/
app.delete(
    '/todos/:category', async(req, res) => {
        const { category } = req.params;
        const allCategoryTodos = await todoModel.find({})
            .where("category").equals(category);
        if (allCategoryTodos) {
            return res.status(200).status({
                message: `Category todo deleted successfully`,
                data: allCategoryTodos
            });
        } else {
            return res.status(500).json({
                message: 'Oops!, unable to delete todo'
            })
        }
    })

app.listen((PORT), () => {
    console.log(`listening on port ${PORT}`);
})