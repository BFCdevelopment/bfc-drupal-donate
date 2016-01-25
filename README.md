# BFC Drupal Donate
This is a starter module to help create donate forms with Stripe payment processing.
## How to set this up
1. Install the BFC Drupal Donate module and enable it (also install the required Rules, Webform, and Webform Rules modules if they aren’t already installed on your Drupal installation).

2. Manually import a "rule" in admin/config/workflow/rules by pasting in this import code:

{ "rules_charge_credit_card_after_registration_form_submit" : {
    "LABEL" : "Charge Credit Card after Donate form Submit",
    "PLUGIN" : "reaction rule",
    "OWNER" : "rules",
    "REQUIRES" : [ "webform_rules", "php", "rules" ],
    "ON" : { "webform_rules_submit" : [] },
    "IF" : [
      { "webform_has_id" : {
          "form_id" : [ "form-id" ],
          "selected_webform" : { "value" : { "webform-client-form-76" : "webform-client-form-76" } }
        }
      }
    ],
    "DO" : [
      { "php_eval" : { "code" : "require_once(\u0027sites\/all\/modules\/bfc-drupal-donate-master\/stripe-php-library\/init.php\u0027);\r\n\r\n\/\/ Set your secret key: remember to change this to your live secret key in production\r\n\/\/ See your keys here https:\/\/dashboard.stripe.com\/account\/apikeys\r\n\\Stripe\\Stripe::setApiKey(\u0022sk_test_lXQzFO7axOhVcdsoOvJsTZHP\u0022);\r\n\r\n\/\/ Get the credit card details submitted by the form\r\n$token = $data[\u0027components\u0027][\u0027stripe_token\u0027][\u0027value\u0027][0];\r\n$amount = $data[\u0027components\u0027][\u0027amount\u0027][\u0027value\u0027][0] . \u002200\u0022;\r\n\r\n\/\/ Create the charge on Stripe\u0027s servers - this will charge the user\u0027s card\r\ntry {\r\n$charge = \\Stripe\\Charge::create(array(\r\n  \u0022amount\u0022 =\u003E $amount, \/\/ amount in cents, again\r\n  \u0022currency\u0022 =\u003E \u0022usd\u0022,\r\n  \u0022source\u0022 =\u003E $token,\r\n  \u0022description\u0022 =\u003E \u0022Example charge\u0022)\r\n);\r\n} catch(\\Stripe\\Error\\Card $e) {\r\n  drupal_set_message(\u0022We are sorry, your card has been declined. Please return to the form and try again.\u0022, \u0022error\u0022);\r\n}\r\n" } }
    ]
  }
}

3. Create a “donate now” webform that has whatever fields you want, but also at least:
* a field called "amount"
* a fieldset called “Payment Information”
* within that fieldset, a field called “credit card number"
* within that fieldset, a field called "cvc"
* within that fieldset, a field called "expiration month"
* within that fieldset, a field called "expiration year"
* a HIDDEN FIELD called "stripe token" that's visible (changeable by javascript)
* a MARKUP field called "error markup"

4. Edit the rule you imported by:
* setting it to fire on the appropriate form
* updating to the correct API Key (by default it's BFC's)

5. Edit the javascript file (bfc_drupal_donate.js) in the module by:
* setting the correct API key (by default it's BFC's)
* setting it to fire on the appropriate form by replacing the Webform ID on lines 5 and 19.

6. Edit the module file (bfc_drupal_donate.module) by:
* setting it to fire on the appropriate form by replacing the Webform ID on line 9

