const mongoose = require('mongoose');

         // schema for transaction table 
            const transactionSchema = new mongoose.Schema({
                blockNumber: { type: Number },
                blockHash: { type: String },
                timeStamp: { type: String },
                hash: { type: String, unique: true },  
                from: { type: String },
                to: { type: String },
                value: { type: Number },
                gas: { type: Number },
                gasPrice: { type: Number },
                gasUsed: { type: Number },
                nonce: { type: Number }, 
                input: { type: String },  
                txreceipt_status: { type: String },  
                confirmations: { type: Number },  
                contractAddress: { type: String },  
              });
              
              // this is schema for latest price 
              const latestPriceSchema = new mongoose.Schema({
                price:{type:Number},
                currency:{type:String}
            },{timestamps:true})
            
              // here we design the models 
            const latestPriceModel = mongoose.model("latestPrice",latestPriceSchema);
            const transactionModel = mongoose.model("transaction",transactionSchema)
// exports the models
module.exports = {transactionModel,latestPriceModel};