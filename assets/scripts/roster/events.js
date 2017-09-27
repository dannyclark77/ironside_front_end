'use strict'

const api = require('./api')
const ui = require('./ui')

const onGet2008Roster = function (event) {
  event.preventDefault()
  api.get2008Roster()
    .then(ui.get2008Success)
    .catch(ui.get2008Failure)
}

const signInTopSeven = function () {
  api.signInTopSevenRoster()
    .then(ui.signInTopSevenSuccess)
    .catch(ui.signInTopSevenFailure)
}

const onDeletePlayer = function () {
  $('.topseven').on('click', 'ul', function (event) {
    event.preventDefault()
    api.deleteEight($(this).data('id'))
      .then(ui.deletePlayerSuccess)
      .catch(ui.deletePlayerFailure)
  })
}

const addHandlers = function () {
  $('#2008').on('click', onGet2008Roster)
}

module.exports = {
  addHandlers,
  signInTopSeven,
  onDeletePlayer
}
