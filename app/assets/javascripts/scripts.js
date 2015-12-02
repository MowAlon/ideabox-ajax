$(document).ready(function() {
  var $submitButton = $("#submit_idea")
  listIdeas();
  newIdea($submitButton);
  deleteIdea();
  approveIdea();
  rejectIdea();
});

function newIdea(submit){
  submit.on("click", function() {
    var new_title = $('#idea_title').val()
    var new_description = $('#idea_description').val()

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas.json?title=' + new_title + '&description=' + new_description,
      success: function(ideas){
        addIdeaToView(ideas)
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
       response.forEach(addIdeaToView);
     },
     error: function(){
       console.log("fail")
     }
   });
}

function approveIdea(){
  $(document).on("click", ".approve", function () {
    var approveId = $(this).closest(".idea").attr("id")

    $.ajax({
       type: 'PATCH',
       url: '/api/v1/ideas/' + approveId + '.json?update_type=approve',
       success: function(idea){
         console.log("approved!")
         refreshIdea(idea)
       },
       error: function(){
         console.log("fail")
       }
     })
   });
}

function rejectIdea(){
  $(document).on("click", ".reject", function () {
    var approveId = $(this).closest(".idea").attr("id")

    $.ajax({
       type: 'PATCH',
       url: '/api/v1/ideas/' + approveId + '.json?update_type=reject',
       success: function(idea){
         console.log("REJECTED!")
         refreshIdea(idea)
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
         removeIdeaFromView(idea)
       },
       error: function(){
         console.log("fail")
       }
     })
   });
}

function addIdeaToView(idea) {
  $('#idea_list').prepend(ideaElement(idea));
}

function refreshIdea(idea) {
  $('#' + idea.id).replaceWith(ideaElement(idea));
}

function ideaElement(idea) {
  return "<div id='" + idea.id + "' class='idea'>" +
          "<h1>" + idea.id + ". " + idea.title + "</h1>" +
          "<h3>" + idea.description + "</h3>" +
          "<p class='text-right'>Submitted: " + idea.created_at + " -- Current rating: " + idea.quality + " -- " +
          "<button class='btn btn-success approve'><span class='glyphicon glyphicon-thumbs-up'></span></button>" +
          "<button class='btn btn-danger reject'><span class='glyphicon glyphicon-thumbs-down'></span></button></p>" +
          "<a class='btn btn-primary delete'>Delete</a>" +
          "<hr>" +
        "</div>"
}

function removeIdeaFromView(idea) {
  $('#' + idea.id).remove();
}
