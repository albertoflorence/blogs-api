function handleResponse(res, { code, data }) {
  res.status(code).json(data);
}

module.exports = handleResponse;
