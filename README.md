# Hackernews Clone

Fullstack app made with React, [GraphQL](https://graphql.org/), [Apollo](https://studio.apollographql.com/) and [Prisma](https://www.prisma.io/react-server-components). The final product will be showcased once finished.

The schema in `server/src/schema.graphql` will allow for the following operations:

* ### Queries:
  * **feed**: Retrieves all links from the backend, note that this query also allows for filter, sorting and pagination arguments
* ### Mutations:
  * **post**: Allows authenticated users to create a new link
  * **signup**: Create an account for a new user
  * **login**: Login an existing user
  * **vote**: Allows authenticated users to vote for an existing link
  
* ### Subscriptions:
  * **newLink**: Receive realtime updates when a new link is created
  * **newVote**: Receive realtime updates when a vote was submitted

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `node index.js`

Runs the server. This command is run in the `server/src` folder.\
If you make changes to the schema or `index.js` in this folder\
you will have to restart the server to see the changes in `Playground`\
which is accessed by opening [http://localhost:4000](http://localhost:4000) in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
