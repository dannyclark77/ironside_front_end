'use strict'

const showRosterTemplate = require('../templates/roster-listing.handlebars')
const showTopSevenTemplate = require('../templates/top-seven.handlebars')
const store = require('../store')
const api = require('./api')

let topSeven = []

const get2008Success = function (data) {
  store.players = data.players
  const showRosterHtml = showRosterTemplate({ players: store.players })
  $('.roster').text('')
  $('.roster').append(showRosterHtml)
  clickTeam()
}

const get2008Failure = function (error) {
  console.error(error)
}

const clickTeam = function () {
  $('.roster').on('click', 'ul', function (event) {
    event.preventDefault()
    console.log(topSeven[0].player.name)
    console.log($(this).text())
    if ($.grep(topSeven, function (obj) { return obj.player.name }) === $(this).text()) {
      console.log('Please choose another player')
    } else {
      api.postTeamRoster($(this).data('id'))
        .then(postTeamSuccess)
        .catch(postTeamFailure)
    }
  })
}

const postTeamSuccess = function (data) {
  topSeven.push(data.team)
  displayTopSeven()
}

const postTeamFailure = function (error) {
  console.error(error)
}

const signInTopSevenSuccess = function (data) {
  data.teams.forEach(function (data) {
    if (data.user.id === store.user.id) {
      topSeven.push(data)
    }
  })
  if (topSeven.length > 7) {
    const result = $.grep(data.teams, function (element) {
      return element.user.id === store.user.id
    })
    onDeleteEight(result[0].id)
  }
  displayTopSeven()
}

const signInTopSevenFailure = function (error) {
  console.error(error)
}

const displayTopSeven = function () {
  if (topSeven.length > 7) {
    const slicedTopSeven = topSeven.slice(-7)
    console.log(slicedTopSeven)
    const showTopSevenHtml = showTopSevenTemplate({ data: slicedTopSeven })
    $('.topseven').text('')
    $('.topseven').append(showTopSevenHtml)
  } else {
    const showTopSevenHtml = showTopSevenTemplate({ data: topSeven })
    $('.topseven').text('')
    $('.topseven').append(showTopSevenHtml)
  }
}

const onDeleteEight = function (data) {
  api.deleteEight(data)
    .then(deletePlayerSuccess)
    .catch(deletePlayerFailure)
}

const deletePlayerSuccess = function () {
  console.log('delete player success')
}

const deletePlayerFailure = function (error) {
  console.error(error)
}

module.exports = {
  get2008Success,
  get2008Failure,
  signInTopSevenSuccess,
  signInTopSevenFailure,
  topSeven,
  deletePlayerSuccess,
  deletePlayerFailure
}
