'use strict';

function formatParameters(parameters) {
  if (!parameters) {
    return null;
  }

  const result = {};
  Object.values(parameters).map((param) => {
    const [key, value] = param.split("=");
    result[key] = value;
    return null;
  });
  return result;
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
          const parameters = formatParameters(options.param);

          const value = options[address] ?? parameters[address];
          if (value) {
            return { value };
          }
          throw new Error(`Required option "${address}" not provided`);
        },
      },
    };
  }
}

module.exports = RequiredOptionsServerlessPlugin;
