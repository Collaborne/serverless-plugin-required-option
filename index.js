'use strict';

/** @type {import('serverless/classes/Plugin')} */
class RequiredOptionsServerlessPlugin {
	/**
	 *
	 * @param {import('serverless')} _serverless
	 * @param {import('serverless').Options} options
	 */
	 constructor(_serverless, options) {
		this.configurationVariablesSources = {
			requiredOpt: {
				async resolve({ address }) {
					const value = options[address];
					if (value) {
						return { value };
					}
					throw new Error(`Required option "${address}" not provided`);
				},
			},
		}
	}
}

module.exports = RequiredOptionsServerlessPlugin;
