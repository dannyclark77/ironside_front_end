'use strict'

const rosterEvents = require('../roster/events')
const store = require('../store')

const getTeamNameSuccess = function (data) {
  $('#modal-team-name').modal('hide')
  $('#team-name').trigger('reset')
  rosterEvents.signInTopSeven()
  rosterEvents.onDeletePlayer()
  $('#topseven').text('Team: ' + store.teamName)
}

const getTeamNameFailure = function (error) {
  console.log(error)
}

module.exports = {
  getTeamNameSuccess,
  getTeamNameFailure
}
