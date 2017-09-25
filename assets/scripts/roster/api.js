'use strict'

const config = require('../config')

const get2008Roster = function () {
  return $.ajax({
    url: config.apiOrigin + '/players/',
    method: 'GET'
  })
}

module.exports = {
  get2008Roster
}
