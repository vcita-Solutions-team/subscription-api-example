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

const {
  createBusinessAPI,
  getStaffToken,
  createNewSubscriptionAPI,
  getAllSubscriptionsAPI,
  expireSubscriptionAPI,
} = require('./api.service');

async function createBusiness(data) {
  console.log(data);
  const businessData = {
    admin_account: {
      email: data.email,
    },
    business: {
      name: data.name,
    },
  };
  console.log(businessData);

  const businessCreated = await createBusinessAPI(businessData);
  // insert extra actions like entry to DB
  return businessCreated;
}

async function createNewSubscription(business_id, package) {
  const getToken = await getStaffToken(business_id);
  if (!getToken.success) {
    return getToken;
  }
  const subscriptionCreated = await createNewSubscriptionAPI(package, getToken.token);
  return subscriptionCreated;
}

async function cancelSubscription(business_id, subscription_id) {
  const getToken = await getStaffToken(business_id);
  if (!getToken.success) {
    return getToken;
  }
  const subscriptionCancelled = await expireSubscriptionAPI(subscription_id, getToken.token);
  return subscriptionCancelled;
}

async function getAllSubscriptions(offering_id, business_id) {
  console.log(business_id);

  const getToken = await getStaffToken(business_id);
  if (!getToken.success) {
    return getToken;
  }
  const allSubscriptions = await getAllSubscriptionsAPI(offering_id, getToken.token);
  return allSubscriptions;
}

module.exports = {
  createBusiness,
  createNewSubscription,
  cancelSubscription,
  getAllSubscriptions,
};
