# Bingeworthy.anime

Bindgeworthy Anime is a fullstack web application designed for anime enthusiasts to explore and review various "bingeworthy" anime titles. 

## Table of Contents

- [Demo](#demo)

- [Features](#features)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [Components and hooks](#components-and-hooks)

## Demo
![1](https://github.com/marku1a/Bingeworthy.anime/assets/122821687/5359d3ca-c3c2-4178-9d40-b9a90e1374cb)
![3](https://github.com/marku1a/Bingeworthy.anime/assets/122821687/e0fa1e47-001b-4b67-86d7-c0b0f71c3340)
![4](https://github.com/marku1a/Bingeworthy.anime/assets/122821687/9b2572e5-e779-4bf2-af33-e3bbf599bf1c)
![5](https://github.com/marku1a/Bingeworthy.anime/assets/122821687/139f7923-f908-4cb7-b7ca-b077c63e3bc9)
![6](https://github.com/marku1a/Bingeworthy.anime/assets/122821687/6873e58c-9e71-46f7-96fa-4da77c8d9274)





## Features

- **Home:** Browse a dynamic slideshow of various anime titles with navigation buttons to switch between slides.
- **Anime List:** View a comprehensive list of all available anime.
- **Reviews:** Explore reviews of selected anime and write your own reviews (for registered users).
- **Trailer:** Watch trailers for the anime titles.
- **Authentication:** Register for an account or log in with existing credentials.
- **Authorization:** Registered users can read and write reviews, while administrators have additional privileges for CRUD anime entries.
- **Persistent Login:** Stay logged in across sessions with JWT-based authentication.

## Technical Stack

- **Frontend:** React.js
- **Backend:** Java/Spring boot ([Anime-API](https://github.com/marku1a/Anime-API))
- **Database:** MongoDB
- **Authentication:** JWT 

## Getting Started

- **Clone Repository:**  
   ```sh
   git clone https://github.com/marku1a/bindgeworthy-anime.git
   cd bindgeworthy-anime
- **Install dependencies:**
   ```sh
   npm install
- **Configure backend:** refer to backend instructions.
- **Start the development server:**
   ```sh
   npm start

## Components and hooks

- **App.js:** The main application component that manages routing.
- **Layout.js:** The primary layout component that holds the header and main content area.
- **Header.js:** Displays home/anime list navigation, login/register/logout options.
- **Home.js:** Renders the anime slideshow and other homepage elements.
- **Trailer.js:** Displays a trailer for a specific anime based on the provided YouTube ID.
- **Hero.js:** Renders the anime slideshow with navigation buttons.
- **Registration.js:** Handles user registration.
- **Login.js:** Handles user login.
- **RequireAuth.js:** Higher-order component to protect routes based on user roles.
- **PersistLogin.js:** Handles persistent login functionality with JWT.
- **useAuth.js:** Custom hook for managing user authentication state, role, access token.
- **useAxiosPrivate.js:** Custom hook for managing API calls that require an access token.
It refreshes the access token if it has expired and then executes the desired API call with the updated token.
- **useRefreshToken.js:** Custom hook for managing the refresh token mechanism. It sends the HTTP-only,
secure cookie containing the refresh token to the backend, facilitating the retrieval of a new access token to maintain user authentication seamlessly.
- **AnimeList.js:** Displays the list of all anime and allows fetching new data.
- **AnimeCreate.js:** Provides functionality for admins to create new anime entries.
- **AnimeUpdate.js:** Allows admins to edit existing anime information.
- **axios.js:** Configures axios for making API calls to the backend.


---

Feel free to explore the code and contribute to the project. If you have any questions or need further information, don't hesitate to reach out!
