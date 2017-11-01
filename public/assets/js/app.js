var menu = document.getElementById('menu'),
    panelMenu = menu.querySelectorAll('li'),
    panelBoxes = document.querySelectorAll('.panel__box'),
    signUp = document.getElementById('signUp'),
    signIn = document.getElementById('signIn');

function removeSelection(){
    for(var i = 0, len = panelBoxes.length; i < len; i++){panelBoxes[i].classList.remove('active');
    }
}

signIn.onclick = function(e){
  e.preventDefault();
  removeSelection();
  panelBoxes[0].classList.add('active');
  menu.classList.remove('second-box');
}

signUp.onclick = function(e){
  e.preventDefault();
  removeSelection();
  panelBoxes[1].classList.add('active');
  menu.classList.add('second-box');
}

$(function() {
  $("#signUpForm").submit(function(event) {
    event.preventDefault();
  const userInfo = $("#newUser").val();
  const userPassword = $("#newPassword").val();
  let obj = {
    username: userInfo,
    password: userPassword
  };
  console.log(JSON.stringify(obj));
  $.ajax({
    url: '/api/users',
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

  $("#signUpForm").submit(function(event) {
    event.preventDefault();
  const userLogin = $("#userName").val();
  const userLoginPassword = $("#userPassword").val();
  let obj = {
    username: userLogin,
    password: userLoginPassword
  };
  $.ajax({
    url: '/api/users',
    contentType: 'application/json',
    type: 'get',
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
