$(document).ready(function() {
  var $submitButton = $("#submit_idea")
  listIdeas();
  newIdea($submitButton);
  deleteIdea();
  approveIdea();
  rejectIdea();
  makeIdeaEditable();
  editIdea();
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

function approveIdea() {
  updateIdea("approve");
}

function rejectIdea() {
  updateIdea("reject");
}

function makeIdeaEditable() {
  $(document).on("click", ".edit", function () {
    console.log("Clicked edit button");
    var idea_id = $(this).closest(".idea").attr("id")
    var inputFields = $(this).siblings(".input-fields");
    var title = inputFields.find(".title").text();
    var description = inputFields.find(".description").text();

    inputFields.replaceWith("<div class='input-fields'>" +
                              "<h1>" + idea_id + ".</h1>" +
                              "<form action='/' method='put'>" +
                                "<input value='" + title + "' type='text' name='idea[title]' id='idea_title' />" +
                                "<textarea name='idea[description]' id='idea_description'>" + description + "</textarea>" +
                                "<input id='submit-edit' type='submit' value='Submit'>" +
                              "</form>" +
                            "</div>"
                          );
  });
}

function editIdea() {
  // updateIdea("edit")
}

function updateIdea(update_type){
  $(document).on("click", "." + update_type, function () {
    var idea_id = $(this).closest(".idea").attr("id")

    $.ajax({
       type: 'PATCH',
       url: '/api/v1/ideas/' + idea_id + '.json?update_type=' + update_type,
       success: function(idea){
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
          "<div class='input-fields'>" +
            "<h1>" + idea.id + ". <span class='title'>" + idea.title + "</span></h1>" +
            "<h3><span class='description'>" + idea.description + "</span></h3>" +
          "</div>" +
          "<p class='text-right'>Submitted: " + idea.created_at + " -- Current rating: " + idea.quality + " -- " +
          "<button class='btn btn-success approve'><span class='glyphicon glyphicon-thumbs-up'></span></button>" +
          "<button class='btn btn-danger reject'><span class='glyphicon glyphicon-thumbs-down'></span></button></p>" +
          "<a class='btn btn-info edit'><span class='glyphicon glyphicon-pencil'></span></a>" +
          "<a class='btn btn-danger delete'><span class='glyphicon glyphicon-trash'></span></a>" +
          "<hr>" +
        "</div>"
}

function removeIdeaFromView(idea) {
  $('#' + idea.id).remove();
}
