
    // Function to check if all required fields have values
    function checkFields() {
        var firstName = formValues.firstName;
        var lastName = formValues.lastName;
        var email = formValues.email;
        var country = formValues.country;
        var gender = formValues.gender;

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



