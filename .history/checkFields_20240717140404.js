$(document).ready(function() {

    function checkFieldsInsertForm() {
        var firstName = $("#insertForm input[name='first_name']").val();
        var lastName = $("#insertForm input[name='last_name']").val();
        var email = $("#insertForm input[name='email']").val();
        var country = $('#insertForm select[name=country]').val();
        var gender = $('#insertForm input[name="gender"]:checked').val();

        console.log("firstName Insert: " + firstName);
        console.log("lastName Insert: " + lastName);
        console.log("email Insert: " + email);
        console.log("country Insert: " + country);
        console.log("gender Insert: " + gender);

        if (firstName && lastName && email && country && gender) {
            $('#insertBtn').prop('disabled', false);
        } else {

            $('#insertBtn').prop('disabled', true);
        }
    }


    // Attach event listeners to the input fields  on page input/change    
    $("#insertForm input[name='first_name'], #insertForm input[name='last_name'], #insertForm input[name='email']").on('input', function() {
        checkFieldsinsertForm();
    });

    $("#insertForm select[name='country'], #insertForm input[name='gender']").on('change', function() {
        checkFieldsinsertForm();
    });  

    
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