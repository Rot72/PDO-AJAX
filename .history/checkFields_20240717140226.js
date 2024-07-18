$(document).ready(function() {


    
    // Function to check if all required fields have values
    function checkFieldsEditForm() {
        var firstName = $("#editForm input[name='first_name']").val();
        var lastName = $("#editForm input[name='last_name']").val();
        var email = $("#editForm input[name='email']").val();
        var country = $('#editForm select[name=country]').val();
        var gender = $('#editForm input[name="gender"]:checked').val();

        console.log("firstName: " + firstName);
        console.log("lastName: " + lastName);
        console.log("email: " + email);
        console.log("country: " + country);
        console.log("gender: " + gender);

        if (firstName && lastName && email && country && gender) {
            $('#editBtn').prop('disabled', false);
        } else {

            $('#editBtn').prop('disabled', true);
        }
    }


    // Attach event listeners to the input fields  on page input/change    
    $("#editForm input[name='first_name'], #editForm input[name='last_name'], #editForm input[name='email']").on('input', function() {
        checkFieldsEditForm();
    });

    $("#editForm select[name='country'], #editForm input[name='gender']").on('change', function() {
        checkFieldsEditForm();
    });  



});      