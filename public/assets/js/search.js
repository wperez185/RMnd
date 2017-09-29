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

function loadParams(){
  const jobTitle = getUrlVars()["jobTitle"];
  const state = getUrlVars()["location"];

  if(jobTitle && state){
    let obj = {
      jobTitle,state
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
      // console.log(data);
      },
      error: function(err) {
        // console.log(err);
      }
    })
 }
  }
  loadParams();

  $("#searchForm").submit(function(event) {
    event.preventDefault();
    let search = "";
    let jobTitle,state = "";

    if($("#jobTitle").val()){
      jobTitle = "jobTitle=" + $("#jobTitle").val();
    }
    if($("#location").val()){
      state = "location=" + $("#location").val();
    }
    if(jobTitle && state){
      search = "?" +jobTitle + "&" + state;
    }else if (jobTitle) {
      search = "?" +jobTitle;
    } else {
      search = "?" +state;
    }
      window.location.href = "/jobPosts" +search;

  });

  $("#searchForm").submit(function(event){
    event.preventDefault();
  const jobTitle = $("#jobTitle").val();
  const state = $("#location").val();
  let obj = {
    jobTitle,state
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
    },
    error: function(err) {
      console.log(err);
    }
  })
});
});
