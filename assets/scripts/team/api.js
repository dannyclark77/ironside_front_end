'use strict'

const config = require('../config')

const getTeamName = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/teams/',
    method: 'GET'
  })
}

module.exports = {
  getTeamName
}
