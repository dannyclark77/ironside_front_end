'use strict'

const store = require('../store')
const rosterUi = require('../roster/ui')

const signUpSuccess = function (data) {
  $('#modal-sign-up').modal('hide')
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
  $('.patch').show()
  $('#team-nav').show()
  // $('#all-time-nav').show()
  $('#results').text('')
  $('#results').append('To create a new all-time team, or edit a currently-existing team, please select `Create/Update Team` from the nav bar above. <br />To see All-Time Teams that have been created by other users, select `All-Time Rosters` from the nav bar.<br />To learn more about Boston Ironside, select `Team History` from the nav bar.')
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
  store.teamName = null
  rosterUi.topSeven.length = 0
  $('.topseven').empty()
  $('#topseven').hide()
  $('#roster').hide()
  $('#year').hide()
  $('#patch-message').text('')
  $('.patch-selection').empty()
  $('#roster').text('Ironside Roster')
  $('#results').text("This website is designed to allow users to create and share their own picks for Boston Ironside's all time top 7 team. Click 'All-Time Rosters' from the navigation bar above, or sign in to create and share your own all-time team.")
  $('#team-nav').hide()
  // $('.team-listing').empty()
  // $('#all-time-nav').hide()
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
