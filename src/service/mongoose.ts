const mongoose = require('mongoose');

import {Logger} from "tslog";
import connectionUri from "./credentials";

const log: Logger = new Logger();

if (connectionUri == null || connectionUri == "") {
    log.fatal("Invalid or no credentials file supplied - see template for instructions");
    process.abort();
}

mongoose.connect(connectionUri)
    .catch(error => log.fatal(error))

mongoose.connection.on('connected', function(){
    log.info("Database connected successfully");
})

mongoose.connection.on('disconnected', function(){
    log.error("Database connection lost")
})

mongoose.connection.on('reconnected', function(){
    log.info("Database reconnected")
})

export default mongoose;