'use strict'

const showRosterTemplate = require('../templates/roster-listing.handlebars')
const store = require('../store')
const api = require('./api')

const get2008Success = function (data) {
  store.players = data.players
  console.log(store.players)
  const showRosterHtml = showRosterTemplate({ players: store.players })
  $('.roster').text('')
  $('.roster').append(showRosterHtml)
  $('.roster').on('click', 'ul', function (event) {
    event.preventDefault()
    api.postTeamRoster($(this).data('id'))
      .then(postTeamSuccess)
      .catch(postTeamFailure)
  })
}

const get2008Failure = function (error) {
  console.error(error)
}

const postTeamSuccess = function (data) {
  console.log(data)
  $('.topseven').append('<br>')
  $('.topseven').append(data.team.player.name)
}

const postTeamFailure = function (error) {
  console.error(error)
}

module.exports = {
  get2008Success,
  get2008Failure
}
