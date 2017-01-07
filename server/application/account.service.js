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
    return Promise.resolve(accountRepository.createAccount(accountData));
}

/**
 * Updates an existing account.
 * @param {Object} accountData including the id
 * @return {Promise} A promise that returns the updated account (including the id)
 */
function updateAccount(accountData) {
    return Promise.resolve(accountRepository.updateAccount(accountData));
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
    return Promise.resolve(accountRepository.deleteAccount(id));
}