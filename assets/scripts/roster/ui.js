'use strict'

const showRosterTemplate = require('../templates/roster-listing.handlebars')

const get2008Success = function (data) {
  console.log(data)
  const showRosterHtml = showRosterTemplate({ players: data.players })
  $('.roster').text('')
  $('.roster').append(showRosterHtml)
}

const get2008Failure = function (error) {
  console.error(error)
}

module.exports = {
  get2008Success,
  get2008Failure
}
