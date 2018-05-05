exports.handler = (event, context, callback) => {
  if (event.httpMethod === 'GET') {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        data: 'hello world',
        event,
        context,
      }),
    });
  }

  if (event.httpMethod === 'POST') {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        data: 'POSTing hello world',
      }),
    });
  }

  return callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      data: 'Server Error!',
    }),
  });
};
