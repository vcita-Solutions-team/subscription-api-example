/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

require('dotenv').config();

async function authenticateToken(headers) {
  const authHeader = headers.authorization;
  console.log(headers.authorization);
  console.log(authHeader.substring(0, 7));
  if (authHeader.substring(0, 7) != 'Bearer ') {
    return {
      status: false,
      message: 'Incorrect syntax, auth header must start with "Bearer "',
    };
  }
  const token = authHeader.substring(7);
  console.log('token ', token);
  const tokenExists = await findToken(token);
  if (!tokenExists) {
    return {
      status: false,
      message: 'Unauthorized',
    };
  }
  return {
    status: true,
    directory: tokenExists.directory,
    token,
  };
}

async function findToken(token) {
  const API_TOKENS = JSON.parse(process.env.VCITAAPIKEYS);
  const foundToken = API_TOKENS.find((partner) => partner.token === token);
  console.log(foundToken);
  if (!foundToken) {
    return false;
  }
  return { status: true, directory: foundToken.partner };
}

module.exports = {
  authenticateToken,
};
