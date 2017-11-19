'use strict'

const store = require('../store')
const rosterEvents = require('../roster/events')
const rosterUi = require('../roster/ui')

const signUpSuccess = function (data) {
  $('.message-form').html('Successfully signed up. Please log in!')
  $('#sign-up').trigger('reset')
}

const signUpFailure = function () {
  $('.message-form').text('Sign Up Unsuccessful')
  $('#sign-up').trigger('reset')
}

const signInSuccess = function (data) {
  store.user = data.user
  $('#modal-sign-in').modal('hide')
  $('.message-form').html('')
  $('#sign-in').trigger('reset')
  $('#btn-sign-up').hide()
  $('#btn-sign-in').hide()
  $('#btn-change-password').show()
  $('#btn-sign-out').show()
  rosterEvents.signInTopSeven()
  rosterEvents.onDeletePlayer()
  $('.year').show()
  $('.patch').show()
  $('#modal-team-name').modal('show')
  // $('#authMessage').text('test').delay(2500).fadeIn(300)
}

const signInFailure = function () {
  $('.message-form').text('Sign In Unsuccessful')
}

const changePasswordSuccess = function (data) {
  $('.message-form').text('Password Successfully Changed!')
  $('#change-password').trigger('reset')
}

const changePasswordFailure = function () {
  $('.message-form').text('Password Change Unsuccessful')
}

const signOutSuccess = function (data) {
  $('#btn-sign-up').show()
  $('#btn-sign-in').show()
  $('#btn-change-password').hide()
  $('#btn-sign-out').hide()
  $('.message-form').text('')
  $('.year').hide()
  $('.roster').text('')
  store.user = null
  store.players = null
  rosterUi.topSeven.length = 0
  $('.topseven').empty()
  $('#topseven').text('All Time Ironside Roster')
  $('#patch-message').text('')
  $('.patch-selection').empty()
  $('#roster').text('Ironside Roster')
  $('#results').text("This website is designed to allow users to create and share their own picks for Boston Ironside's all time top 7 team. Simply sign in and then select a year to choose from Ironside's roster that year.")
}

const signOutFailure = function () {
  $('.message-form').text('Sign Out Unsuccessful!')
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
