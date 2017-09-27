$(function() {
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





  function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function loadData(data){
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
}
function loadParams(){
  const jobTitle = getUrlVars()["jobTitle"];
  const state = getUrlVars()["location"];
  console.log('test');
  // if(jobTitle && state){
    let obj = {
      state
    };
    $.ajax({
      url: `/api/jobSearch/filters`,
      contentType: 'application/json',
      type: 'post',
      dataType: "json",
      crossdomain: true,
      data: JSON.stringify(obj),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      success: function(data) {
      console.log(data);
      loadData(data);
      },
      error: function(err) {
        console.log(err);
      }
    })
 // }
  }
  loadParams();


  // console.log(getUrlVars()["jobTitle"]);

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

  $("#searchForm").submit(function(event){
    event.preventDefault();
  const jobTitle = $("#jobTitle").val();
  const state = $("#location :selected").text();
  let obj = {
    state
  };
  console.log(obj);
  $.ajax({
    url: `/api/jobSearch/filters`,
    contentType: 'application/json',
    type: 'post',
    dataType: "json",
    crossdomain: true,
    data: JSON.stringify(obj),
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
