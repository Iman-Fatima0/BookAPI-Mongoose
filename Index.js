const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/books')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const BooksSchema = new Schema({
    title: { type: String, required: true},
    author: { type: String, required: true }, 
    genre: { type: String }, 
    year: { type: Number }, 
    summary: { type: String } 
});

const Books = mongoose.model('Books', BooksSchema);

app.post('/books/Add', async (req, res) => {
   
        const data = req.body;
        const newBook = await Books.create(data);
        res.status(201).json(newBook); 
 
});

app.get('/books/get/:_id', async (req, res) => {
    
        const id = req.params._id;
        const findbook = await Books.findById({id:_id});
                res.status(200).json(findbook);

});

app.get('/books/search',async (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    const genre = req.query.genre;
    const year = req.query.year;

    const findBooks = await Books.find([]);

    res.status(200).json(findBooks);


})
app.put('/books/update/:_id',async(req, res)=>
    {
        const id=req.params._id;
        const data=req.body;
        const updates=await Books.findByIdAndUpdate({_id:id}, data, {new:true});
        res.json(updates);
    })

    app.delete('/books/delete/:_id',async(req, res)=>
        {
            const id=req.params._id;
            const deleted=await Books.findByIdAndDelete({_id:id});
            res.json(deleted);
        })
        

const port = 3000;
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
