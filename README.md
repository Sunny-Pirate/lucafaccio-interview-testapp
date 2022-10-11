# Luca Faccio's Web App Test for an ESG Company

The company had a lot of different types of data both structured and unstructured which needs to be presented
clearly to users this app has the scope to demonstrate my ability to build a simple web app using their tech stack
and one of his public apis – this will show us whether you have experience with our tech stack and therefore be able to
contribute and lead the product.

## The Task

Build simple React NextJS web app using the news data from one of our APIs and present the data in a table. The aim
is to build a web app which can be refreshed daily to display the latest news for Apple Inc.

We need to be able to run the web app so please provide README.md with instructions on how to run it.

You will have 2 days to complete the task.

### Step 1 – Set up a RapidAPI acount and configure to access Company's data from a fixed address

- Creating a free account on RapidAPI
- Use the newsAPI with a fixed address to retrieve news from a singular company

### Step 2 – Set up database access on GCP

- You had the access to a Postgres database instance hosted on GCP
  I used pgAdmin to access the database, configure the user, the database and the schema with the credentials provided
  by GaiaLens

### Step 3 – Set up the web app code using NextJS, Prisma,

Typescript

- Create the web app using NextJS, using –use-yarn instead of –use-npm
- Use Typescript where possible
- Use Prisma as an ORM
-

### Step 4 – Front-end

- Display the news data in a simple table with filters – please see the screenshot below
  which is from our existing web app
- It does not have to look exactly the same as this screenshot, the screenshot just gives
  you an idea of how the news for Apple could be presented
  The Output
- A zip file containing your web code so that we are able to run it using yarn install/yarn
  dev
  What we are assessing you on
- Clean, commented code
- Scalable code
- Performance of the web a

## Installation and running

I assume you have already installed NodeJs and Yarn on test machine.

**This repo is tested with NodeJs v16.15.1 and Yarn 1.22.19**

Once that is installed, cd into your project folder and type yarn install into the working directory to install
dependencies.

```bash
yarn install
```

#### Usage:

The application actually DO NOT run because the access to the DB was closed when the application was reviewed by the
Company.

```properties
RAPIDAPI_API_KEY=The API Key
RAPIDAPI_API_HOST=The API Host
```

<!-- Once dependencies are installed. Run the app in development mode or start a production server with the following -->
<!-- scripts: -->
<!-- Development mode: -->

<!-- ```bash -->
<!-- yarn dev -->
<!-- ``` -->

# Tests:

No tests have been written for this application.


