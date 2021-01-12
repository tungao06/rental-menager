// !! 5xx
exports.InternalServerError = (err, res) => {
  const code = 500;
  res.status(code).send({ success: false, result: { message: err.message } });
};

// !! 4xx
exports.Unauthorized = (err, res) => {
  const code = 401;
  res
    .status(code)
    .send({
      success: false,
      result: { accessToken: null, message: err.message },
    });
};
exports.Forbidden = (err, res) => {
  const code = 403;
  res
    .status(code)
    .send({
      success: false,
      result: { accessToken: null, message: err.message },
    });
};
exports.NotFound = (err, res) => {
  const code = 404;
  res.status(code).send({ success: false, result: { message: err.message } });
};
