$(function(){
  $("#contact").submit(function(event) {
    event.preventDefault();
  const name = $("#name").val();
  const email = $("#email").val();
  const phone = $("#phone").val();
  const content = $("#content").val();
  let obj = {
    name: name,
    email: email,
    phone: phone,
    content: content
  };
  console.log(JSON.stringify(obj));
  // return false;
  $.ajax({
    url: '/api/contact',
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
    toastr.options.closeButton = true;
    toastr.options.timeOut = 0;
    toastr.success('Your message was sent successfully')
    $("#contact")[0].reset();
    // window.location.href = "/contact";
    },
    error: function(err) {
      console.log(err);
      toastr.options.closeButton = true;
      toastr.options.timeOut = 0;
      toastr.error('Error sending your message. Please try again')
    }
  })
  });
});
