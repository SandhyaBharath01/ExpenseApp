const Expenses = require('../models/ExpenseModel');
module.exports = {
    saveExpense:(req,res)=>{
        console.log("requests",req)
        let errors = [];
		if(!req.body.ExpenseAmount){
			errors.push({text:'Please add a ExpenseAmount'});
		}
		

		if(errors.length > 0){
			res.send(errors)
		} else {

            Expenses.create({...req.body})
         .then(expense => {
					console.log(expense)
         })
         .catch(error =>{
             console.log("TODO Error: ", error.code);
             if(error.code === 11000)
                 res.send({"msg":"Cannot accept duplicate entry"});
             else
                 res.send({data:error});
         })
		}
    }
}