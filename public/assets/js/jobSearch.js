$(function() {
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
      $("#job-list").append("<li>" + job.jobTitle + "<span>" + job.description + "</span>"  + "<span>" + job.city + "</span>" + "<span>" + job.state + "</span>" + "<span>" + job.zipcode + "</span>" + "<span>" + "<p class='money-sign'>" + "$" + "</p>" + job.salary + "</span>" +
       "<span>" + job.postedDate + "</span>" + "</li>" + "<button class='apply-btn'>" + "Apply</button>" + "<hr>");
      const salary = $(".salary").append("<li>" + job.salary + "</li>");
      const jobTitle = $(".job-title").append("<li>" + job.jobTitle + "</li>");
      const state = $(".location").append("<li>" + job.state + "</li>");
      const jobType = $(".job-type").append("<li>" + job.jobType + "</li>");
  });
}
function loadParams(){
  const jobTitle = getUrlVars()["jobTitle"];
  const state = getUrlVars()["state"];
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

  $("#dataSearchForm").submit(function(event){
    event.preventDefault();
  let jobTitle = $("#dataJobTitle").val();
  console.log(jobTitle);
  let state = $("#location :selected").val();
  let obj = {}
  if(jobTitle && state){
    obj.state = state;
    obj.jobTitle = jobTitle;
  }else if (jobTitle) {
    obj.jobTitle = jobTitle;
  } else if (state){
    obj.state = state;
  }
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
    loadData(data);
    },
    error: function(err) {
      console.log(err);
    }
  })
});
});
