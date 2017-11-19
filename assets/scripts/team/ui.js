'use strict'

const getTeamNameSuccess = function (data) {
  console.log('Team Name Success data is ', data)
}

const getTeamNameFailure = function (error) {
  console.log(error)
}

module.exports = {
  getTeamNameSuccess,
  getTeamNameFailure
}
