# Moribus
[Video Demo](https://www.youtube.com/watch?v=L3hNJs0F3eU)

Moribus is an outdoors adventure app that helps the user find their next camping destination. Once there, it assists with the navigation of common difficulties involved with being in the wilderness.

[Link to Backend API](https://github.com/DonatelloTHM/Moribus-backend/)


## Table of Contents
* [Getting Started](#getting-started)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Tools](#tools)

![Moribus](https://i.ibb.co/f9GmtdJ/Screen-Shot-2020-12-12-at-12-02-41-PM.png)

<a name="getting-started"/>

## Getting Started
1. Install [Rails Backend API](https://github.com/DonatelloTHM/Moribus-backend/)
2. Install [Node.js and npm](https://www.npmjs.com/get-npm)

    ```$ brew install node```
    
3. Clone this repo and cd into the directory
4. Install all dependencies

    ```$ npm install```

5. Make sure the Rails server is running and then run the app

    ```$ npm start```
    
<a name="features"/>

## Features

### Search National Parks
![Search National Parks](https://i.ibb.co/9tW33tV/Screen-Shot-2020-12-12-at-12-52-06-PM.png)
* Search among 423 national parks that are sorted by distance relative to the user's location.
* See the most recent informations about a park, courtesy of NPS API
* Filter and sort the parks by different attributes.

### Review A Park
![Review A Park](https://i.ibb.co/DG8nZHs/leavereview.gif)
* Add a review about your experience at a national park.
* Give a rating to a park.

### Add Animal Sightings
![Add Animal Sightings](https://i.ibb.co/k1CHhVF/Screen-Shot-2020-12-12-at-1-07-01-PM.png)
* Add animal sightings when you spot a dangerous animal.
* Alert a user when entering the territory of a dangerous animal.
* Show information about a dangerous animal.

### Add Resource Sightings
![Bookmark Establishments](https://i.ibb.co/fpvyyh9/addresource.gif)
* Add sightings for essential resources during camping or hiking.
* Show the closest resource at all times.

### Auth Features
![Auth Features](https://i.ibb.co/nQDv7RK/logingif.gif)
![Auth Features](https://i.ibb.co/7z7Ngrs/registrationgif.gif)
* Secure login and registration courtesy of JWT Auth, BCrypt.

<a name="tech-stack"/>

## Tech Stack
* React.js
* Redux
* Ruby on Rails API (Backend: https://github.com/DonatelloTHM/Moribus-backend/)
* PostgreSQL
* PostGIS
* Mapbox
* RGeo
* HTML
* SASS/SCSS
* Geolocation API
* Active Record

<a name="tools"/>

## Tools
* [Rack CORS](https://github.com/cyu/rack-cors)
* [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers)
* [BCrypt](https://github.com/codahale/bcrypt-ruby)
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [JWT](https://github.com/jwt/ruby-jwt)
* [RGeo](https://github.com/rgeo/rgeo)
* [Urbica React Map GL](https://github.com/urbica/react-map-gl)
* [React Rating](https://www.npmjs.com/package/react-rating)
* [Cloudinary](https://cloudinary.com/documentation/rails_integration)
* [Sweetalert 2](https://sweetalert2.github.io/)
* [Alchemist](https://github.com/halogenandtoast/alchemist)
* [Luxon](https://moment.github.io/luxon/)
