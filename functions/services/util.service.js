/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const axios = require('axios');

function axiosErrorCatcher(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorData = {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    };
    console.log(errorData);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.request;
  }
}

async function sendMessageToSlack(message) {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://slack.com/api/chat.postMessage?channel=C06GSKCS680&text=${message}`,
    headers: {
      Authorization: `Bearer ${process.env.SLACKAPIKEY}`,
    },
  };

  try {
    console.log(config);
    const response = await axios(config);
    if (response.data.ok == 'true') return true;
    else return false;
  } catch (error) {
    axiosErrorCatcher(error);
    return false;
  }
}
async function sendMessageToSlackAboutStaff(message) {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://slack.com/api/chat.postMessage?channel=C07CC8MRZUK&text=${message}`,
    headers: {
      Authorization: `Bearer ${process.env.SLACKAPIKEY}`,
    },
  };

  try {
    console.log(config);
    const response = await axios(config);
    if (response.data.ok == 'true') return true;
    else return false;
  } catch (error) {
    axiosErrorCatcher(error);
    return false;
  }
}

function sortListsByPriority(a, b) {
  console.log(a.name.substring(a.name.lastIndexOf('-') + 1));
  console.log(b.name.substring(b.name.lastIndexOf('-') + 1));
  if (+a.name.substring(a.name.lastIndexOf('-') + 1) < +b.name.substring(b.name.lastIndexOf('-') + 1)) {
    console.log(`${a.name} is smaller than ${b.name}`);
    return 1;
  }
  if (+a.name.substring(a.name.lastIndexOf('-') + 1) > +b.name.substring(b.name.lastIndexOf('-') + 1)) {
    console.log(`${a.name} is bigger than ${b.name}`);
    return -1;
  }
  console.log('Nothing was done');
  return 0;
}

async function getFinalCount(results) {
  let count = 0;
  for (let i = 0; i < results.length; i++) {
    count = count + results[i].successCount;
  }
  return count;
}

module.exports = {
  axiosErrorCatcher,
  sendMessageToSlack,
  sendMessageToSlackAboutStaff,
  getFinalCount,
  sortListsByPriority,
};
