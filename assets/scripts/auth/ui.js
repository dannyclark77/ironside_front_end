'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#authMessage').text('Sign Up Successful! Sign in to continue.')
  $('#sign-up').trigger('reset')
}

const signUpFailure = function () {
  $('#authMessage').text('Sign Up Unsuccessful')
}

const signInSuccess = function (data) {
  store.user = data.user
  $('#authMessage').text('Sign-In Successful.')
  $('#sign-in').trigger('reset')
}

const signInFailure = function () {
  $('#authMessage').text('Sign In Unsuccessful')
}

const changePasswordSuccess = function (data) {
  $('#authMessage').text('Password Successfully Changed!')
  $('#change-password').trigger('reset')
}

const changePasswordFailure = function () {
  $('#authMessage').text('Password Change Unsuccessful')
}

const signOutSuccess = function (data) {
  store.user = null
  $('#authMessage').text('Sign Out Successful!')
}

const signOutFailure = function () {
  $('#authMessage').text('Sign Out Unsuccessful!')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
