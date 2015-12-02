$(document).ready(function() {
  var $submitButton = $("#submit_idea")
  listIdeas();
  newIdea($submitButton);
  deleteIdea();
});

function newIdea(submit){
  submit.on("click", function() {
    var new_title = $('#idea_title').val()
    var new_description = $('#idea_description').val()

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas.json?title=' + new_title + '&description=' + new_description,
      success: function(ideas){
        displayIdea(ideas)
      },
      error: function(){
        console.log("fail")
      }
     })
   });
}

function deleteIdea(){
  $(document).on("click", ".delete", function () {
    var deleteId = $(this).closest(".idea").attr("id")

    $.ajax({
       type: 'DELETE',
       url: '/api/v1/ideas/' + deleteId + '.json',
       success: function(idea){
         removeIdea(idea)
       },
       error: function(){
         console.log("fail")
       }
     })
   });
}

function listIdeas(){
  $.ajax({
     type: 'GET',
     url: '/api/v1/ideas.json',
     success: function(response){
       response.forEach(displayIdea);
     },
     error: function(){
       console.log("fail")
     }
   })
}

function displayIdea(idea) {
  $('#idea_list').prepend("<div id='" + idea.id + "' class='idea'>" +
                            "<h1>" + idea.id + ". " + idea.title + "</h1>" +
                            "<h3>" + idea.description + "</h3>" +
                            "<h4 class='text-right'>Submitted: " + idea.created_at + " -- Current rating: " + idea.quality + "</h4>" +
                            "<a class='btn btn-primary delete'>Delete</a><hr>" +
                          "</div>"
                          )
}

function removeIdea(idea) {
  $('#' + idea.id).addClass('hidden')
}
