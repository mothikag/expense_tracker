const express = require('express')
const mongoose = require('mongoose');
const Expense = require('./expense');
const app = express()
const port = 3000;
mongoose.connect('mongodb+srv://mothikag20msc:mothika2523@cluster0.h5rgzih.mongodb.net/expenses?retryWrites=true&w=majority',{
    useUnifiedTopology:true
})
app.use(express.json());
app.get('/expenses', async (req, res)=>{
    const result = await Expense.find();
    res.send(result);
})

app.get('/expenses/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const result = await Expense.findById(id);
        if(result)
            res.send(result);
        else
            res.send("No expense with id");
    }catch(err){
        res.send(err);
    }  
});
app.delete('/expenses/:id', async (req, res)=> {
    try{
        const id =req.params.id;
        const result = await Expense.findByIdAndDelete(id);
        if(result)
            res.send(result);
        
        else
            res.send("No Expense")
        
        }catch(err){
            res.send(err);
        }
});
app.post('/expenses', async(req, res)=>{
    // console.log(req.body);
    const newExpense = req.body;
    await Expense.create(newExpense);
    res.send('Created');
})

app.put('/expenses/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const newExpense = req.body;
        const updateObject = await Expense.findByIdAndUpdate(id,{$set: newExpense},{
            new: true

        })
        res.send(updateObject);
    }
    catch(err){
       res.send(err);
    }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


