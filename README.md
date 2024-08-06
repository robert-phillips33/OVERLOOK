<div align="center">

# _OVERLOOK_

## Overview

With three months of experience as a developer, I built this application in the final week of Mod 2 at Turing School of Software Design. OVERLOOK was a solo project without any other contributors. From wireframe to final commit, I spent around 30 hours total developing the application.

OVERLOOK is a lightweight, minimalist application that allows its users to book hotel rooms based on their provided date and room type criteria. Users are also capable of viewing their previously booked and upcoming rooms in separate sections, their total spent on bookings is dynamically updated/displayed as the sum of both.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Challenges && Wins

__Network Requests__

Given that OVERLOOK was my second project experience handling network requests, navigating both FETCH and POST requests took some time. After being defeated by my code quite a few times, my understanding of FETCH/POST requests began to grow with each instance of my refactors producing functionality.

__TDD__

Using Mocha & Chai for TDD has been a part of my toolkit for five weeks now, and after a bit of growing pains, I began to feel really good about the tests that accompanied my logic functions during the course of this project. It was difficult to understand a bit earlier on in my development journey, but as further pieces came into play within my projects (cough cough, network requests).. Being able to __for sure__ know that the functions handling the foundations of my application are tested and working, without a doubt saved me a lot of time in my development process. 

## Features

**User Authentication**: Secure login for users.  
**New Booking**: Make new reservations by selecting a date and room type.  
**View All Bookings**: View previous and upcoming bookings in separate sections.  
**Get Sum of All Bookings**: View your grand total, getting the sum of all of your previous and upcoming bookings.  
**Accessibility**: ARIA labels and attributes ensure the application is fully accessible to all users. 

## Screenshots

<p align="center">
  <a href="https://ibb.co/txqGGH8"><img src="https://i.ibb.co/9VbDDps/Screenshot-2024-08-06-at-6-50-21-PM.png" alt="overlook application login form screenshot" border="0" width="150"></a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://ibb.co/yp0mCpk"><img src="https://i.ibb.co/9hnm0h4/Screenshot-2024-08-06-at-6-51-10-PM.png" alt="overlook application screenshot" border="0" width="650"></a>
</p>

## Installation & Setup

Running this application requires:

Git - version control software you can [install here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
NPM - package manager that is [part of Node.js](https://nodejs.org/en)

Follow the instructions in [this repo]((https://github.com/turingschool-examples/overlook-api)) to pull down and get the backend API server running.
Pull down the code for the frontend website

git clone `git@github.com:robert-phillips33/OVERLOOK.git`

Install required node packages - `npm install `

Start the frontend dev server - `npm run start`

