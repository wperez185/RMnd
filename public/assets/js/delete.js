$(function(){
  $(".delete-account").submit(function(event) {
    event.preventDefault();

  console.log(JSON.stringify(obj));
  // return false;
  $.ajax({
    url: '/api/account',
    contentType: 'application/json',
    type: 'delete',
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
