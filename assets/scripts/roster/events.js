'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getTopSevenTemplate = require('../templates/patch-top-seven.handlebars')

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
    .then(onGetTeam)
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
      .then(onGetTeam)
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
      .then(onGetTeam)
      .catch(ui.deletePlayerFailure)
  })
}

const onGetTeam = function () {
  if (ui.topSeven.length === 0) {
    $('.patch-selection').empty()
    $('.patch-selection').html('<h4>Please add a player to your all-time team list by clicking on a player above</h4>')
  } else {
    const getTopSevenHtml = getTopSevenTemplate({ data: ui.topSeven })
    $('.patch-selection').empty()
    $('.patch-selection').append(getTopSevenHtml)
    $('.patch-selection').off().on('submit', 'form', onPatchTeam)
  }
}

const onPatchTeam = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.patchTeam(data)
    .then(ui.patchTeamSuccess)
    .then(api.signInTopSevenRoster)
    .then(ui.signInTopSevenSuccess)
    .then(onGetTeam)
    .catch(ui.patchTeamFailure)
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
  onDeletePlayer,
  onGetTeam
}
