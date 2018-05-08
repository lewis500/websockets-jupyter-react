{
    "name": "stochasticity",
    "version": "1.0.0",
    "description": "simulation of traffic signals",
    "author": "lewis500@gmail.com",
    "license": "MIT",
    "scripts": {
      "dev": "webpack-dev-server --port=3080",
      "build": "webpack --color --progress --config webpack.config.production.js",
      "start":"node-dev app.js"
    },
    "dependencies": {
      "react": "^16.3.1",
      "react-dom": "^16.3.1"
    },
    "devdependencies": {
      "babel-core": "^6.26.0",
      "babel-loader": "^7.1.4",
      "babel-plugin-transform-class-properties": "^6.24.1",
      "babel-plugin-transform-object-rest-spread": "^6.26.0",
      "babel-preset-env": "^1.6.1",
      "babel-preset-flow": "^6.23.0",
      "babel-preset-react": "^6.24.1",
      "css-loader": "^0.28.11",
      "extract-text-webpack-plugin": "^4.0.0-beta.0",
      "flow-bin": "^0.69.0",
      "html-webpack-plugin": "^3.2.0",
      "style-loader": "^0.20.3",
      "webpack": "^4.5.0",
      "webpack-cli": "^2.0.14",
      "webpack-dev-server": "^3.1.3"
    }
  }
  