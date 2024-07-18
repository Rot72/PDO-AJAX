  // Function to check if all required fields have values
  function checkFields() {
    var firstName = $("input[name='first_name']").val();
    var lastName = $("input[name='last_name']").val();
    var email = $("input[name='email']").val();
    var country = $('.country-select').val();
    var gender = $('input[name="gender"]:checked').val();

    console.log("firstName: " + firstName);
    console.log("lastName: " + lastName);
    console.log("email: " + email);
    console.log("country: " + country);
    console.log("gender: " + gender);

    if (firstName && lastName && email && country && gender) {
        $('#insertBtn').prop('disabled', false);
        $('#editBtn').prop('disabled', false);
    } else {
        $('#insertBtn').prop('disabled', true);
        $('#editBtn').prop('disabled', true);
    }
  }

  // Check fields on page load
  checkFields();

  // Attach event listeners to the input fields  on page input/change
  
  $("input[name='first_name'], input[name='last_name'], input[name='email']").on('input', function() {
      checkFields();
  });

  $(".country-select, input[name='gender']").on('change', function() {
    checkFields();
  });  