const log = console.log;

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
	}, PORT: {
		available: false,
		checked: false,
		required: false,
		default_fallback: "3001"
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
	if (key in process.env && process.env[key].trim() !== "") {
		// required_keys[key][available] = true
		updateObjProp(required_keys, true, key + '.checked');
		updateObjProp(required_keys, true, key + '.available');
		return;
	} else {
		if (value?.required) throw new Error(`environment var key "${chalk.bold(key)}" is missing or only whitespace!`)
		process.env[key] = required_keys[key]?.default_fallback;
		updateObjProp(required_keys, true, key + '.available');
	}
}


module.exports = function (obj) {
	// Check keys from required_keys --> object
	for (const [key, value] of Object.entries(obj)) {
		checkKeyAvailability(key, value)
	}
};