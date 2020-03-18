'use strict';

const { bookDetails } = require('../../libs/dynamoDB');

module.exports.handler = async event => {
    console.log('Event', JSON.stringify(event));
    try {
      let {pathParameters} = event;
      console.log('pathParameters', JSON.stringify(pathParameters))
      let result = await bookDetails(pathParameters.uuid);
  
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: `Book '${result.name}' has been searched successfully.`,
            data: result
          },
        )
      };
  
    } catch (exception) {
        return {
            statusCode: 500,
            body: JSON.stringify(
              {
                message: exception.stack || exception
              },
            )
          };
    }
};
