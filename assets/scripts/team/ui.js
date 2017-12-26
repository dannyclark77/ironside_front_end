'use strict'

const rosterEvents = require('../roster/events')
const store = require('../store')
const showCreatedTeamsTemplate = require('../templates/created-teams.handlebars')

const getTeamNameSuccess = function (data) {
  $('#modal-team-name').modal('hide')
  $('#team-name').trigger('reset')
  rosterEvents.signInTopSeven()
  rosterEvents.onDeletePlayer()
  $('#year').show()
  $('#roster').show()
  $('#topseven').show().text('Team: ' + store.teamName)
  $('.year').show()
  $('.roster').show()
  $('.topseven').show()
  $('.patch').show()
  $('.team-history').hide()
  $('.team-listing').text('')
}

const getTeamNameFailure = function (error) {
  console.log(error)
}

const getAllTeamsSuccess = function (data) {
  $('#year').hide()
  $('#roster').hide()
  $('#topseven').hide()
  $('.year').hide()
  $('.roster').hide()
  $('.topseven').hide()
  $('.patch').hide()
  $('.team-history').hide()
  $('.team-listing').text('')
  const dataFilter = function (value, index, all) {
    return all.indexOf(value) === index
  }
  const allUsersArray = data.teams.map(a => a.user.id)
  const uniqueUsersArray = allUsersArray.filter(dataFilter)
  const allTeamNamesArray = data.teams.map(a => a.team_name)
  const uniqueTeamNamesArray = allTeamNamesArray.filter(dataFilter)

  uniqueUsersArray.forEach(userID => {
    uniqueTeamNamesArray.forEach(teamName => {
      const filterTeam = data.teams.filter(item => {
        if (item.user.id === userID && item.team_name === teamName && item.team_name !== null && item.player !== undefined) {
          return item
        }
      })
      if (filterTeam.length >= 7) {
        const showCreatedTeamsHtml = showCreatedTeamsTemplate({ players: filterTeam })
        $('.team-listing').append(showCreatedTeamsHtml)
      }
    })
  })
}

const getAllTeamsFailure = function (error) {
  console.log(error)
}

const teamHistory = function () {
  $('#year').hide()
  $('#roster').hide()
  $('#topseven').hide()
  $('.year').hide()
  $('.roster').hide()
  $('.topseven').hide()
  $('.patch').hide()
  $('.team-listing').text('')
  $('.team-history').show()
}

module.exports = {
  getTeamNameSuccess,
  getTeamNameFailure,
  getAllTeamsSuccess,
  getAllTeamsFailure,
  teamHistory
}
