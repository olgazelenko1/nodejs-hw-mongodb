import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';

const PATH_JSON = path.join(process.cwd(), 'google-auth-oauth.json');

let googleOAuthClient;
let oauthConfig;

async function initGoogleOAuth() {
  if (googleOAuthClient) return;
  try {
    const json = await readFile(PATH_JSON, { encoding: 'utf8' });
    oauthConfig = JSON.parse(json);
  } catch {
    throw createHttpError(
      500,
      `Missing or invalid Google OAuth JSON at ${PATH_JSON}`,
    );
  }

  googleOAuthClient = new OAuth2Client({
    clientId: getEnvVar('GOOGLE_AUTH_CLIENT_ID'),
    clientSecret: getEnvVar('GOOGLE_AUTH_CLIENT_SECRET'),
    redirectUri: oauthConfig.web.redirect_uris[0],
  });
}

export const generateAuthUrl = async () => {
  await initGoogleOAuth();
  return googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

export const validateCode = async (code) => {
  await initGoogleOAuth();
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }
  return fullName;
};
