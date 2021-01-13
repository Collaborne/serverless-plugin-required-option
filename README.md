# serverless-plugin-required-option

Serverless Framework plugin to require an option to be provided

## Usage

1. Install the plugin

    ```sh
    npm install --save serverless-plugin-required-option
    ```

2. Add the plugin to the `serverless.yml` configuration file

    ```yaml
    plugins:
      - serverless-plugin-required-option
    ```

3. Use `requiredOpt:NAME` variable references when an option must be provided

    ```yaml
    custom:
      userPoolId: ${requiredOpt:user_pool_id}
    ```

   If the `user_pool_id` is provided as option the `custom.userPoolId` value will be set to it, if the option is not provided
   then an error will be raised and the serverless operation will be aborted.
