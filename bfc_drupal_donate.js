// This identifies your website in the createToken call below
Stripe.setPublishableKey('pk_live_Vxr7cQ4jrsgH8pUJQJt081pA');

jQuery(function($) {
  $('#webform-client-form-1').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('input.form-submit').prop('disabled', true).css("background-color","gray").val("Please wait...");

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});

function stripeResponseHandler(status, response) {
  var $form = jQuery('#webform-client-form-1');

  if (response.error) {
    // Show the errors on the form
    $form.find('.webform-component--error-markup').text(response.error.message);
    $form.find('.form-submit').prop('disabled', false).css("background-color","").val("Make Payment");
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.find('.webform-component--stripe-token input').val(token);
    
    // Remove the credit card, CSV, and expiration values before submitting
    $form.find('#edit-submitted-payment-information-credit-card-number').val("****************");
    $form.find('#edit-submitted-payment-information-cvc').val("****");
    $form.find('#edit-submitted-payment-information-expiration-month').val("**");
    $form.find('#edit-submitted-payment-information-expiration-year').val("**");
    
    // and submit
    $form.get(0).submit();
  }
};
