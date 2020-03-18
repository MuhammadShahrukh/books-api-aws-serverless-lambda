const AWS = require('aws-sdk')
var documentClient = new AWS.DynamoDB.DocumentClient();

const uuidv4 = require('uuid/v4');

async function addBook(book) {
    try {
        var params = {
            TableName: 'dev-booksTable',
            Item: {
                uuid: uuidv4(),
                ...book
            }
        };
        let result = await documentClient.put(params).promise();
    } catch (exception) {
        throw exception
    }
}

async function listBooks() {
    try {
        var params = {
            TableName: 'dev-booksTable',
        };

        let result = await documentClient.scan(params).promise();
        return result.Items;
    } catch (exception) {
        throw exception
    }
}

async function bookDetails(uuid) {
    try {
        var params = {
            TableName: 'dev-booksTable',
            Key: {
                uuid
            }
        };
        let book = await documentClient.get(params).promise();
        return book.Item;
    } catch (exception) {
        throw exception
    }
}

async function deleteBook(uuid) {
    try {
        var params = {
            TableName: 'dev-booksTable',
            Key: {
                uuid: uuid
            }
        };

        await documentClient.delete(params).promise();
    } catch (exception) {
        throw exception
    }
}

async function updateBook(uuid, details) {
    try {
        var params = {
            TableName: 'dev-booksTable',
            Key: {
                uuid: uuid
            },
            UpdateExpression: "set #name = :n,authorName = :aN, releaseDate = :rD",
            ExpressionAttributeValues: {
                ":n": details.name,
                ":aN": details.authorName,
                ":rD": details.releaseDate
            },
            ExpressionAttributeNames:{
                "#name": "name"
            },
            ReturnValues: 'UPDATED_NEW',
        };

        console.log('params', JSON.stringify(params));
        let result = await documentClient.update(params).promise();
        return result;
    } catch (exception) {
        throw exception
    }
}

module.exports = {
    addBook,
    deleteBook,
    bookDetails,
    updateBook,
    listBooks
}