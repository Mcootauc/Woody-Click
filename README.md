# LMUHacks 2023
By Lawrence Benitez, Owen Hunger, Aiden McDougald, and Mitchell Cootauco

# Project
We are creating a semi-idle game about planting trees.  Users can donate to plant trees in real life to receive bonuses that allow them to plant more trees in game.


- A game where you click on a tree to get points 
  - Objective: Try to get the most points to be #1 on the leaderboard
- Related to the climate change goal:
  - Once you get to a certain point your point generation will plateau 
  - Donations to Team Trees help you “skip levels”
  - The incentives to donate are to help the environment and to be #1 on the leaderboard
- Additional Features:
  - You can create an account using a username and password
  - Stores the usernames, the number of trees, and the timestamp of the donation to our google firebase.
- Problems we had to figure out:
  - We had to figure out the in-game currency 
  - How to scrape the website
  - Store the usernames, the number of trees, and the timestamp of the donation to our google firebase.
  - How to repeatedly check the website for new donations  after a set amount of time passes
   - Also adding new donation data while avoiding duplicates
