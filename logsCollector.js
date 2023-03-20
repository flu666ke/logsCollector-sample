const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  console.log({ event, context });

  const cloudWatchLogs = new AWS.CloudWatchLogs();
  const logGroupName = '/aws/lambda/' + context.functionName;
  const logStreamName = context.logStreamName;

  const { events } = await cloudWatchLogs.getLogEvents({   
        logGroupName,
        logStreamName,
      })
    .promise()

  events.forEach(event => {
    console.log("EVENT ->", event)
  });

  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify(events),
  };
};
