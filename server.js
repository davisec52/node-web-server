const express = require("express");
const app = express();
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

/*app.use((req, res, next) => {
	res.render("maintenance.hbs", {
		pageTitle: "Maintenance Page",
		welcomeMsg: "We are currently performing maintenance and will be be back shortly."
	});
});*/

app.use((req,res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;

	console.log(log);

	fs.appendFile("server.log", log + "\n", (err) => {
		if(err) {
			console.log(err);
		}
	});

	next();
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamit", (text) => {
	return text.toUpperCase();
});

app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Biscuit Madness",
		welcomeMsg: "Welcome to biscuit craziness!"
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page"
	});
});

app.get("/bad", (req, res) => {
	res.send({
		errMsg: "Bad, you silly biscuit. Very bad!"
	});
});

app.listen(port, process.env.IP, () => {
	console.log(`Server running on port ${port}`);
});