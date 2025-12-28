import mongoose from "mongoose";

const txnSchema = new mongoose.Schema({
    card:{
        type:String,
    },
    user:{
        type:String,
        lowercase:true,
        trim:true
    },
    prevOdo:{
        type:Number,
        required:true,

    },
    currOdo:{
        type:Number,
        required:true,

    },
    totalKm:{
        type:Number,
        required:true
    },
    vol:{
        type:Number,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    amt:{
        type:Number,
        required:true
    },
    kmpl:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    erv:{
        type:String,
        required:true
    },
    remarks:{
        type:String
    }
})

const Transaction = mongoose.model("Transaction",txnSchema);

export default Transaction;