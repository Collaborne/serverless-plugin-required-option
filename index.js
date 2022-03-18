'use strict';

function makeOldVariableResolvers(configurationVariablesSources = {}) {
	return Object.fromEntries(
		Object.entries(configurationVariablesSources).map(
			([prefix, source]) => [
				prefix,
				async src => {
					const [, address] = src.split(/:/);
					const result = await source.resolve({ address });
					return result.value;
				},
			],
		),
	)
}

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

		// Provide compatibility with old variables resolution mode
		this.variableResolvers = makeOldVariableResolvers(this.configurationVariablesSources);
	}
}

module.exports = RequiredOptionsServerlessPlugin;
