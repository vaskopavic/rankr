# Realtime Ranked-Choice Voting App with NestJS, React, and Redis-JSON

This is a full-stack realtime ranked-choice voting application that allows users to create and participate in ranked-choice voting sessions. It is built with NestJS, React, and Redis-JSON for real-time data updates and optimal performance. The frontend application is powered by Vite, React, Valtio, Wouter, and Tailwind CSS, while the backend application is built with NestJS and utilizes Socket.io Server for real-time communication. Redis-JSON is used as the database for storing and retrieving voting session data. The application also incorporates JSON Web Token for authentication and authorization.

Features:

- Realtime ranked-choice voting
- Creation and participation in voting sessions
- Real-time data updates using Socket.io Server
- Data storage and retrieval with Redis-JSON
- Secure authentication and authorization using JSON Web Token
- Responsive UI built with Tailwind CSS
- State management with Valtio in the frontend
- Routing with Wouter in the frontend
- Development and component documentation with Storybook
- Integration with Docker for easy deployment

### Prerequisites

- Docker (with Docker Compose)
- Node.js (version specified in the .nvmrc file)

### Install packages

```shell
npm i
```

### Running the application

To run the application, ensure that Docker is running on your machine and you have the required NodeJS version installed.

From the root of the project, run the following command:

```shell
npm run start
```

This will launch a Docker container running Redis-JSON, the NestJS backend application, and the React frontend application.
