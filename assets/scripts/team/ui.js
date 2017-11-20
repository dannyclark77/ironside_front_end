'use strict'

const getTeamNameSuccess = function (data) {
  console.log('Team Name Success data is ', data)
  $('#modal-team-name').modal('hide')
}

const getTeamNameFailure = function (error) {
  console.log(error)
}

module.exports = {
  getTeamNameSuccess,
  getTeamNameFailure
}
