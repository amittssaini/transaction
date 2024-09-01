const {transactionModel,latestPriceModel}=require('../Models/ethereum.model');


class Ethereum{

    // method for posting the transaction detail
    createTransacation=async(transactions)=>{
    try {

       const results = [];
       for(const element of transactions)
       {
        const newTransactionDoc = new transactionModel(element); 
         const result = await newTransactionDoc.save(); 
        results.push(result)
       }   
         return results;
    } catch (error) {
        console.error('Error creating transactions:', error);
    throw error;
    }
    }
        // method for fetching the user from transaction collection
    fetchUser = async(address)=>{
        try {
            const cleanAddress = address.trim().toLowerCase(); // Clean the address
            const data = await transactionModel.find({ from: cleanAddress });
            console.log(data);
              const result = this.calculateExpense(data);
              console.log(result);
              return result;
        } catch (error) {
            throw error
        }
    }
          // calculate the total expensive via transaction table 
    calculateExpense = (data)=>{
        console.log('total function')
        let total = 0;
        data.forEach(element => {
            let sum = (element.gasUsed*element.gasPrice)/1e18;
            total+=sum;
        });
        console.log(total)
        return total;
    }


    saveLatestPrice=async(data)=>{
        try {

            console.log('service')
            const newEthereumPriceDoc = new latestPriceModel(data);
            const result= await newEthereumPriceDoc.save();
            return result;
        } catch (error) {
            
        }
    }

     getLatestPrice = async () => {
        try {
            const latestPrice = await latestPriceModel.findOne().sort({ createdAt: -1 }).exec();
            if (latestPrice) {
                console.log(`Latest Ethereum price in INR: ₹${latestPrice.price}`);
                return latestPrice.price;
            } else {
                console.log('No price data found.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching latest price from database:', error);
            throw error;
        }
    };

}
module.exports = Ethereum;