// library imports
const express = require('express');
const dotenv = require('dotenv').config()
const chalk = require('chalk');
const validator = require('validator');
const figlet = require('figlet');

console.log(chalk.hex('#005eb8').bold(figlet.textSync('API runs!', {
	font: 'Doom',
	horizontalLayout: 'default',
	verticalLayout: 'default',
	width: 80,
	whitespaceBreak: true
})));


// own module imports
const print = require('./queryProcessEnv')
const check = require('./getEnv')

const app = express();

let tag = "app"
const a = `[${tag}] `;


check.start(check.required_keys)

// check if host is ip or localhost
// console.log("is valid DB_HOST: " + (validator.isIP(process.env.DB_HOST, 4) || process.env.DB_HOST === "localhost"))


const DB_PORT = process.env.DB_PORT;
const PORT = process.env.PORT;


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (request, response) => {
	response.status(200).send("This is not why you're here. Head to /user/:id and replace :id with your user id")
})

const userRouter = require('./routes/user');
app.use('/user', userRouter);

// start app
app.listen(PORT, () => {
	console.log(chalk.hex('#005eb8')(a + `Listening for requests on port ${PORT}`))
})