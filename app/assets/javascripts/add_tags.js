function listTags(){
  var endpoint = '/api/v1/tags.json'
  $.getJSON(endpoint).then(function (tags){
    addManyTagsToView(tags);
  })
  .fail(function() {
    console.log("fail");
  });
}

// function newTag(submit){
//   submit.on("click", function() {
//     var new_title = $('#tag_title').val()
//     var new_description = $('#tag_description').val()
//     var endpoint = '/api/v1/tags.json?title=' + new_title + '&description=' + new_description
//
//     $.post(endpoint).then(function (tag){
//       addTagToView(tag)
//       clearSubmitFields()
//     })
//     .fail(function() {
//       console.log("fail");
//     });
//   });
// }

function addManyTagsToView(tags) {
  tags.forEach(addTagToView);
}

function addTagToView(tag) {
  $('#tag_list').append(tagElement(tag));
}

function tagElement(tag) {
  return "<button id='" + tag.name + "' class='btn tag_button'>" + tag.name + "</button>"
}
