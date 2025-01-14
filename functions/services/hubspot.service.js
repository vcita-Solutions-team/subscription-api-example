/* eslint-disable padded-blocks */
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

async function getContactAPI(email, properties) {
  let data = JSON.stringify({
    properties,
    idProperty: 'email',
    inputs: [
      {
        id: email,
      },
    ],
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.hubapi.com/crm/v3/objects/contacts/batch/read',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUBSPOTAPIKEY}`,
    },
    data: data,
  };

  try {
    console.log(config);
    const response = await axios(config);
    console.log(response.data);
    if (response.numErrors < 0) throw new Error('user not found');
    return response.data.results[0];
  } catch (error) {
    axiosErrorCatcher(error);
    return false;
  }
}

async function getActivity(hubspotId, activity) {
  let data = JSON.stringify({
    properties: [
      'hs_timestamp',
      'hs_engagement_timestamp',
      'hs_meeting_title',
      'hs_meeting_body',
      'hs_meeting_start_time',
      'hs_meeting_end_time',
      'hs_meeting_outcome',
      'hs_note_body',
      'hs_email_direction',
      'hs_email_subject',
      'hs_email_text',
      'hs_call_duration',
      'hs_call_recording_url',
      'hs_call_to_number',
    ],
    filters: [
      {
        propertyName: 'associations.contact',
        operator: 'EQ',
        value: hubspotId,
      },
    ],
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://api.hubapi.com/crm/v3/objects/${activity}/search`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUBSPOTAPIKEY}`,
    },
    data: data,
  };

  try {
    console.log(config);
    const response = await axios(config);
    console.log(response.data);
    if (response.data.total == 0) throw new Error('no activities found');
    return response.data.results;
  } catch (error) {
    axiosErrorCatcher(error);
    return false;
  }
}

module.exports = {
  getContactAPI,
  getActivity,
};
