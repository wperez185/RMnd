$(function() {
  const jobsPerPage = 10;
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
  // First, update the job list with all the jobs
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

  // Then, update the pagination based on the number of pages
  let numPages = Math.ceil(data.length / jobsPerPage);
  let newPagination = '';
  for (let i = 1; i <= numPages; i++) {
    newPagination += '<a href="#">' + i + '</a>';
  }
  $('.pagination').html(newPagination);

  // Show the first page of jobs by default
  let page = 1;
  // Hide of all of the jobs…
  $(".job-post > li").css("display", "none");
  // Except the ones on the selected page
  let start = jobsPerPage * (page - 1);
  let end   = jobsPerPage * page;
  $(".job-post > li").slice(start, end).css("display", "block");
  // Reset "active" for all pagination…
  // Except the current button (set that as "active")
  $('.pagination > a').first().addClass('active');
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

  // This will only handle pagination links on the page _right now_. As soon as the pagination is updated, the click handling is lost.
  // $('.pagination > a').on('click', function(event) {

  // Instead, listen for clicks on the body but only handle the ones on pagination links
  $('body').on('click', '.pagination > a', function(event) {
    event.preventDefault();

    // Get the page #
    let page = $(this).text();

    // Bonus: If this is a prev/next button get the current page (i.e., the currently active button) and go to that page +- 1
    // if (...) {
    //   let current = $('.pagination > a.active').text();
    //   page = current - 1;
    //   page = current + 1;
    // }

    // Show the new page
    // Hide of all of the jobs…
    $(".job-post > li").css("display", "none");
    // Except the ones on the selected page
    let start = jobsPerPage * (page - 1);
    let end   = jobsPerPage * page;
    $(".job-post > li").slice(start, end).css("display", "block");
    // Reset "active" for all pagination…
    // Except the current button (set that as "active")
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });
});
