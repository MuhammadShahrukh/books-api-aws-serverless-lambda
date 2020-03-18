'use strict';

const { addBook } = require('../../libs/dynamoDB');

module.exports.handler = async event => {
  console.log('Event', JSON.stringify(event));
  try {
    let body = JSON.parse(event.body);
    console.log('body', JSON.stringify(body))
    let result = await addBook(body);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Book has been added successfully.',
        },
      )
    };

  } catch (exception) {
    console.log(exception);
  }
};
