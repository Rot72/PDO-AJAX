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




  // Attach event listeners to the input fields  on page input/change
  $("input[name='first_name'], input[name='last_name'], input[name='email'], .country-select, input[name='gender']").on('input change', function() {
      checkFields();
  });

  // Check fields on page load
  checkFields();
  
  



  // REST Countries API endpoint to fetch all countries
  var apiUrl = "https://restcountries.com/v3.1/all";

  // AJAX request to fetch countries data
  $.ajax({
    url: apiUrl,
    type: "GET",
    success: function(data) {
        // Clear the select options
        $('.country-select').empty();

        // Add a default option
        $('.country-select').append($('<option>', {
            value: '',
            text: 'Select a country...'
        }));

        // Sort the data alphabetically by country name
        data.sort(function(a, b) {
            return a.name.common.localeCompare(b.name.common);
        });

        // Add each country as an option in the select
        data.forEach(function(country) {
            $('.country-select').append($('<option>', {
                value: country.name.common,
                text: country.name.common
            }));
        });
    },
    error: function() {
        // Handle error if request fails
        console.error("Error fetching countries data.");
    }
  });




  // call fetchData function
  fetchData();

  //initialize datatables
  let table = new DataTable("#myTable");


  // function to display image before upload
  $("input.image").change(function() {
    var file = this.files[0];
    var url = URL.createObjectURL(file);
    $(this).closest(".row").find(".preview_img").attr("src", url);
  });


  // function to fetch data from database
  function fetchData() {
    $.ajax({
      url: "server.php?action=fetchData",
      type: "POST",
      dataType: "json",
      success: function(response) {
        var data = response.data;
        table.clear().draw();
        $.each(data, function(index, value) {
          table.row.add([
            value.id,
            value.first_name,
            value.last_name,
            '<img src="uploads/' + value.image + '" style="width:50px;height:50px;border:2px solid gray;border-radius:8px;object-fit:cover">',
            value.email,
            value.country,
            value.gender,
            '<Button type="button" class="btn editBtn" value="' + value.id + '"><i class="fa-solid fa-pen-to-square fa-xl"></i></Button>' +
            '<Button type="button" class="btn deleteBtn" value="' + value.id + '"><i class="fa-solid fa-trash fa-xl"></i></Button>' +
            '<input type="hidden" class="delete_image" value="' + value.image + '">'
          ]).draw(false);
        })
      }
    })
  }




  // function to insert data to database
  $("#insertForm").on("submit", function(e) {

    e.preventDefault();
    $.ajax({
      url: "server.php?action=insertData",
      type: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function(response) {
        var response = JSON.parse(response);
        if (response.statusCode == 200) {
          $("#offcanvasAddUser").offcanvas("hide");
          $("#insertBtn").removeAttr("disabled");
          $("#insertForm")[0].reset();
          $(".preview_img").attr("src", "images/default_profile.jpg");
          $("#successToast").toast("show");
          $("#successMsg").html(response.message);
          fetchData();
        } else if(response.statusCode == 500) {
          $("#offcanvasAddUser").offcanvas("hide");
          $("#insertBtn").removeAttr("disabled");
          $("#insertForm")[0].reset();
          $(".preview_img").attr("src", "uploads/default_profile.jpg");
          $("#errorToast").toast("show");
          $("#errorMsg").html(response.message);
        } else if(response.statusCode == 400) {
          $("#insertBtn").removeAttr("disabled");
          $("#errorToast").toast("show");
          $("#errorMsg").html(response.message);
        }
      }
    });
  });


  // function to edit data
  $("#myTable").on("click", ".editBtn", function() {
    var id = $(this).val();
    $.ajax({
      url: "server.php?action=fetchSingle",
      type: "POST",
      dataType: "json",
      data: {
        id: id
      },
      success: function(response) {
        var data = response.data;
        $('#editBtn').removeAttr('disabled');

        $("#editForm #id").val(data.id);
        $("#editForm input[name='first_name']").val(data.first_name);
        $("#editForm input[name='last_name']").val(data.last_name);
        $("#editForm input[name='email']").val(data.email);
        $("#editForm select[name='country']").val(data.country);
        $("#editForm .preview_img").attr("src", "uploads/" + data.image + "");
        $("#editForm #image_old").val(data.image);
        if (data.gender === "male") {
          $("#editForm input[name='gender'][value='male']").attr("checked", true);
        } else if(data.gender === "female") {
          $("#editForm input[name='gender'][value='female']").attr("checked", true);          
        }
        // show the edit user offcanvas
        $("#offcanvasEditUser").offcanvas("show");
      }
    });
  });



  // function to update data in database
  $("#editForm").on("submit", function(e) {

    e.preventDefault();
    $.ajax({
      url: "server.php?action=updateData",
      type: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function(response) {
        var response = JSON.parse(response);
        if (response.statusCode == 200) {
          $("#offcanvasEditUser").offcanvas("hide");
          $("#editBtn").removeAttr("disabled");
          $("#editForm")[0].reset();
          $(".preview_img").attr("src", "images/default_profile.jpg");
          $("#successToast").toast("show");
          $("#successMsg").html(response.message);
          fetchData();
        } else if(response.statusCode == 500) {
          $("#offcanvasEditUser").offcanvas("hide");
          $("#editBtn").removeAttr("disabled");
          $("#editForm")[0].reset();
          $(".preview_img").attr("src", "images/default_profile.jpg");
          $("#errorToast").toast("show");
          $("#errorMsg").html(response.message);
        } else if(response.statusCode == 400) {
          $("#editBtn").removeAttr("disabled");
          $("#errorToast").toast("show");
          $("#errorMsg").html(response.message);
        }
      }
    });
  });



  // function to delete data
  $("#myTable").on("click", ".deleteBtn", function() {
    if(confirm("Are you sure you want to delete this user?")) {
      var id = $(this).val();
      var delete_image = $(this).closest("td").find(".delete_image").val();
      $.ajax({
        url: "server.php?action=deleteData",
        type: "POST",
        dataType: "json",
        data: {
          id,
          delete_image
        },
        success: function(response) {
          if(response.statusCode == 200) {
            fetchData();
            $("#successToast").toast("show");
            $("#successMsg").html(response.message);
          } else if(response.statusCode == 500) {
            $("#errorToast").toast("show");
            $("#errorMsg").html(response.message);
          }
        }
      })
    }
  })

});