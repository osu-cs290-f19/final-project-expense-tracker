
document.getElementById("submit-button").addEventListener("click", (event) => {
    var user = document.getElementById("username").value.toLowerCase();
    var url = window.location.href + "expenses/" + user;
	console.log("logging in user", user);
    window.location.assign(url);
});
document.getElementById("expense-add-button").addEventListener("click", addButtonClick);
document.getElementById("filter-update-button").addEventListener("click", filterButtonClick);



function filterButtonClick(){
	
}

function addButtonClick(){
	var postID;
    
    const username = window.location.href.match(/(\w*)$/i)[0];
    console.log("username", username);
    
	postID = document.getElementById("expense-table").children[0].childElementCount -2;
	var expense =   {
		date: document.getElementById("expense-label-newdate").value,
		place: document.getElementById("expense-label-newplace").value,
		amount: document.getElementById("expense-label-newamount").value,
		descrip: document.getElementById("expense-label-newdescription").value,
		category: document.getElementById("expense-label-newcategory").value
	};
	if(!(expense.date && expense.place && expense.amount && expense.descrip && expense.category)){
		alert("You need to fill the entire row.");
		return;
	}
	
	var postHTML = Handlebars.templates.expenseTemp(expense);
	var expenseTable = document.getElementById("expense-newrow");
	expenseTable.insertAdjacentHTML('beforebegin', postHTML);
	
	expense.id = postID;
	console.log(expense);
	//sending data to mongoDB
	
	var request = new XMLHttpRequest();
	let url = "/api/" + username + "/add";
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
	
	request.send(JSON.stringify(expense));
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
