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
    },
    error: function(err) {
      console.log(err);
    }
  })
  });
});
