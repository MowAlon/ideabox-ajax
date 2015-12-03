$(document).ready(function() {
  var $submitButton = $("#submit_idea");
  listIdeas();
  newIdea($submitButton);
  deleteIdea();
  makeIdeaEditable();
  approveIdea();
  rejectIdea();
  editIdea();
  filterIdeas();
  listTags();
});

function ideaElement(idea) {
  return "<div id='" + idea.id + "' class='idea'>" +
          "<div class='idea-content'>" +
            "<h1>" + idea.id + ". <span class='title'>" + idea.title + "</span></h1>" +
            "<h2><span class='description'>" + shortString(idea.description) + "</span></h2>" +
          "</div>" +
          "<p class='text-right'>Submitted: " + dateFormat(idea.created_at, "shortDate") + " @ " + dateFormat(idea.created_at, "shortTime") + " -- Current rating: " + idea.quality + " -- " +
          "<button class='btn btn-success approve'><span class='glyphicon glyphicon-thumbs-up'></span></button>" +
          "<button class='btn btn-danger reject'><span class='glyphicon glyphicon-thumbs-down'></span></button></p>" +
          "<a class='btn btn-info make-editable'><span class='glyphicon glyphicon-pencil'></span></a>" + " | " +
          "<a class='btn btn-danger delete'><span class='glyphicon glyphicon-trash'></span></a>" +
          "<hr>" +
        "</div>"
}

function shortString(string) {
  var maxLength = 100
  var trailer = "..."
  var indexOfLastGoodSpace = maxLength;
  if (string.length > 100) {
    for (var i = (maxLength - 1); i >= 0; i--){
      if (string[i] === " " && i <= maxLength ) {
        indexOfLastGoodSpace = i
        break
      };
    };
  } else {
    trailer = ""
  }
  return string.substring(0, indexOfLastGoodSpace) + trailer;
}
