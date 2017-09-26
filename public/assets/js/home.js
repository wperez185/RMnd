$(function() {
  $("#searchForm").submit(function(event) {
    event.preventDefault();
    let search = "";
    let jobTitle,location = "";

    if($("#jobTitle").val()){
      jobTitle = "jobTitle=" + $("#jobTitle").val();
    }
    if($("#location").val()){
      location = "location=" + $("#location").val();
    }
    if(jobTitle && location){
      search = "?" +jobTitle + "&" + location;
    }else if (jobTitle) {
      search = "?" +jobTitle;
    } else {
      search = "?" +location;
    }
      window.location.href = "/jobPosts" +search;

    // $.ajax({
    //   url: '/api/jobSearch',
    //   contentType: 'application/json',
    //   type: 'get',
    //   dataType: "json",
    //   crossdomain: true,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*"
    //   },
    //   success: function(data) {
    //     console.log(data);
    //   }
  });
});
