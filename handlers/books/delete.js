'use strict';

const { deleteBook } = require('../../libs/dynamoDB');

module.exports.handler = async event => {
    console.log('Event', JSON.stringify(event));
    try {
      let body = JSON.parse(event.body);
      console.log('body', JSON.stringify(body))
      let result = await deleteBook(body.uuid);
  
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Book has been deleted successfully.',
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
