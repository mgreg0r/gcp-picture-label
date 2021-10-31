export const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET,
  cookieOptions: {
    maxAge: 1000 * 60 * 60
  }
};

export const DEV_FRONTEND_ORIGIN = process.env.DEV_FRONTEND_ORIGIN || 'http://localhost:3000';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_STORAGE_BUCKET = process.env.GOOGLE_STORAGE_BUCKET;
