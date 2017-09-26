'use strict'

const showRosterTemplate = require('../templates/roster-listing.handlebars')
const showTopSevenTemplate = require('../templates/top-seven.handlebars')
const store = require('../store')
const api = require('./api')

let topSeven = []

const get2008Success = function (data) {
  store.players = data.players
  const showRosterHtml = showRosterTemplate({ players: store.players })
  $('.roster').text('')
  $('.roster').append(showRosterHtml)
  clickTeam()
}

const get2008Failure = function (error) {
  console.error(error)
}

const clickTeam = function (data) {
  $('.roster').on('click', 'ul', function (event) {
    event.preventDefault()
    api.postTeamRoster($(this).data('id'))
      .then(postTeamSuccess)
      .catch(postTeamFailure)
  })
}

const postTeamSuccess = function (data) {
  topSeven.push(data.team.player.name)
  $('.topseven').text('')
  $('.topseven').append(topSeven.slice(-7))
}

const postTeamFailure = function (error) {
  console.error(error)
}

const signInTopSevenSuccess = function (data) {
  data.teams.forEach(function (data) {
    if (data.user.id === store.user.id) {
      topSeven.push(data.player.name)
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
  console.log('display Top Seven ran')
  const showTopSevenHtml = showTopSevenTemplate({ players: topSeven })
  $('.topseven').append(showTopSevenHtml)
}

const onDeleteEight = function (data) {
  api.deleteEight(data)
    .then(deleteEightSuccess)
    .catch(deleteEightFailure)
}

const deleteEightSuccess = function () {
  console.log('Delete ran')
}

const deleteEightFailure = function (error) {
  console.error(error)
}

module.exports = {
  get2008Success,
  get2008Failure,
  signInTopSevenSuccess,
  signInTopSevenFailure
}
