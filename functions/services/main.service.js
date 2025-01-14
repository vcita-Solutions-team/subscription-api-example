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

const { authenticateToken } = require('./authentication.service');
const { getContactAPI, getActivity } = require('./hubspot.service');
const { getEmailFromVcita } = require('./vcita.service');

async function incomingRequest(req, res) {
  const authenticated = await authenticateToken(req.headers);
  if (!authenticated.status) {
    console.log(`${authenticated.message}, token: ${req.headers.authorization}`);
    return res.status(401).send(authenticated.message);
  }
  let { email, business_id } = req.query;
  if (!email) {
    email = await getEmailFromVcita(business_id, authenticated.token);
  }
  const { activities, properties } = req.body;
  console.log(email);
  console.log(activities);
  console.log(properties);
  const requestedData = await constructData(authenticated.directory, email, properties, activities);
  if (!requestedData) {
    console.log(`${requestedData.message}, email: ${email}`);
    return res.status(400).send(requestedData.message);
  }
  res.status(200).send(requestedData);
}

async function constructData(directory, email, properties, activities) {
  const contactData = await getContact(email, properties, directory);
  if (!contactData) {
    return {
      status: false,
      message: `Contact ${email} not found within Business unit`,
    };
  }
  const activityData = await getActivityData(contactData.id, activities);
  return { contactData, activityData };
}

async function getContact(email, properties, directory) {
  const business_unit = JSON.parse(process.env.BUSINESSUNITS)[directory];
  properties.push('hs_all_assigned_business_unit_ids');
  const contactData = await getContactAPI(email, properties);
  if (!contactData) return false;
  else if (contactData.properties.hs_all_assigned_business_unit_ids != business_unit) return false;
  return contactData;
}

async function getActivityData(hubspotId, activities) {
  const activityData = {
    activitySum: {},
  };
  for (let i = 0; i < activities.length; i++) {
    const activity = await getActivity(hubspotId, activities[i]);
    if (!activity) continue;
    console.log(activity);
    activityData[activities[i]] = activity;
    const length = activity.length;
    console.log(length);
    console.log(activity[0]);
    activityData.activitySum[activities[i]] = {
      count: length,
      latestActivity: activity[0],
    };
  }
  console.log(activityData);
  return activityData;
}

module.exports = {
  incomingRequest,
};
