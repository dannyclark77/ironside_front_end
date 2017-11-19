'use strict'

const config = require('../config')
const store = require('../store')

const getTeamName = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/teams/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getTeamName
}
