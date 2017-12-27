'use strict'

const rosterEvents = require('../roster/events')
const store = require('../store')
const showCreatedTeamsTemplate = require('../templates/created-teams.handlebars')
const showMostSelectedTemplate = require('../templates/most-selected.handlebars')

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
  $('.most-selected-list').text('')
}

const getTeamNameFailure = function (error) {
  console.log(error)
}

const getAllTeamsSuccess = function (data) {
  const allPlayers = []
  $('#year').hide()
  $('#roster').hide()
  $('#topseven').hide()
  $('.year').hide()
  $('.roster').hide()
  $('.topseven').hide()
  $('.patch').hide()
  $('.team-history').hide()
  $('.team-listing').text('')
  $('.most-selected-list').text('')
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
        allPlayers.push(filterTeam)
        const showCreatedTeamsHtml = showCreatedTeamsTemplate({ players: filterTeam })
        $('.team-listing').append(showCreatedTeamsHtml)
      }
    })
  })
  topSelectedPlayers(allPlayers)
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
  $('.most-selected-list').text('')
  $('.team-history').show()
}

const topSelectedPlayers = function (players) {
  const flattenedPlayers = [].concat.apply([], players)
  const allPlayersArray = flattenedPlayers.map(a => a.player.name)
  const playerOccurrences = {}
  for (let i = 0; i < allPlayersArray.length; ++i) {
    if (!playerOccurrences[allPlayersArray[i]]) {
      playerOccurrences[allPlayersArray[i]] = 1
    } else {
      ++playerOccurrences[allPlayersArray[i]]
    }
  }
  const playerOccurrencesSorted = Object.keys(playerOccurrences).sort(function (a, b) {
    return playerOccurrences[b] - playerOccurrences[a]
  })
  const mostSelectedPlayers = playerOccurrencesSorted.slice(0, 7)
  const showMostSelectedPlayersHtml = showMostSelectedTemplate({ players: mostSelectedPlayers })
  $('.most-selected-list').append(showMostSelectedPlayersHtml)
}

module.exports = {
  getTeamNameSuccess,
  getTeamNameFailure,
  getAllTeamsSuccess,
  getAllTeamsFailure,
  teamHistory
}
