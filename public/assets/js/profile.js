$(function(){
   function getUserProfile(){

     let userId = localStorage.getItem("RMnd-user");

     $.ajax({
       url: `/api/users/${userId}`,
       contentType: 'application/json',
       type: 'get',
       dataType: "json",
       crossdomain: true,
       headers: {
         "Access-Control-Allow-Origin": "*"
       },
       success: function(data) {
       console.log(data);
       $("#user_profile_name").val(data.firstName);
       $("#user_profile_last_name").val(data.lastName);
       $("#user_profile_city").val(data.city);
       $("#user_profile_state").val(data.state);
       $("#user_profile_zipcode").val(data.zipcode);
       },
       error: function(err) {
         console.log(err);
       }
     })
  }
  $("#profile-form").submit(function(event){
    event.preventDefault;
    let userId = localStorage.getItem("RMnd-user");
    let firstName = $("#user_profile_name").val();
    let lastName =  $("#user_profile_last_name").val();
    let city =    $("#user_profile_city").val();
    let state =   $("#user_profile_state").val();
    let zipcode =  $("#user_profile_zipcode").val();
    let obj = {
      id:userId,
      firstName: firstName,
      lastName: lastName,
      city: city,
      state: state,
      zipcode: zipcode
    }
    $.ajax({
      url: `/api/users/${userId}`,
      contentType: 'application/json',
      type: 'put',
      dataType: "json",
      data: JSON.stringify(obj),
      crossdomain: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      success: function(data) {
      console.log(data);
      // toastr.options.closeButton = true;
      // toastr.options.timeOut = 0;
      // toastr.success('Your profile was updated successfully')
      // $("#user_profile_name").val(data.firstName);
      // $("#user_profile_last_name").val(data.lastName);
      // $("#user_profile_city").val(data.city);
      // $("#user_profile_state").val(data.state);
      // $("#user_profile_zipcode").val(data.zipcode);
      },
      error: function(err) {
        // toastr.options.closeButton = true;
        // toastr.options.timeOut = 0;
        // toastr.error('There was an error updating your profile. Please try again')
        console.log(err);
      }
    })
  })

  getUserProfile();
});
