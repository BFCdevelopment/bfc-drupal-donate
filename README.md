# BFC Drupal Donate
This is a starter module to help create donate forms with Stripe payment processing. This module provides a simple configuration page with fields for your Stripe API Keys, and the ID number of your webform. It also creates a default webform with all the base required fields for successfully charging a user's credit card via Stripe.

## How to set this up
1. Make sure that the modules Webform and jQuery Update are installed and enabled on your Drupal install.

2. Install and Enable the BFC Drupal Donate module, then follow the link to the configuration page (admin/config/content/bfc_donate).

3. Enter in the Stripe API Keys (found in your Stripe Account settings) and the ID # of the webform you will be using to collect your user's information on your Drupal site (found on the Content page of your Drupal site, by following the url to edit the form: the ID # is in the edit url). We recommend using the default Donate form created by the module (entitled 'Donate'), as it includes all necessary fields to get Stripe working. Save your config settings.

4. You can add fields and modify display settings for the default Donate form as needed. Do not change the form_key settings for the module-created fields (name, email, cc#, expiration date/month/year, cvc).

5. Make sure to set your Stripe account to Test Mode and enter in your test Stripe API keys during testing. Update the config settings to the live API keys when you're ready to go into production.