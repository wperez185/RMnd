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
        console.log(user);
        localStorage.setItem("RMnd-user", user);
        window.location.href = "/jobPosts";
      }
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
});


// working progress with Toastr
// $(document).ready(function() {
//     toastr.options.timeOut = 1500; // 1.5s
//     toastr.info('Page Loaded!');
//     $('#linkButton').click(function() {
//        toastr.success('Click Button');
//     });
//   });

// $(document).ready(function() {
//   toastr["error"]("Clear itself?<br /><br /><button type="button" class="btn clear">Yes</button>")
//
//   toastr.options = {
//     "closeButton": true,
//     "debug": false,
//     "newestOnTop": false,
//     "progressBar": false,
//     "positionClass": "toast-top-center",
//     "preventDuplicates": false,
//     "onclick": null,
//     "showDuration": "300",
//     "hideDuration": "1000",
//     "timeOut": 0,
//     "extendedTimeOut": 0,
//     "showEasing": "swing",
//     "hideEasing": "linear",
//     "showMethod": "fadeIn",
//     "hideMethod": "fadeOut",
//     "tapToDismiss": false
//   }
//   });
$(function () {
    // $('#error').click(function () {
    //     toastr.error("Noooo oo oo ooooo!!!", "Title", {
    //         "timeOut": "0",
    //         "extendedTImeout": "0"
    //     });
    // });
    toastr.error('Incorrect username and or password')
  });

//
// if(user != username && password != password ){
//   $("error-msg").addClass("right");
// }else {
//   $("topnav").addClass("settings");
// }
