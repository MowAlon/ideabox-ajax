function listIdeas(){
  var endpoint = '/api/v1/ideas.json'
  $.getJSON(endpoint).then(function (ideas){
    addManyIdeasToView(ideas);
  })
  .fail(function() {
    console.log("fail");
  });
}

function newIdea(submit){
  submit.on("click", function() {
    var new_title = $('#idea_title').val()
    var new_description = $('#idea_description').val()
    var new_tags = $('#new_tags').val()
    var endpoint = '/api/v1/ideas.json?title=' + new_title + '&description=' + new_description + '&tags=' + new_tags

    $.post(endpoint).then(function (idea){
      addIdeaToView(idea)
      clearSubmitFields()
    })
    .fail(function() {
      console.log("fail");
    });
  });
}

function addManyIdeasToView(ideas) {
  ideas.forEach(addIdeaToView);
}

function addIdeaToView(idea) {
  $('#idea_list').prepend(ideaElement(idea));
}

function clearSubmitFields() {
  $("#idea_title").val("");
  $("#idea_description").val("");
  $("#new_tags").val("");
}
