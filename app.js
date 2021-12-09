const dotenv = require('dotenv').config()
const chalk = require('chalk');
var validator = require('validator');

const log = console.log;


const printReq = object => {
	for (const [key, value] of Object.entries(object)) {
		log(process.env[key])
	}
}

const required_keys = {
	DB_HOST: {
		available: false,
		checked: false,
		required: false,
		default_fallback: "localhost"
	}, DB_USER: {
		available: false,
		checked: false,
		required: false,
		default_fallback: "root"
	}, DB_PASS: {
		available: false,
		checked: false,
		required: true
	}, DB_PORT: {
		available: false,
		checked: false,
		required: false,
		default_fallback: "3306"
	}
}


function updateObjProp(obj, value, propPath) {
	const [head, ...rest] = propPath.split('.');

	!rest.length
		? obj[head] = value
		: updateObjProp(obj[head], value, rest.join('.'));
}






const checkKeyAvailability = (key, value) => {
	// Skip checking if already checked
	if (value?.checked) return;
	// check if key is in process.env
	if (key in process.env && process.env[key] !== "") {
		// required_keys[key][available] = true
		updateObjProp(required_keys, true, key + '.checked');
		updateObjProp(required_keys, true, key + '.available');
		return;
	} else {
		if (value?.required) throw new Error(`environment var key "${chalk.bold(key)}" is missing!`)
		process.env[key] = required_keys[key]?.default_fallback;
		updateObjProp(required_keys, true, key + '.available');
	}
}
const checkObj = (obj) => {
	// Check keys from required_keys --> object
	for (const [key, value] of Object.entries(obj)) {
		checkKeyAvailability(key, value)
	}
}


checkObj(required_keys)



log(chalk.bgGreen.bold('env has been checked!'));


// check if host is ip or localhost
log("is valid DB_HOST: " + (validator.isIP(process.env.DB_HOST, 4) || process.env.DB_HOST === "localhost"))


log("\n" + chalk.hex('#005eb8').bold('app running...'));
