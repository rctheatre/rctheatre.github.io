// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");


/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";


/**
 *  App Configuration
 */
app.use(express.static(path.join(__dirname)));

/**
 * Routes Definitions
 */
app.get('/', (req, res) => {       
    res.sendFile('index.html', {root: __dirname});                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });