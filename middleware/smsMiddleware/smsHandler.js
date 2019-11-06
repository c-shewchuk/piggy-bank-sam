const Budget = require('../../models/Budget');
const Purchase = require('../../models/Purchase');

const helpme = () => {
    let string = 'BudgetBuddy is a simple SMS app that allows you to easily track your budget, anywhere!!\n';
    string = string + 'To get started, text us the word create and we will get you setup!\n';
    string = string + 'To set your budget for each category, text set category amount. Available categories are food and clothes\n';
    string = string + 'To add money you have spent, text log category amount\n';
    string = string + 'To see a weekly report, text report weekly\n';
    string = string + 'To see a monthly report, text report monthly\n';
    string = string + 'As always, text helpme to get some help';
    return string;
}

const createNewUser = (phoneNumber, callback) => {
    const newUser =  new Budget({
        phoneNo: phoneNumber,
        foodSpent: 0, 
	    foodBudget: 0, 
	    entertainSpent: 0, 
	    entertainBudget: 0, 
	    clothingSpent: 0, 
	    clothingBudget: 0,
	    otherSpent: 0,
	    otherBudget: 0
    });

    newUser.save()
     .then(console.log("New User created"))
     .catch(err => console.log(err));
    callback();
};

const logItem = async (phoneNumber, category, amount) => {
    const newPurchase = new Purchase({
        phoneNumber: phoneNumber,
        category: category,
        purchaseAmount: amount
    });

    await newPurchase.save()
            .catch(err => console.log(err));
    switch (category){
        case 'food' :
            await updateFoodSpent(phoneNumber, amount);
            return;
        case 'clothing':
            await updateClothingSpent(phoneNumber, amount);
            return;
        case 'entertainment':
            await updateEnterainmentSpent(phoneNumber, amount);
            return;
        default:
            console.log(`${category} is not a vaild category`);
    }
    
 
}

const report = (phoneNumber, category, amount) => {

}

const setBudget = (phoneNumber, category, amount) => {

};


const updateFoodSpent = async (phoneNumber, amount, callback) => {
    Budget.findOne({phoneNo: phoneNumber}, (err, foundBudget) => {
        if(err) {
            console.log(err);
            return;
        }
        else {
            if(!foundBudget){
                console.log('Budget not found');
            }
            else{
                let foodSpentBefore = foundBudget.foodSpent;
                amountFloat = parseFloat(amount);
                amountFloat += parseFloat(foodSpentBefore);
                foundBudget.foodSpent = amountFloat;

                foundBudget.save()
                  .then(console.log('Updated Food Budget'))
                  .catch(err => console.log(err));
            }
        }
    });
}

const updateClothingSpent = async  (phoneNumber, amount, callback) => {
    Budget.findOne({phoneNo: phoneNumber}, (err, foundBudget) => {
        if(err) {
            console.log(err);
            return;
        }
        else {
            if(!foundBudget){
                console.log('Budget not found');
            }
            else{
                let clothingSpentBefore = foundBudget.clothingSpent;
                amountFloat = parseFloat(amount);
                amountFloat += parseFloat(clothingSpentBefore);
                foundBudget.clothingSpent = amountFloat;

                foundBudget.save()
                  .then(console.log('Updated Clothing Budget'))
                  .catch(err => console.log(err));
            }
        }
    });
}

const updateEnterainmentSpent = async (phoneNumber, amount, callback) => {
    Budget.findOne({phoneNo: phoneNumber}, (err, foundBudget) => {
        if(err) {
            console.log(err);
            return;
        }
        else {
            if(!foundBudget){
                console.log('Budget not found');
            }
            else{
                let entertainSpentBefore = foundBudget.entertainSpent;
                amountFloat = parseFloat(amount);
                amountFloat += parseFloat(entertainSpentBefore);
                foundBudget.entertainSpent = amountFloat;

                foundBudget.save()
                  .then(console.log('Updated Entertainment Budget'))
                  .catch(err => console.log(err));
            }
        }
    });
}



module.exports = {
    helpme,
    createNewUser,
    logItem,
    report,
    setBudget
}