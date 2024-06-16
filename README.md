## WebApp
The WebApp, simulating a webpage which includes third party scripts.

## Malicious Script
The script which will grab cookies and send them elsewhere. 

## Attacker Server
The server that a malicious third party uses to send grabbed cookies.

## CookieGuard
The extension that monitors and protects against cookie grabbing.

## Setup 

### Web Application

`cd WebApp`

`python3 -m http.server 80`

### Malicious Script

`cd MaliciousScript`

`python3 -m http.server 8001`

### Attacker Server

`cd AttackerServer`

`node server.js`

Initial State

<img width="1512" alt="image" src="https://github.com/petport/Cookie-Draft/assets/23433131/739132b5-6f81-4107-bd78-19499d846dd3">

First Page Load
<img width="1512" alt="image" src="https://github.com/petport/Cookie-Draft/assets/23433131/4eef090c-e1ff-41f4-9f97-a9a0f4cba1b1">

Server Logs. Bottom Left: Attacker Server has recieved the stolen cookies
<img width="1512" alt="image" src="https://github.com/petport/Cookie-Draft/assets/23433131/fd9de95f-d55d-4da7-8539-a9fdb38471ea">

Extension logs the malicious scripts for offline use
<img width="1504" alt="Screenshot 2024-06-16 at 11 06 59 PM" src="https://github.com/petport/Cookie-Draft/assets/23433131/098e651f-e78a-4a86-857f-41cce1540087">

Background.js logging requests
<img width="1512" alt="Screenshot 2024-06-17 at 1 32 45 AM" src="https://github.com/petport/Cookie-Draft/assets/23433131/04786675-05f9-423f-807c-ec0241fae6a9">

