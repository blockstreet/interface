# Blockstreet Interface
This is the front end of the Blockstreet website. It is powered by the VueJS, a modern component based JavaScript framework that provides features like data binding and computed properties that allow us to build complex web applications.

## Installation
This dashboard relies on the backend API for it's data, but for development purposes you can deploy the dashboard locally, and make calls to the live Blockstreet API (https://blockstreet.io/api).

The first step is to clone the repository locally:
```
git clone https://github.com/blockstreet/interface.git
```

To install the project's dependencies, navigate to the root of the project:
```
npm  install
```

#### Development Mode
To run the application in development mode (with live reloading, and non-compiled (source) assets):
```
npm run dev
```

By default, this will run the application on port 8080, and will open a browser window with the dashboard up for you.

#### Production Mode
To run the dashboard in production mode (with compiled assets) execute the following two commands. This will commpile the assets to a directory in the project root called `/dist`. Running the start command executes a simple node webserver to serve up the now static assets.

```
npm run build
npm start
```

# Architecture
This is the software architecture that we are aiming to implement for Blockstreet as a whole. A lot of it involves back-end services, and a big challenge is retrieving and caching price data from remote providers (agnostically). We are hoping this diagram helps on-boarding contributors understand what comprises the Blockstreet platform, and where we are headed.

[![Precursor](https://precursorapp.com/document/Blockstreet-Platform-Architecture-17592206075062.svg?auth-token=)](https://precursorapp.com/document/Blockstreet-Platform-Architecture-17592206075062.svg)

