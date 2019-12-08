

document.getElementById("expense-add-button").addEventListener("click", addButtonClick);
document.getElementById("filter-update-button").addEventListener("click", filterButtonClick);
document.getElementById("submit-button").addEventListener("click", loginButtonClick);

function loginButtonClick(){
	
}

function filterButtonClick(){
	
}

function addButtonClick(){
	var username, url, postID;
	username =  "testUser";
	postID = document.getElementById("expense-table").children[0].childElementCount -2;
	var expense =   {
		Date: document.getElementById("expense-label-newdate").value,
		Place: document.getElementById("expense-label-newplace").value,
		Amount: document.getElementById("expense-label-newamount").value,
		Description: document.getElementById("expense-label-newdescription").value,
		Category: document.getElementById("expense-label-newcategory").value
	};
	if(!(expense.Date && expense.Place && expense.Amount && expense.Description && expense.Category)){
		alert("You need to fill the entire row.");
		return;
	}
	console.log(expense);
	
	var postHTML = Handlebars.templates.expenseTemp(expense);
	var expenseTable = document.getElementById("expense-newrow");
	expenseTable.insertAdjacentHTML('beforebegin', postHTML);
	
	//sending data to mongoDB
	
	var request = new XMLHttpRequest();
	url = "/api/" + username + "/add";
	console.log(url);
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	/* request.onreadystatechange = function () {
	 *    if (request.readyState === 4 && request.status === 200) {
	 *        var json = JSON.parse(request.responseText);
	 *        console.log(json.email + ", " + json.password);
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
