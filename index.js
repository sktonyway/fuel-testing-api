import express from 'express';
import cors from 'cors';
import Transaction from './transaction.model.js';
import connectDB from './db.js';
const app = express();
app.use(cors());
await connectDB();


app.get('/', (req,res)=>{
    res.send("This shows server is running.")
})

app.get('/api/txn',async (req,res)=>{
    try {
        const data = await Transaction.find();
        res.json({
            success: true,
            count : data.length,
            data
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
})
app.get('/api/txn/:erv', async (req,res)=>{
    try{
        const {erv} = req.params;
        const data = await Transaction.find({erv});
        res.json(data)
    }catch(err){
        console.error(err);
        
    }
})
app.get('/api/vehicles', async (req,res)=>{
    try {
        const data = await Transaction.distinct("erv")
        
        res.json(data)
    } catch (error) {
        console.error(error);
        
    }
})


app.listen(5000,()=>{
    console.log("Server is listening on 5000.");
    
})