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
require('dotenv').config();
const { axiosErrorCatcher } = require('./util.service');

async function createBusinessAPI(businessData) {
  console.log(process.env);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.vcita.biz/platform/v1/businesses',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.DIRECTORY_KEY}`,
    },
    data: businessData,
  };

  try {
    console.log(config);
    const response = await axios(config);
    const businessId = response.data.data.business.business.id;
    return { success: true, businessId };
    // return businessId;
  } catch (error) {
    axiosErrorCatcher(error);
    return { success: false, error };
    // console.log(error);
  }
}

async function getStaffToken(business_id) {
  let data = JSON.stringify({
    business_id,
    directory_id: process.env.DIRECTORY_ID,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.vcita.biz/platform/v1/tokens',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.DIRECTORY_KEY}`,
    },
    data: data,
  };

  try {
    console.log(config);
    const response = await axios(config);
    const token = response.data.data.token;
    return { success: true, token };
    // return businessId;
  } catch (error) {
    axiosErrorCatcher(error);
    return { success: false, error };
    // console.log(error);
  }
}

async function createNewSubscriptionAPI(offering_uid, AUTH_TOKEN) {
  let data = JSON.stringify({
    purchase_currency: 'USD',
    offering_uid,
    charged_by: 'partner',
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.vcita.biz/v3/license/subscriptions',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    data: data,
  };

  try {
    console.log(config);
    const response = await axios(config);
    const subscription_id = response.data.data.uid;
    return { success: true, subscription_id };
    // return businessId;
  } catch (error) {
    axiosErrorCatcher(error);
    return { success: false, error };
    // console.log(error);
  }
}

async function expireSubscriptionAPI(subscription_uid, AUTH_TOKEN) {
  let data = JSON.stringify({
    purchase_state: 'expired',
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://api.vcita.biz/v3/license/subscriptions/${subscription_uid}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    data: data,
  };

  try {
    console.log(config);
    const response = await axios(config);
    if (response.status == 200) return { success: true };
    else throw new Error('Expire API did not work');
    // return businessId;
  } catch (error) {
    axiosErrorCatcher(error);
    return { success: false, error };
    // console.log(error);
  }
}

async function getAllSubscriptionsAPI(offering_uid, AUTH_TOKEN) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.vcita.biz/v3/license/subscriptions?offering_uid=${offering_uid}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    console.log(config);
    const response = await axios(config);
    const subscriptions = response.data.data.subscriptions;
    return { success: true, subscriptions };
    // return businessId;
  } catch (error) {
    axiosErrorCatcher(error);
    return { success: false, error };
    // console.log(error);
  }
}

module.exports = {
  createBusinessAPI,
  getStaffToken,
  createNewSubscriptionAPI,
  expireSubscriptionAPI,
  getAllSubscriptionsAPI,
};
