'use strict'

const showRosterTemplate = require('../templates/roster-listing.handlebars')
const showTopSevenTemplate = require('../templates/top-seven.handlebars')
const store = require('../store')
const api = require('./api')

let topSeven = []

const getPlayersSuccess = function (data) {
  store.players = data.players
  const filteredPlayers = store.players.filter(function (obj) {
    return obj.year === store.year
  })
  const showRosterHtml = showRosterTemplate({ players: filteredPlayers })
  $('.roster').empty()
  $('.roster').append(showRosterHtml)
  clickTeam()
  store.players = null
}

const getPlayersFailure = function (error) {
  console.error(error)
}

const clickTeam = function () {
  $('.roster').off().on('click', 'ul', function (event) {
    event.preventDefault()
    // if ($.grep(topSeven, function (obj) { return obj.player.name }) === $(this).text()) {
    //   console.log('Please choose another player')
    // } else {
    api.postTeamRoster($(this).data('id'))
      .then(postTeamSuccess)
      .catch(postTeamFailure)
    // }
  })
}

const postTeamSuccess = function (data) {
  topSeven.push(data.team)
  displayTopSeven()
}

const postTeamFailure = function (error) {
  console.error(error)
}

const signInTopSevenSuccess = function (data) {
  data.teams.forEach(function (data) {
    if (data.user.id === store.user.id) {
      topSeven.push(data)
    }
  })
  if (topSeven.length > 7) {
    const result = $.grep(data.teams, function (element) {
      return element.user.id === store.user.id
    })
    onDeleteEight(result[0].id)
  }
  displayTopSeven()
}

const signInTopSevenFailure = function (error) {
  console.error(error)
}

const displayTopSeven = function () {
  console.log(topSeven)
  if (topSeven.length > 7) {
    const slicedTopSeven = topSeven.slice(-7)
    const showTopSevenHtml = showTopSevenTemplate({ data: slicedTopSeven })
    $('.topseven').text('')
    $('.topseven').append(showTopSevenHtml)
  } else {
    const showTopSevenHtml = showTopSevenTemplate({ data: topSeven })
    $('.topseven').text('')
    $('.topseven').append(showTopSevenHtml)
  }
}

const onDeleteEight = function (data) {
  api.deleteEight(data)
    .then(deletePlayerSuccess)
    .catch(deletePlayerFailure)
}

const deletePlayerSuccess = function (data) {
  console.log('delete player success')
}

const deletePlayerFailure = function (error) {
  console.error(error)
}

module.exports = {
  getPlayersSuccess,
  getPlayersFailure,
  signInTopSevenSuccess,
  signInTopSevenFailure,
  topSeven,
  deletePlayerSuccess,
  deletePlayerFailure
}
