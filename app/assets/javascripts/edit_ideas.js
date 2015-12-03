function makeIdeaEditable() {
  $(document).on("click", ".make-editable", function () {
    var ideaID = $(this).closest(".idea").attr("id")
    var ideaContent = $(this).siblings(".idea-content");
    var endpoint = '/api/v1/ideas/' + ideaID + '.json'

    $.getJSON(endpoint).then(function (idea){
      ideaContent.replaceWith("<div class='edit-boxes'>" +
                                "<h1>" + ideaID + ".</h1>" +
                                "<form action='/' method='put'>" +
                                  "<input class='title' value='" + idea.title + "' type='text' name='idea[title]' id='idea_title' />" +
                                  "<textarea class='description' name='idea[description]' id='idea_description'>" + idea.description + "</textarea>" +
                                "</form>" +
                                "<button class='btn btn-primary edit'>Save</button>" +
                              "</div>"
                            );
    })
    .fail(function() {
      console.log("fail");
    });
  });
}

function approveIdea() {
  updateIdea("approve");
}

function rejectIdea() {
  updateIdea("reject");
}

function editIdea() {
  updateIdea("edit")
}

function updateIdea(update_type){
  $(document).on("click", "." + update_type, function () {
    var idea_id = $(this).closest(".idea").attr("id")
    var title, description

    if (update_type === "edit") {
      title = $(this).closest(".idea").find(".title").val()
      description = $(this).closest(".idea").find(".description").val()
    }

    $.ajax({
       type: 'PATCH',
       url: '/api/v1/ideas/' + idea_id + '.json?update_type=' + update_type + "&title=" + title + "&description=" + description,
       success: function(idea){
         refreshIdea(idea)
       },
       error: function(){
         console.log("fail")
       }
     })
   });
}

function refreshIdea(idea) {
  $('#' + idea.id).replaceWith(ideaElement(idea));
}
