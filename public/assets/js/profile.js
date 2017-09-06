$(function(){
  if(!localStorage.getItem("RMnd-user")){
    localStorage.setItem("RMnd-user", "599f68a5c330bb03df23dc5d")
  }
  // return false;
  $.ajax({
    url: `/api/users/${localStorage.getItem("RMnd-user")}`,
    contentType: 'application/json',
    type: 'get',
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
