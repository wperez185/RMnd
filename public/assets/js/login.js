$(function(){
  // if(!localStorage.getItem("RMnd-user")){
  //   localStorage.setItem("RMnd-user", "599f68a5c330bb03df23dc5d")
  // }
  $("#signInForm").submit(function (event){
    event.preventDefault();
    let obj = {
      username: $("#userName").val(),
      password: $("#userPassword").val()
    }
    console.log(obj.username);
    // return false;
    $.ajax({
      url: `/api/users/login`,
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
      if(data && data.code == 201){
        let user = data.message;
        localStorage.setItem("RMnd-user", user);
        window.location.href = "/jobPosts";
      }
      },
      error: function(err) {
        toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": 0,
  "extendedTimeOut": 0,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "tapToDismiss": false
}
        toastr.error('Incorrect username and or password')
        console.log(err);
      }
    })
  })
});
