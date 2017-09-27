'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onGetPlayers = function (event) {
  event.preventDefault()
  store.year = $(this).data('id')
  api.getPlayers()
    .then(ui.getPlayersSuccess)
    .catch(ui.getPlayersFailure)
}

const signInTopSeven = function () {
  api.signInTopSevenRoster()
    .then(ui.signInTopSevenSuccess)
    .catch(ui.signInTopSevenFailure)
}

const onDeletePlayer = function () {
  $('.topseven').off().on('click', 'ul', function (event) {
    event.preventDefault()
    console.log($(this))
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
