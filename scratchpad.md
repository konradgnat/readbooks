            // <% if (comment.author.id.equals(currentUser._id)) { %>
            //   <h1> Same user!!!!!</h1>
            // <% } %>



            

          //TODOS- CREATE reply to specific comment functionality - probs in the style of instagram




          //TODOS- CREATE DATE stamp of when comment was made



  <%console.log(book_id); console.log(comment._id);%>
<form class="ui form" action="books/<%=book_id%>/comments/<%=comment._id%>?_method=PUT" method="POST">