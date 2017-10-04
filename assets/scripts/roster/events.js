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
  const getTopSevenHtml = getTopSevenTemplate({ data: ui.topSeven })
  $('.patch').text('')
  $('.patch').append(
    '<h4>Please select the button below if you would like to update your top seven players list using player IDs</h4>',
    '<button data-id="patch">Select</button>'
  )
  $('[data-id=patch]').off().on('click', onGetTeam)
  $('.patch-selection').empty()
  $('.patch-selection').append(getTopSevenHtml)
  $('.patch-selection').off().on('submit', 'form', onPatchTeam)
}

const onPatchTeam = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.patchTeam(data)
    .then(ui.patchTeamSuccess)
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
  $('[data-id=patch]').off().on('click', onGetTeam)
}

module.exports = {
  addHandlers,
  signInTopSeven,
  onDeletePlayer
}
