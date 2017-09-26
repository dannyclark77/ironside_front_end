'use strict'

const showRosterTemplate = require('../templates/roster-listing.handlebars')
const store = require('../store')
const api = require('./api')

const get2008Success = function (data) {
  store.players = data.players
  const showRosterHtml = showRosterTemplate({ players: store.players })
  $('.roster').text('')
  $('.roster').append(showRosterHtml)
  postTeam()
}

const get2008Failure = function (error) {
  console.error(error)
}

const postTeam = function (data) {
  $('.roster').on('click', 'ul', function (event) {
    event.preventDefault()
    api.postTeamRoster($(this).data('id'))
      .then(postTeamSuccess)
      .catch(postTeamFailure)
  })
}

const postTeamSuccess = function (data) {
  $('.topseven').append('<br>')
  $('.topseven').append(data.team.player.name)
}

const postTeamFailure = function (error) {
  console.error(error)
}

const getTopSevenSuccess = function (data) {
  let topSeven = []
  data.teams.forEach(function (data) {
    if (data.user.id === store.user.id) {
      topSeven.push(data.player.name)
    }
  })
  console.log(topSeven)
  $('.topseven').append(topSeven)
}

const getTopSevenFailure = function (error) {
  console.error(error)
}

module.exports = {
  get2008Success,
  get2008Failure,
  getTopSevenSuccess,
  getTopSevenFailure
}
