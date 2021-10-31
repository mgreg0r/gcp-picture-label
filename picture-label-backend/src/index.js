import express from 'express';
import cors from 'cors';
import session from 'cookie-session';
import BodyParser from 'body-parser';
import multer from 'multer';
import {googleAuthHandler, authMeHandler, logoutHandler} from "./auth/handlers";
import {DEV_FRONTEND_ORIGIN, SESSION_CONFIG} from "./config";
import {uploadHandler} from "./images/upload";
import {getImageHandler, labelImageHandler} from "./images/image";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const app = express();
app.use(session(SESSION_CONFIG));
app.use(BodyParser.json());

if(process.env.NODE_ENV !== 'production') {
  app.use(cors({credentials: true, origin: DEV_FRONTEND_ORIGIN}));
}

app.post('/auth/login', googleAuthHandler);
app.get('/auth/me', authMeHandler);
app.post('/auth/logout', logoutHandler);
app.post('/upload', upload.single('file'), uploadHandler);
app.get('/image/:id', getImageHandler);
app.post('/generate/:id', labelImageHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
