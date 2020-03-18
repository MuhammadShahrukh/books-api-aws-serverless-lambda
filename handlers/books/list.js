'use strict';

const { listBooks } = require('../../libs/dynamoDB');

module.exports.handler = async event => {
    console.log('Event', JSON.stringify(event));
    try {
      let {pathParameters} = event;
      console.log('pathParameters', JSON.stringify(pathParameters))
      let result = await listBooks();
  
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'List of all books.',
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
