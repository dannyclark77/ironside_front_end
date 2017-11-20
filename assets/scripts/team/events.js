'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onTeamName = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  if (data.teamName) {
    store.teamName = data.teamName
    api.getTeamName(data.teamName)
      .then(ui.getTeamNameSuccess)
      .catch(ui.getTeamNameFailure)
  } else if (!data.teamName) {
    $('.message-form').text('Please enter a team name into the field')
  }
}

const addHandlers = function () {
  $('#team-name').on('submit', onTeamName)
}

module.exports = {
  addHandlers
}
