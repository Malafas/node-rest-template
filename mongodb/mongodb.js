/* 
createAccount(accountData);
updateAccount(accountData);
getAccount(id);
getAccounts();
deleteAccount(id);
*/

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var connection = 'mongodb://192.168.1.67:27017/noderesttemplate';
var collection_accounts = 'accounts';

module.exports = {

    createAccount: function(accountData, callback) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                assert.equal(null, err);
                client.collection(collection_accounts).insert({ accountData }, function(err, inserted) {
                    console.log(err);
                    fulfill(inserted);
                });
            });
        });
    },

    updateAccount: function(accountData, callback) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                assert.equal(null, err);
                client.collection(collection_accounts).findOneAndDelete({ "accountData.id": accountData.id }, function(err, results) {
                    console.log(results);
                    client.collection(collection_accounts).insert(accountData, function(err, results) {
                        fulfill(results);
                    });
                });
            });
        });
    },

    getAccount: function(id) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                assert.equal(null, err);
                client.collection(collection_accounts).find({ "accountData.id": Number(id) }).toArray(function(err, results) {
                    fulfill(results);
                });
            });
        });
    },

    getAccounts: function() {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                assert.equal(null, err);
                client.collection(collection_accounts).find({}).toArray(function(err, results) {
                    fulfill(results);
                });
            });
        });
    },

    deleteAccount: function(id) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                assert.equal(null, err);
                client.collection(collection_accounts).deleteOne({ "accountData.id": Number(id) }, function(err, results) {
                    fulfill(results);
                });
            });
        });
    }

}