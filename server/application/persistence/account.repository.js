'use strict';

module.exports = {
    createAccount: createAccount,
    updateAccount: updateAccount,
    getAccount: getAccount,
    getAccounts: getAccounts,
    deleteAccount: deleteAccount
};

//var knex = require('./db').knex;
var mongodb = require("../../../mongodb/mongodb");
var joinjs = require('join-js');
var resultMaps = require('./resultmaps');
var Account = require('../../domain').Account;

/**
 * Creates a new account and inserts it in to the database.
 * @param {Object} accountData minus the id
 * @return {Promise} A promise that returns the inserted account (including the id)
 */
function createAccount(accountData) {
    return new Promise(function(fulfill, reject) {
        var account = new Account(accountData);
        mongodb.createAccount(accountData).then(function(out) {
            fulfill(out);
        });
    });
}

/**
 * Updates an existing account.
 * @param {Object} accountData including the id
 * @return {Promise} A promise that returns the updated account (including the id)
 */
function updateAccount(accountData) {
    var account = new Account(accountData);
    return new Promise(function(fulfill, reject) {
        mongodb.updateAccount(accountData).then(function(out) {
            fulfill(out);
        });
    });
}

/**
 * Gets an existing account.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired account.
 */
function getAccount(id) {
    return new Promise(function(fulfill, reject) {
        mongodb.getAccount(id).then(function(out) {
            fulfill(out);
        });
    });
}


/**
 * Gets all accounts.
 * @return {Promise} A promise that returns an array of all accounts.
 */
function getAccounts(callback) {
    return new Promise(function(fulfill, reject) {
        mongodb.getAccounts().then(function(out) {
            fulfill(out);
        });
    });
}

/**
 * Deletes an account.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the account is deleted.
 */
function deleteAccount(id) {
    return new Promise(function(fulfill, reject) {
        mongodb.deleteAccount(id).then(function(out) {
            fulfill(out);
        });
    });
}