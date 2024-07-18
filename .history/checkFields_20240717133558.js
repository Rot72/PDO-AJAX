
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

    // Check fields on page load
    updateFormValues();
    checkFields();

    // Attach event listeners to the input fields on input/change
    $("input[name='first_name'], input[name='last_name'], input[name='email']").on('input', function() {
        updateFormValues(); // Atualiza os valores armazenados
        checkFields(); // Verifica os campos
    });

    $(".country-select, input[name='gender']").on('change', function() {
        updateFormValues(); // Atualiza os valores armazenados
        checkFields(); // Verifica os campos
    });  

    $('.editBtn').click(function() {
        updateFormValues(); // Atualiza os valores armazenados
        checkFields(); // Chama checkFields() quando o offcanvas é aberto
    });    

});
