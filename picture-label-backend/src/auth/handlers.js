import gauth from "./google";

export const googleAuthHandler = async (req, res) => {
  const { token }  = req.body;

  let email;
  try {
    email = await gauth.authenticate(token);
  } catch (err) {
    res.status(401).end();
    return;
  }

  req.session.user = email;
  res.status(200);
  await res.json({
    email
  });
  res.end();
};

export const authMeHandler = async (req, res) => {
  const {user} = req.session;
  if(!user) {
    res.status(401).end();
    return;
  }

  res.status(200).json({
    email: user
  }).end();
};

export const logoutHandler = async (req, res) => {
  if(!req.session.user) {
    res.status(401).json({
      error: 'NOT_LOGGED_IN'
    }).end();
    return;
  }

  req.session = null;
  res.status(204).end();
};
