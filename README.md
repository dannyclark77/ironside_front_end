Ironside's All Time Top 7 Team: https://dannyclark77.github.io/ironside_top_seven/

A full-stack project by Danny Clark

This app was designed at General Assembly as part of the Web Development
Immersive coding bootcamp. It was designed to allow users to create an
all-time team of the top 7 players to ever play for Boston Ironside, a
national champion ultimate frisbee team.

After signing in, a user can view the full roster of the team for any particular
year by selecting the year from the column on the left. With the roster
populated, a user may then populate their all-time top 7 by clicking on any
player's name. This will automatically populate the list on the right. A user
is only allowed seven players on their all-time team. If they select more than
seven players, the oldest of the seven selected is cleared from the screen.
Players may be deleted simply by clicking on their name in the right column.
If more than seven players have been selected, when one is deleted, the most
recent selection that is not visible will be added back to the seven visible
players on the screen.

Technologies used on the front end include:
-HTML
-CSS
-javascript
-jquery
-handlebars
-AJAX

In the future, I hope to improve the app in two ways:
- Set up a function to find whether a name is already included on the list, and
if so, refuse to add the player to the list. Currently, a player who was on
the team in multiple years could end up with their name on a single person's
list multiple times because each year's name has a separate id.
- Create a display of other users' teams to create discussion and debate.

My wireframe is here: https://imgur.com/ogkgyeB

My user stories that I used to guide me in this process are:
1. As a young ultimate player, I want to know who the best ultimate players to
have played for Boston Ironside are.
2. As a fan of ultimate, I want to be able to participate in a crowd-sourced
poll to have a say as to who the best players to play for Boston Ironside were.
3. As an older fan, I want to be able to compare older players to today's
generation to see where they match up.

Back-End Repo: https://github.com/dannyclark77/ironside_back_end
Back-End Server: https://afternoon-earth-95866.herokuapp.com/


To-Dos:
- Add favicon - DONE
- Fix mobile formatting of player selection page - DONE
- Sign up automatically logs you in - DONE
- Message to user that roster is created when 7 players added
- Don't log out on refresh
- Add Jordan and Hirsch to 2016 roster - DONE
- More info on sign-up error - email already taken?
- Pretty up created teams
- Add padding/margin at the bottom of the page
- Click event working on extended area beyond button - DONE
- Check whether team already exists for another user
