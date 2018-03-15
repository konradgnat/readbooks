<!-- <% include partials/header %> -->

<!-- <% if(!currentUser){%>  -->


    <!-- <%} else { %>
        <div>Welcome back</div>
      <% } %>   -->
      <!-- <div class="landing-hero ui inverted vertical masthead center aligned segment">
        <div class="ui text container hero__inner">
          <h1 class="ui inverted header">
            Welcome to ReadBooks!
          </h1>
          <h2>Share what you think of books you have read and see what your friends are reading.</h2>
          <a href="/login" class="ui inverted button">Log in</a>
          <a href="/register" class="ui inverted button">Sign Up</a>
        </div>
      </div> -->




// description		: String,
// age				: Number,
// topFiveAuthors	: String,
// location		: String,
// interests		: String,



<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <!-- Site Properties -->
  <title>ReadBooks</title>
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/semantic.min.css">
  <link rel="stylesheet" type="text/css" href="/stylesheets/subpage.css">
  <link rel="stylesheet" type="text/css" href="/stylesheets/style.css">
</head>
<body>


<div class="ui large top fixed hidden collapsible menu">
    <div id="menu_nav" class="menu_nav">
      <a href="/" class="menu_nav__item">Home</a>
      <!-- <% if(!currentUser){%>  -->
      <a href="/books/new" class="menu_nav__item">Add Book</a>
      <a href="/login" class="menu_nav__item">Log in</a>
      <a href="/register" class="menu_nav__item">Sign Up</a>
      <!-- <%} else { %>
        <a href="/books/new" class="menu_nav__item">Add Book</a>
        <a href="/profile" class="menu_nav__item">Profile</a>
        <a href="/logout" class="menu_nav__item">Logout</a>
      <%}%> -->
      <div class="menu_nav__item menu_nav__item--profile">
        Signed is as 
      <!-- <%if(currentUser.username){%>
        <%=currentUser.username%>
      <% } else if (currentUser.facebook.name) {%>
        <%=currentUser.facebook.name%>
      <% } else if (currentUser.twitter.username) {%>
        <%=currentUser.twitter.username%>
      <% } else if (currentUser.google.name) {%>
        <%=currentUser.google.name%>
      <% } else {%>
        <%= user %>
      <% } %>    -->
      </div>
      <div id="menu_button" class="menu_nav__button" onclick="expandMenu()">
          ☰
      </div>
    </div>
  </div>
</div>  