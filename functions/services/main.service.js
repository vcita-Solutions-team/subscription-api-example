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

const { createBusiness, createNewSubscription, cancelSubscription, getAllSubscriptions } = require('./model.service');

async function incomingCreation(req, res) {
  const { businessData, package } = req.body;
  // Create Business with incoming data
  const businessCreated = await createBusiness(businessData);
  if (!businessCreated.success) {
    return res
      .send({ success: false, message: `Failed to create Business. Error: ${businessCreated.error}` })
      .status(400);
  }
  // Create a Subscription for created Business
  const subscriptionCreated = await createNewSubscription(businessCreated.businessId, package);
  if (!subscriptionCreated.success) {
    return res
      .send(
        `Failed to create Subscription for business ${businessCreated.businessId}. Error: ${subscriptionCreated.error}`
      )
      .status(400);
  }
  // Return Business and subscription info
  return res.send({
    success: true,
    business_id: businessCreated.businessId,
    subscription_id: subscriptionCreated.subscription_id,
  });
}

async function incomingChangePackage(req, res) {
  const { business_id, package } = req.body;
  // Change subscription based off of incoming data
  const subscriptionChanged = await createNewSubscription(business_id, package);
  if (!subscriptionChanged.success) {
    return res
      .send({
        success: false,
        message: `Failed to Change Subscription for business ${business_id}. Error: ${subscriptionChanged.error}`,
      })
      .status(400);
  }
  // Return new subscription details
  return res.send({
    success: true,
    subscription_id: subscriptionChanged.subscription_id,
  });
}

async function incomingCancellation(req, res) {
  const { business_id, subscription_id } = req.body;
  const subscriptionCancelled = await cancelSubscription(business_id, subscription_id);
  if (!subscriptionCancelled.success) {
    return res
      .send({
        success: false,
        message: `Failed to cancel subscription for subscription ${subscription_id}. Error: ${subscriptionCancelled.error}`,
      })
      .status(400);
  }
  return res.send({
    success: true,
  });
}

async function incomingGetAllSubscriptions(req, res) {
  const { offering_uid, business_id } = req.query;
  console.log(business_id);

  const allSubscriptions = await getAllSubscriptions(offering_uid, business_id);
  if (!allSubscriptions.success) {
    return res.send({
      success: false,
      message: `Failed to get subscriptions for offering ${offering_uid}. Error: ${allSubscriptions.error}`,
    });
  }
  return res.send({
    success: true,
    subscriptions: allSubscriptions.subscriptions,
  });
}

//

module.exports = {
  incomingCreation,
  incomingChangePackage,
  incomingCancellation,
  incomingGetAllSubscriptions,
};
