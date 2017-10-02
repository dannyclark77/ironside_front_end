'use strict'

const store = require('../store')
const rosterEvents = require('../roster/events')
const rosterUi = require('../roster/ui')

const signUpSuccess = function (data) {
  $('#authMessage').text('Sign Up Successful. Sign in to continue.')
  $('#sign-up').trigger('reset')
}

const signUpFailure = function () {
  $('#authMessage').text('Sign Up Unsuccessful')
}

const signInSuccess = function (data) {
  store.user = data.user
  $('#authMessage').text('Sign-In Successful')
  $('#sign-in').trigger('reset')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').show()
  $('#sign-out').show()
  rosterEvents.signInTopSeven()
  rosterEvents.onDeletePlayer()
  $('.year').show()
  $('.patch').show()
  // $('#authMessage').text('test').delay(2500).fadeIn(300)
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
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('.year').hide()
  $('.roster').text('')
  store.user = null
  store.players = null
  rosterUi.topSeven.length = 0
  $('#authMessage').text('Sign Out Successful!')
  $('.topseven').empty()
  $('#topseven').text('All Time Ironside Roster')
  $('.patch').hide()
  $('.patch-selection').empty()
  $('#roster').text('Ironside Roster')
  $('#results').text("This website is designed to allow users to create and share their own picks for Boston Ironside's all time top 7 team. Simply sign in and then select a year to choose from Ironside's roster that year.")
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
