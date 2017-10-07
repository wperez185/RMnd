$(function() {
  $("#signUpForm").submit(function(event) {
  const userInfo = $("#newUser").val();
  const userPassword = $("#newPassword").val();
  let obj = {
    username: userInfo,
    password: userPassword
  };
  console.log(JSON.stringify(obj));
  $.ajax({
    url: '/api/users',
    contentType: 'application/json',
    type: 'post',
    data: JSON.stringify(obj),
    dataType: "json",
    crossdomain: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    success: function(data) {
    console.log(data);
    window.location.href = '/profile';
    $("#profile")[0].reset();
  },
  statusCode: {
   422: function(err) {
     console.log($("#error"))
     $("#error").text("Username already exists.")
   },

   error: function(){
      // $("#error").text("Username already exists.")
   }
 }
  })
  });
});
