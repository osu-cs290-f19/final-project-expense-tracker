
document.getElementById("submit-button").addEventListener("click", (event) => {
    var user = document.getElementById("username").value.toLowerCase();
    var url = window.location.href + "expenses/" + user;
	console.log("logging in user", user);
    window.location.assign(url);
});