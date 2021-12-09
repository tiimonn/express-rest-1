const chalk = require('chalk');
const check = require('./getEnv');
module.exports = function () {
	for (const [key, value] of Object.entries(check.required_keys)) {
		console.log(chalk.bold(`key: ${key}:`));
		console.log(value);
	}
};