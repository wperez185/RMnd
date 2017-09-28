$(function() {
  $("#searchForm").submit(function(event) {
    event.preventDefault();
    let search = "";
    let jobTitle,state = "";

    if($("#jobTitle").val()){
      jobTitle = "jobTitle=" + $("#jobTitle").val();
    }
    if($("#location").val()){
      state = "state=" + $("#location").val();
    }
    if(jobTitle && state){
      search = "?" +jobTitle + "&" + state;
    }else if (jobTitle) {
      search = "?" +jobTitle;
    } else {
      search = "?" +state;
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
