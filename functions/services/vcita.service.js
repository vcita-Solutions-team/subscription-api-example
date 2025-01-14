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
const axios = require('axios');
const { axiosErrorCatcher } = require('./util.service');

async function getEmailFromVcita(business_id, directory_token) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.vcita.biz/platform/v1/businesses/${business_id}`,
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${directory_token}`,
    },
  };

  try {
    console.log(config);
    const response = await axios(config);
    console.log(response.data.data);
    console.log(response.data.data.business.admin_account.email);
    if (response.status != 200) throw new Error('Failed to find business');
    return response.data.data.business.admin_account.email;
  } catch (error) {
    axiosErrorCatcher(error);
    return false;
  }
}

module.exports = {
  getEmailFromVcita,
};
