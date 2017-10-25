'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onGetPlayers = function (event) {
  event.preventDefault()
  store.year = $(this).data('id')
  api.getPlayers()
    .then(ui.getPlayersSuccess)
    .then(clickTeam)
    .catch(ui.getPlayersFailure)
}

const signInTopSeven = function () {
  api.signInTopSevenRoster()
    .then(ui.signInTopSevenSuccess)
    .catch(ui.signInTopSevenFailure)
}

const clickTeam = function () {
  $('.roster').off().on('click', 'ul', function (event) {
    event.preventDefault()
    // if ($.grep(topSeven, function (obj) { return obj.player.name }) === $(this).text()) {
    //   console.log('Please choose another player')
    // } else {
    api.postTeamRoster($(this).data('id'))
      .then(ui.postTeamSuccess)
      .catch(ui.postTeamFailure)
    // }
  })
}

const onDeletePlayer = function () {
  $('.topseven').off().on('click', 'ul', function (event) {
    event.preventDefault()
    $(this).remove()
    const index = ui.topSeven.findIndex(x => x.id === $(this).data('id'))
    ui.topSeven.splice(index, 1)
    api.deleteEight($(this).data('id'))
      .then(ui.deletePlayerSuccess)
      .catch(ui.deletePlayerFailure)
  })
}

const addHandlers = function () {
  $('[data-id=2008]').off().on('click', onGetPlayers)
  $('[data-id=2009]').off().on('click', onGetPlayers)
  $('[data-id=2010]').off().on('click', onGetPlayers)
  $('[data-id=2011]').off().on('click', onGetPlayers)
  $('[data-id=2012]').off().on('click', onGetPlayers)
  $('[data-id=2013]').off().on('click', onGetPlayers)
  $('[data-id=2014]').off().on('click', onGetPlayers)
  $('[data-id=2015]').off().on('click', onGetPlayers)
  $('[data-id=2016]').off().on('click', onGetPlayers)
  $('[data-id=2017]').off().on('click', onGetPlayers)
}

module.exports = {
  addHandlers,
  signInTopSeven,
  onDeletePlayer
}
