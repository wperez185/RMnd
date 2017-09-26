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
        window.location.href = "/";
      }
      // ${localStorage.getItem("RMnd-user")}
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
});


// if(user == username ){
//   $("topnav").addClass("right");
// }else {
//   $("topnav").addClass("settings");
// }
