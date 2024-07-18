$(document).ready(function() {
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


});