$(document).ready(function() {


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