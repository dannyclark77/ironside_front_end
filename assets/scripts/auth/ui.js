'use strict'

const store = require('../store')
const rosterEvents = require('../roster/events')
const rosterUi = require('../roster/ui')

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
  rosterEvents.signInTopSeven()
  rosterEvents.onDeletePlayer()
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
  console.log(store)
  store.user = null
  store.players = null
  rosterUi.topSeven.length = 0
  $('#authMessage').text('Sign Out Successful!')
  $('.topseven').empty()
  $('.topseven').text('Top Seven Selections')
  $('.roster').text('Roster of Year X')
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
