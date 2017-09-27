'use strict'

const config = require('../config')
const store = require('../store')

const getPlayers = function () {
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

const signInTopSevenRoster = function () {
  return $.ajax({
    url: config.apiOrigin + '/teams/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteEight = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/teams/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getPlayers,
  postTeamRoster,
  signInTopSevenRoster,
  deleteEight
}
