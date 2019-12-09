document.getElementById("expense-add-button").addEventListener("click", addButtonClick);
document.getElementById("filter-update-button").addEventListener("click", filterButtonClick);

let removedEntries = [];

function filterButtonClick(){
	console.log("filtering");
    var date = document.getElementById("filter-date").value;
    var place = document.getElementById("filter-place").value.toLowerCase();
    var min = document.getElementById("filter-amount-min").value;
    var max = document.getElementById("filter-amount-max").value;
    var descrip = document.getElementById("filter-description").value.toLowerCase();
    var category = document.getElementById("filter-category").value;
    
    // before filter, add back deleted rows
	var expenseTable = document.getElementById("expense-input-row");
	while (removedEntries.length > 0) {
		expenseTable.parentNode.insertBefore(removedEntries.pop(), expenseTable);
	}
	
    var rows = document.getElementsByClassName("expense-row");
    
    for (let i = rows.length-1; i >= 0; i--) {
		//~ console.log("checking row", i, rows[i]);
		let post = parseExpenseElem(rows[i]);
		console.log("post: ", post);
		
		if ((descrip && !post.description.toLowerCase().includes(descrip)) ||
			(min && parseInt(post.amount) < min) ||
			(max && parseInt(post.amount) > max )||
			(category && post.category !== category) ||
			(date && post.date !== date) || 
			(place && !post.place.toLowerCase().includes(place))
			) {
			removedEntries.push(rows[i].cloneNode(true));
			rows[i].remove();
		}
	}
    
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
	var expenseTable = document.getElementById("expense-input-row");
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
	return {
		date: postElem.getElementsByClassName("expense-date")[0].textContent,
		place: postElem.getElementsByClassName("expense-place")[0].textContent,
		amount: postElem.getElementsByClassName("expense-amount")[0].textContent,
		description: postElem.getElementsByClassName("expense-description")[0].textContent,
		category: postElem.getElementsByClassName("expense-category")[0].textContent
	};
}
