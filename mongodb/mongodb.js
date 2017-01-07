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
            MongoClient.connect(connection, { "socketOptions.connectTimeoutMS": 1000 }, function(err, client) {
                if (err) return fulfill({ err });
                client.collection(collection_accounts).insert({ accountData }, function(err, res) {
                    if (err) return fulfill({ err });
                    fulfill(res);
                });
            });
        });
    },

    updateAccount: function(accountData, callback) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                if (err) return fulfill({ err });
                client.collection(collection_accounts).findOneAndDelete({ "accountData.id": accountData.id }, function(err, res) {
                    if (err) return fulfill({ err });
                    client.collection(collection_accounts).insert(accountData, function(err, res) {
                        if (err) return reject(err);
                        fulfill({ err, res });
                    });
                });
            });
        });
    },

    getAccount: function(id) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                if (err) return fulfill({ err });
                client.collection(collection_accounts).find({ "accountData.id": Number(id) }).toArray(function(err, res) {
                    if (err) return fulfill({ err });
                    fulfill(res);
                });
            });
        });
    },

    getAccounts: function() {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                if (err) return fulfill({ err });
                client.collection(collection_accounts).find({}).toArray(function(err, res) {
                    if (err) return fulfill({ err });
                    fulfill({ res });
                });
            });
        });
    },

    deleteAccount: function(id) {
        return new Promise(function(fulfill, reject) {
            MongoClient.connect(connection, function(err, client) {
                if (err) return fulfill({ err });
                client.collection(collection_accounts).deleteOne({ "accountData.id": Number(id) }, function(err, res) {
                    if (err) return fulfill({ err });
                    // nothing was deleted
                    if (res.result.n == 0) res = false;
                    fulfill({ err, res });
                });
            });
        });
    }

}