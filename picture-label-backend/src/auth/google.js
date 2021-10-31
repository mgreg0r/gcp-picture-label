import { google } from 'googleapis';
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "../config";

const client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
);

// attempts to authenticate user with token, returns email on success
const authenticate = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID
  });

  const {email} = ticket.getPayload();
  return email;
};

export default {
  authenticate
}
