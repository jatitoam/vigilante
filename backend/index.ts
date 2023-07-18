import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as dynamoose from "dynamoose";

dotenv.config();

const app: Express = express();

// Setup environment variables
const port: String = process.env.PORT || "3000";
const webFolder: String = process.env.WEBFOLDER || "";
const dynamoDBConfig: String = process.env.DYNAMODB_CONFIG || "local";
const dynamoDBLocalEndpoint: String =
  process.env.DYNAMODB_LOCAL_ENDPOINT || "http://db:8000";
const dynamoDBAWSAccessKeyId: String =
  process.env.DYNAMODB_AWS_ACCESSKEYID || "";
const dynamoDBAWSSecretAccessKey: String =
  process.env.DYNAMODB_AWS_SECRETACCESSKEY || "";
const dynamoDBAWSRegion: String = process.env.DYNAMODB_AWS_REGION || "";

// Connection to DynamoDB via Dynamoose
switch (dynamoDBConfig) {
  case "local":
    const dbLocal = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: dynamoDBAWSAccessKeyId.toString(),
        secretAccessKey: dynamoDBAWSSecretAccessKey.toString(),
      },
      region: dynamoDBAWSRegion.toString(),
      endpoint: dynamoDBLocalEndpoint.toString()
    });
    dynamoose.aws.ddb.set(dbLocal);
    break;

  default:
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: dynamoDBAWSAccessKeyId.toString(),
        secretAccessKey: dynamoDBAWSSecretAccessKey.toString(),
      },
      region: dynamoDBAWSRegion.toString(),
    });
    dynamoose.aws.ddb.set(ddb);
}

// Import routes
const apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Send message for default URL
app.get("/", (req, res) => res.status(404).end());

// Use Api routes in the App
app.use("/" + webFolder, apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Web API on port " + port + " and folder /" + webFolder);
});
