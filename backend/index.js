const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const ethereumRouter = require('./Routes/ethereum.route')
const {fetchEthereumPriceEvery10Min} = require('./Controllers/ethereum.controller');
const app = express();
const cron = require('node-cron')




// connection of mongoose 
mongoose
.connect(process.env.DB_URI)
.then(()=>{
    console.log('DB IS CONNECTED');
    app.listen(process.env.PORT,()=>console.log(`SERVER IS ACTIVE AT THE PORT NO. ${process.env.PORT}`))
})
.catch((error)=>console.log('DB IS NOT CONNECTED'))

app.use(express.json())  // to parse the json data 

// ethereum is a homepage 
// ethereum/tansaction/:address
// ethererum/expense/:address

app.use('/ethereum',ethereumRouter)


// its like setInterval to run the latest price at every 10 - minutes 
// cron.schedule('*/10 * * * *', () => {
//     fetchEthereumPriceEvery10Min();
//   });
fetchEthereumPriceEvery10Min();
