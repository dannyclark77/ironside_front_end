'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onTeamName = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  if (data.existingTeamName && data.newTeamName) {
    $('.message-form').text('Please enter team name in only one field')
  } else if (data.existingTeamName) {
    store.teamName = data.existingTeamName
    api.getTeamName(data.existingTeamName)
      .then(ui.getTeamNameSuccess)
      .catch(ui.getTeamNameFailure)
  } else {
    store.teamName = data.newTeamName
  }
}

const addHandlers = function () {
  $('#team-name').on('submit', onTeamName)
}

module.exports = {
  addHandlers
}
