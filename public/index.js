

document.getElementById("expense-add-button").addEventListener("click", addButtonClick);
document.getElementById("filter-update-button").addEventListener("click", filterButtonClick);
document.getElementById("submit-button").addEventListener("click", loginButtonClick);

function loginButtonClick(){
    
}

function filterButtonClick(){

}

function addButtonClick(){
    var username, url, postID;
    postID = document.getElementById("expense-table").childElementCount -2;
    var expense =   {
        Date: document.getElementById("expense-newdate"),
        Place: document.getElementById("expense-newplace"),
        Amount: document.getElementById("expense-newamount"),
        Description: document.getElementById("expense-newdescription"),
        Category: document.getElementById("expense-newcategory")
    };
    if(!(expense.Date && expense.Place && expense.Amount && expense.Description && expense.Category)){
        alert("You need to fill the entire row.");
        return;
    }

    var postHTML = Handlebars.templates.expenseTemp(expense);
    var expenseTable = document.getElementById("expense-newrow");
    expenseTable.insertAdjacentHTML('beforebegin', postHTML);

    //sending data to mongoDB

  var request = new XMLHttpRequest();
  url = "/api/" + username + "/add";
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
 /* request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var json = JSON.parse(request.responseText);
        console.log(json.email + ", " + json.password);
    }
};
*/
  var data = JSON.stringify({"id": postID, "date": expense.Date, "amount": expense.Amount, "category": expense.Category, "place": expense.Place, "descrip": expense.Description});
  request.send(data);
}

function parseExpenseElem(postElem){
    var post = {
        date: postElem.getAttribute("expense-date"),
        place: postElem.getAttribute("expense-place"),
        amount: postElem.getAttribute("expense-amount"),
        description: postElem.getAttribute("expense-description"),
        category: postElem.getAttribute("expense-category")
    };
}
