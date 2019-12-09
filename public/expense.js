document.getElementById("expense-add-button").addEventListener("click", addButtonClick);
document.getElementById("filter-update-button").addEventListener("click", filterButtonClick);



function filterButtonClick(){
    var date = document.getElementById("filter-date").value;
    var place = document.getElementById("filter-place").value.toLowerCase();
    var min = document.getElementById("filter-amount-min").value;
    var max = document.getElementById("filter-amount-max").value;
    var descrip = document.getElementById("filter-description").value.toLowerCase();
    var category = document.getElementById("filter-category").value;

    var rows = document.getElementById("expense-table").children;
    var post;
    for(var i=1; i< rows.length; i++){
        post = parseExpenseElem(rows[i]);

        if(descrip && !post.description.toLowerCase().includes(descrip)){
            post.remove();
            i--;
        }

        else if(min && parseInt(post.amount) < min){
            post.remove();
            i--;
        }

        else if(max && parseInt(post.amount) > max){
            post.remove();
            i--;
        }

        else if(category && post.category !== category){
            post.remove();
            i--;
        }

        else if(date && post.date !== date){
            post.remove();
            i--;
        }

        else if(place && !post.place.toLowerCase().includes(place)){
            post.remove();
            i--;
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