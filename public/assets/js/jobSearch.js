function button() {
  $.ajax({
    url: '/api/jobSearch',
    contentType: 'application/json',
    type: 'get',
    dataType: "json",
    crossdomain: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    success: function(data) {
      // console.log(data);
      const jobList = $("#job-list");
      jobList.html(" ");
      data.forEach(function (job) {
          $("#job-list").append("<li>" + job.jobTitle + "<span>" + job.description + "</span>"  + "<span>" + job.city + "</span>" + "<span>" + job.state + "</span>" + "<span>" + job.zipcode + "</span>" + "<span>" + job.salary + "</span>" +
           "<span>" + job.postedDate + "</span>" + "</li>" + "<button class='apply-btn'>" + "Apply</button>" + "<hr>");
          const salary = $(".salary").append("<li>" + job.salary + "</li>");
          const jobTitle = $(".job-title").append("<li>" + job.jobTitle + "</li>");
          const location = $(".location").append("<li>" + job.state + "</li>");
          const jobType = $(".job-type").append("<li>" + job.jobType + "</li>");
      });
    },
    error: function(err) {
      console.log(err);
    }



  })
}
$(function(){
button();
$.ajax({
  url: '/api/jobSearch',
  contentType: 'application/json',
  type: 'get',
  dataType: "json",
  crossdomain: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  success: function(data) {
    console.log(data);
  }
});
});
