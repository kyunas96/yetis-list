# Yetis List

### Yetis List 

Yetis List is a music recommendation app that uses Spotify's api to associate similar sounds.

## Background and Overview

Finding that right playlist to fit the mood isn't always easy. Yetis List can help by providing songs that you may like! How do we know which to suggest? We use Spotify's api to get similar songs based on different song attributes such as danceability, tempo, valence, and much more. Enjoy every moment with your very own soundtrack!

Yetis List will give users the option to link their own spotify account to get a more personalized experience. (This is optional)

We will need to: 
  * Query for songs and relevant information using Spotify's api 
  * Build a database to store data for users, playlists, likes, and comments

## Technologies & Technical Challenges

Yetis List's core application is a music recommendation app, with a back end built on MongoDB to save user auth and browsing data. The recommendations are aided by the use of Spotify's api

  ##### Spotify Api
  ##### Backend: MongoDB/Express
  ##### Frontend: React/Node.js

#### Spotify Api
 
The Spotify Api will be the main method for gathering song data and displaying relevant information to the user. The songs returned by spotify is how we populate the playlist

Technical challenges: 

Collecting specific song information to display for the user
Querying for songs within a specific category to fit the mood of the user
CRUD for playlists and comments on playlists
Giving users the option to authenticate using their Spotify account

##### Backend: MongoDB/Express 

The users, playlists, likes, and comments will be stored as objects in a nested object structure. 

Technical challenges: 

Storing songIds and retrieving such songs from Spotify using their api

##### Frontend: React/Node.js 

The data for each song will be shown to users in graph format

Technical challenges: 
  - Reading data from the Spotify api and organizing it for display 
  - Implementing effective song, album, artist, or playlist, search 

## Group Members & Work Breakdown

**Elijah Ally**,
**Kevin OConnor**,
**Brian Codington**,
**Kevin Yunas**,

### June 14
  - Build skeleton React site -  **Brian Codington**
  - Build the skeleton Backend - **Elijah Ally**
  - Investigate Spotify API methods and test collection of data - **Kevin Yunas** 
  - Begin design layout of graphs and site styling / Assisting - **Kevin OConnor** 

### June 15
  - Continue and complete the basic work from Sunday - **All**
  - Build login/signup view on Chrome - **Kevin OConnor/Brian Codington**
  - Connect React-based Web application to database **All**
  - Write and test Spotify api calls - **Elijah Ally/Kevin Yunas**

### June 16
  - Maintaining a similar theme for styling - **Kevin OConnor** 
  - Playlist CRUD - **Elijah Ally** 
  - Comments CRUD - **Kevin Yunas**
  - Likes - **Brian Codington**

### June 17 **All**
  - Implement Search capabilities
  - Implement Spotify Api
  - Display song info to user

### June 18 **All**
  - Make seed/demo data and visualizations for guest user
  - Complete Production README.md
  - Refine design/CSS 
  - Finish testing and debugging
  


