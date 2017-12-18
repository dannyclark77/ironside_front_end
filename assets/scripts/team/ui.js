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
}

const getTeamNameFailure = function (error) {
  console.log(error)
}

const getAllTeamsSuccess = function (data) {
  console.log('getAllTeamsSuccess data is ', data)
  const allTeamNamesArray = data.teams.map(a => a.team_name)
  const dataFilter = function (value, index, all) {
    return all.indexOf(value) === index
  }
  const uniqueTeamNamesArray = allTeamNamesArray.filter(dataFilter)
  uniqueTeamNamesArray.forEach(teamName => {
    const newTeam = data.teams.map(item => {
      if (item.team_name === teamName && item.team_name !== null) {
        return item
      }
    })
    const filterTeam = newTeam.filter(player => player !== undefined)
    console.log('filterTeam is ', filterTeam)
    if (filterTeam.length >= 7) {
      console.log('if statement filterTeam is ', filterTeam)
      const showCreatedTeamsHtml = showCreatedTeamsTemplate({ players: filterTeam })
      $('.team-listing').append(showCreatedTeamsHtml)
    }
  })
}

const getAllTeamsFailure = function (error) {
  console.log(error)
}

module.exports = {
  getTeamNameSuccess,
  getTeamNameFailure,
  getAllTeamsSuccess,
  getAllTeamsFailure
}
