import express from 'express';
import cors from 'cors';
import Transaction from './transaction.model.js';
import connectDB from './db.js';
const app = express();
app.use(cors());
app.use(express.json()); // 👈 REQUIRED for req.body


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
        const data = await Transaction.find({erv}).sort({ date: -1 });
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
// This route is for accepting data from frontend.
app.post('/api/submitTxn', async (req,res)=>{
    try{
        const {erv,user,prevOdo,currOdo,totalKm,vol,rate,amt,kmpl,remarks} = req.body;
        // Creating the transaction object.
        const txn = new Transaction({
      erv: erv.trim().toUpperCase(),
      user: user.trim(),
      prevOdo: Number(prevOdo),
      currOdo: Number(currOdo),
      totalKm: Number(totalKm),
      vol: Number(vol),
      rate: Number(rate),
      amt: Number(amt),
      kmpl: Number(kmpl),
      remarks,
      date: date ? new Date(date) : undefined // fallback to Date.now
    });
        const savedTxn = await txn.save(); // Saved to mongodb;
        res.status(201).json({
      success: true,
      data: savedTxn
    });   
    }catch(err){
        console.error("Error in inserting data submit route.😂",err);
    }
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server is listening on", port);
    
})
