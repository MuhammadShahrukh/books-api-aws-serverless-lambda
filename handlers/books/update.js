'use strict';

const { updateBook } = require('../../libs/dynamoDB');

module.exports.handler = async event => {
    console.log('Event', JSON.stringify(event));
    try {
      let { pathParameters, body } = event;
      console.log('pathParameters', JSON.stringify(pathParameters))
      console.log('body', body)
      let result = await updateBook(pathParameters.uuid, JSON.parse(body));
  
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Book has been updated successfully.',
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
