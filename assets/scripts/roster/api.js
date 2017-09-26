'use strict'

const config = require('../config')
const store = require('../store')

const get2008Roster = function () {
  return $.ajax({
    url: config.apiOrigin + '/players/',
    method: 'GET'
  })
}

const postTeamRoster = function (players) {
  return $.ajax({
    url: config.apiOrigin + '/teams/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'team': {
        'user_id': store.user.id,
        'player_id': players
      }
    }
  })
}

module.exports = {
  get2008Roster,
  postTeamRoster
}
