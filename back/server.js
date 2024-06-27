import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import templatePrompt from './prompt.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.env.NODE_ENV || 'development';
const envFile = mode === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENTURL,
  credentials: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const validUsername = process.env.NAME;
const validPassword = process.env.PASSWORD;

const openai = new OpenAI({
  apiKey: process.env['OPENAI_KEY'],
  timeout: 20 * 1000, // 20 seconds
});

function readTemplateFromFile(filePath) {
  try {
    const template = fs.readFileSync(filePath, 'utf8');
    return template;
  } catch (err) {
    console.error('Error reading template file:', err);
    return null;
  }
}

const checkCookies = (req, res, next) => {
  const expectedCookieName1 = 'username';
  const expectedCookieValue1 = validUsername;

  const expectedCookieName2 = 'password';
  const expectedCookieValue2 = validPassword;

  if (
    req.cookies[expectedCookieName1] === expectedCookieValue1 &&
    req.cookies[expectedCookieName2] === expectedCookieValue2
  ) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Invalid or missing cookies' });
};

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (name === validUsername && password === validPassword) {
    res.cookie('username', name, { httpOnly: false, secure: true, maxAge: 36000000, sameSite: 'None' });
    res.cookie('password', password, { httpOnly: false, secure: true, maxAge: 36000000, sameSite: 'None' });
    return res.status(200).json({ message: 'Login successful' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/suggest', checkCookies, async (req, res) => {
  try {
    const { sector, about } = req.body;
    const prompt = templatePrompt({sector, about});

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt}],
      model: 'gpt-3.5-turbo-1106',
      temperature: 1,
      response_format: {"type": "json_object"},
    });

    const json_resp = JSON.parse(response.choices[0].message.content);
    return res.status(200).json(json_resp );

    // const mock = {
    //   "suggestions": [
    //     "Exploring new marketing strategies to reach a wider audience",
    //     "Developing innovative products to stay ahead of competitors in the market"
    //   ]
    // }
    // return res.status(200).json(mock);
  } catch (error){
    res.status(500).json({ message: error});
  }
});

// const options = {
//   key: fs.readFileSync(path.resolve(__dirname, './certs/server.key')),
//   cert: fs.readFileSync(path.resolve(__dirname, './certs/server.crt'))
// };

const PORT = process.env.PORT || 8080;
// const server = https.createServer(options, app)
// server.listen(PORT, () => {
//   console.log(`HTTPS Server is running on port ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on('SIGINT', () => {
    console.log('SIGINT received: shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received: shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
