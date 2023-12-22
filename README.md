# ATX Happy Hour Map

ATX Happy Hour Map is a web application that showcases happy hour spots across Austin, offering an interactive map with detailed information on each location. This project, featuring a Spring Boot backend and a React frontend, is designed to provide users with an engaging way to discover happy hour deals.

Link: [https://atxhappyhour-frontend.onrender.com](https://atxhappyhour-frontend.onrender.com/)

## Key Features

- Interactive Map: Users can explore Austin's happy hour locations displayed as pins on the map.
- Search Functionality: Includes a search feature to quickly find specific restaurants or areas.
- Details on Demand: Clicking a pin reveals in-depth happy hour details for each restaurant.
- Responsive Design: Optimized for a smooth experience on various devices and screen sizes.

## Dockerization and Hosting

- The application is fully Dockerized, ensuring easy deployment and scalability.
- It is hosted on Render, a cloud service that provides seamless hosting solutions.

## Note for Users
The site may require a brief loading period for the pins to appear and sometimes requires a refresh, due to the limitations of the free hosting site.

Render spins down a Free web service that goes 15 minutes without receiving inbound traffic. Render spins the service back up whenever it next receives a request to process.

Spinning up a service takes a few seconds, which causes a noticeable delay for incoming requests until the service is back up and running. For example, a browser page load will hang momentarily.
