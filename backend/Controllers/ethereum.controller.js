const Ethereum = require('../Services/ethereum.service');
const ethererumInstance = new Ethereum();
const axios = require('axios')
require('dotenv').config();


const postTransaction=async(req,res)=>{
    try {
        const {address} = req.params;
       const transactions = await fetchTransaction(address);
       const result = await ethererumInstance.createTransacation(transactions)
       res.send(result);

    } catch (error) {
        
    }
}

const fetchTransaction =async(address)=>{
    try {
        const result = await axios.get(`https://api.etherscan.io/api
?module=account
&action=txlist
&address=${address}
&startblock=0
&endblock=99999999
&sort=asc
&apikey=${process.env.API_KEY}`)

const trans = result.data.result;
//console.log(trans)
return trans;
    } catch (error) {
        
    }
}

const expenseTransaction=async(req,res)=>{
try {
    const {address} = req.params;
    console.log(address)
    console.log(typeof(address))
    console.log('controller')
    const result = await ethererumInstance.fetchUser(address);
    const price = await  ethererumInstance.getLatestPrice();
    res.send({totalExpense:result,LatestpriceInInr:price})

} catch (error) {
    
}
}



const fetchEthereumPriceEvery10Min=async()=>{
    console.log('hello in in inr fucntion')
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
        console.log(response.data.ethereum)
        const price = response.data.ethereum.inr;
        savingLatestPrice({ price, currency: 'INR' });
    } catch (error) {
        
    }
}

const savingLatestPrice=async(data)=>{
    try {   
        console.log('saving the price via method')  
        const result = await ethererumInstance.saveLatestPrice(data);
        console.log(result)
    } catch (error) {
        
    }
}

module.exports={postTransaction,expenseTransaction,fetchEthereumPriceEvery10Min}