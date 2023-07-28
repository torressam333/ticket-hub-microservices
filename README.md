# Ticket Hub Microservices

Ticket Hub Microservices is a comprehensive ticketing application that leverages microservices architecture to create a scalable and robust ticketing service similar to StubHub. This README provides an overview of the application's structure, services, technologies used, and how to set it up. Setting up kubernetes on your local machine is one approach, you can also attempt to use AWS EKS as a cloud service to manage the clusters/pods running the applications.

## Table of Contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Services](#services)
  - [Auth Service](#auth-service)
  - [Common Service](#common-service)
  - [Expiration Service](#expiration-service)
  - [Order Service](#order-service)
  - [Ticketing Service](#ticketing-service)
  - [Payments Service](#payments-service)
  - [TicketHub Client React Application](#tickethub-client-react-application)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Ticket Hub Microservices is a ticketing application that aims to provide a seamless and efficient experience for buying and selling event tickets. It is built using a microservices architecture, allowing for flexibility, scalability, and independence between the various components of the application.

This application consists of several services that work collectively to handle user authentication, ticket listing and removal, ticket expiration handling, order management, and payment processing. Additionally, a TicketHub Client React Application provides the front-end interface for users to interact with the system.

## Architecture

The application follows a microservices architecture, which enables the development and deployment of individual services independently. Each service focuses on a specific domain or functionality, ensuring loose coupling and high scalability. The services communicate with each other using lightweight protocols, such as HTTP or message queues, and are orchestrated by a containerization platform like Kubernetes.

![Ticket Hub Microservices Architecture](architecture.png)

## Services

The Ticket Hub Microservices application consists of the following services:

### Auth Service

The Auth Service is responsible for user authentication and authorization. It provides endpoints for user registration, login, and token generation. This service ensures secure access to the application's resources and protects sensitive user data.

### Common Service

The Common Service acts as a shared library of functionality that is commonly used across multiple services. It encapsulates common code, such as validation logic, error handling, database access, and utility functions. Other services can utilize this service to avoid code duplication and promote consistency.

### Expiration Service

The Expiration Service handles ticket expiration management. It regularly checks for expired tickets and performs actions accordingly, such as removing expired tickets from the system or triggering events related to ticket expiration.

### Order Service

The Order Service manages the process of placing and managing ticket orders. It handles operations such as creating orders, updating order status, and managing the relationship between tickets and orders. This service ensures a smooth experience for users who want to purchase tickets.

### Ticketing Service

The Ticketing Service is responsible for handling ticket listing and removal operations. It provides functionality for creating, updating, and deleting tickets. Additionally, it supports operations like searching for tickets, filtering by criteria, and retrieving ticket details.

### Payments Service

The Payments Service integrates with the Stripe API to handle payment processing for orders and tickets. It facilitates secure and efficient payment transactions, ensuring a seamless experience for users. The Payments Service communicates with the Order Service to process payments related to ticket orders.

### TicketHub Client React Application

The TicketHub Client React Application serves as the user interface for the Ticket Hub Microservices application. It enables users to browse and search for tickets, view event details, place orders, and manage their account. This React application interacts with the microservices through API endpoints provided by the various services.

## Technologies

The Ticket Hub

Microservices application incorporates the following technologies and tools:

- Kubernetes: Container orchestration platform for managing and scaling the microservices.
- Docker: Containerization technology to package and deploy each microservice.
- Ingress Nginx: Handles service routing and local domain routing, allowing external access to the microservices.
- Express: A fast and minimalist web application framework for Node.js, used for building the server-side of the microservices.
- Node.js: JavaScript runtime for executing server-side code.
- MongoDB: A NoSQL database for storing and retrieving application data.
- Stripe API: Integration with the Stripe payment platform for processing payments.
- React: JavaScript library for building the user interface of the TicketHub Client React Application.

## Installation

To set up the Ticket Hub Microservices application locally, follow these steps:

1. Clone the repository: `git@github.com:torressam333/ticket-hub-microservices.git`
2. Install Docker and Kubernetes if not already installed.
3. Set up MongoDB and obtain the necessary connection details.
4. Configure the environment variables for each microservice, including database connection details and API keys.
5. Build and deploy each microservice using Docker and Kubernetes.
6. Configure Ingress Nginx for routing requests to the appropriate microservices.
7. Build and deploy the TicketHub Client React Application using appropriate build and deployment tools.

Detailed installation instructions and configuration steps for each service can be found in their respective directories.

## Usage

Once the Ticket Hub Microservices application is installed and running, you can access the application by visiting the appropriate URL or local domain. Use the TicketHub Client React Application to browse tickets, place orders, and manage your account. Refer to the documentation of each microservice for details on the available API endpoints and how to interact with them.

## Contributing

Contributions to the Ticket Hub Microservices application are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository. Make sure to follow the existing code style and guidelines.

## License

The Ticket Hub Microservices application is released under the [MIT License](LICENSE). Feel free to modify and use the application according to your needs.

---
