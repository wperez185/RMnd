$(function(){
  $("#employer-posting").submit(function(event) {
    event.preventDefault();
  const jobType = $(".click-button").attr("id");
  const companyName = $("#company-name").val();
  const jobTitle = $("#job-title").val();
  const jobDescription = $("#job-description").val();
  const location = $("#location").val();
  const salary = $("#salary").val();
  const city = $("#city").val();
  const state = $("#state").val();
  const zipcode = $("#zipcode").val();
  // const fullTime = $(".full-time").val();
  // const partTime = $(".part-time").val();
  // const internship = $(".internship").val();
  // const contract = $(".contract").val();
  // const temporary = $(".temporary").val();
  let obj = {
    company: companyName,
    jobTitle: jobTitle,
    description: jobDescription,
    location: location,
    salary: salary,
    city: city,
    state: state,
    zipcode: zipcode,
    jobType: jobType
  };
  console.log(JSON.stringify(obj));
  // return false;
  $.ajax({
    url: '/api/jobSearch',
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
  $(".button-label").click(function(event){
    event.preventDefault();
    $(".button-label").removeClass("click-button");
    $(this).addClass("click-button");

  })
});
