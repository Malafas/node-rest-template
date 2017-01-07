'use strict';

module.exports = {
    createAccount: createAccount,
    updateAccount: updateAccount,
    getAccount: getAccount,
    getAccounts: getAccounts,
    deleteAccount: deleteAccount
};

var persistence = require('./persistence');
var accountRepository = persistence.accountRepository;

/**
 * Creates a new account and inserts it in to the database.
 * @param {Object} accountData minus the id
 * @return {Promise} A promise that returns the inserted account (including the id)
 */
function createAccount(accountData) {
    return new Promise(function(fulfill, reject) {
        accountRepository.createAccount(accountData).then(function(out) {
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
    return new Promise(function(fulfill, reject) {
        accountRepository.updateAccount(accountData).then(function(out) {
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
        accountRepository.getAccount(id).then(function(out) {
            fulfill(out);
        });
    });
}

/**
 * Gets all accounts.
 * @return {Promise} A promise that returns an array of all accounts.
 */
function getAccounts() {
    return new Promise(function(fulfill, reject) {
        accountRepository.getAccounts().then(function(out) {
            return fulfill(out);
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
        accountRepository.deleteAccount(id).then(function(out) {
            return fulfill(out);
        })
    });
}