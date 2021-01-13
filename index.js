'use strict';

class RequiredOptionsServerlessPlugin {
	constructor(serverless) {
		this.variableResolvers = {
			requiredOpt: async variableString => {
				// In serverless 2.16.1 getValueFromOptions will just ignore the prefix and pick the second part after the ':', but
				// for added sanity we change the string to match what it should be.
				// Note that we're not responsible for any recursive resolution, and simply behave like "opt-but-with-error"
				const [, option] = variableString.split(/:/);
				const value = await serverless.variables.getValueFromOptions(`opt:${option}`);
				if (value) {
					return value;
				}
				throw new Error(`Required option "${option}" not provided`);
			}
		}
	}
}

module.exports = RequiredOptionsServerlessPlugin;
