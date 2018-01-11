const tryCatch = f => (req, res) => {
  try {
    f(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).end('internal server error');
  }
}

const checkBodyArgs = params => (req, res, next) => {
  const missing = params.map(p => req.body[p] == null ? p : null).filter(x => x != null);

  if (missing.length > 0) {
      return res.status(400).send(`missing body args: ${missing.join(', ')}`);
  }
  next();
}

const P = f => tryCatch((req, res) =>
  f(req, res)
    .then(d => res.json(d))
    .catch(e => !console.error(e) && res.status(500).send('internal server error')));

module.exports = {
  tryCatch,
  checkBodyArgs,
  P,
}

