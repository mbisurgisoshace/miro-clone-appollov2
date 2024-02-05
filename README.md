# Appollo - Miro Clone Exercise

Miro clone application, with most common features of a canvas app, like zooming, panning, drawing shapes, text, etc. It includes multi-user collaboration as well as real time collaboration.
The idea is that we see what we can accomplish with this demo, and how much we can use as either a base, or for ideas for the Appollo Builder, and maybe once we have the final demo, try to extend it with some of Appollo use cases.

## Starting the application

### Running Next application (frontend)
`npm run dev`

### Running Convex functions (backend)
`npx convex dev`

## Backend & Db with Convex

Convex provides a realtime configuration Backend & Database. You can use a Convex project to create API routes for your project to connect to and store information on a Database.

## Authentication with Clerk

Clerk provides ready to use authentication features, which includes multiple authentication providers, as well as allowing having organizations within users. Clerk will handle everything related to managing users, keeping track of the current auth state on the app to decide which pages are accessible and which ones are not. 

In this application we are integrating it with Convex, which allows to easily protect our database and APIs only to authenticated users.
