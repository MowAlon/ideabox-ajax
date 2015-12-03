function listTags(){
  var endpoint = '/api/v1/tags.json'
  $.getJSON(endpoint).then(function (tags){
    addManyTagsToView(tags);
  })
  .fail(function() {
    console.log("fail");
  });
}

function addManyTagsToView(tags) {
  tags.forEach(addTagToView);
}

function addTagToView(tag) {
  $('#tag_list').append(tagElement(tag));
}

function tagElement(tag) {
  return "<button id='" + tag.name + "' class='btn tag_button'>" + tag.name + "</button>";
}

function clearTagList(){
  $('#tag_list').empty();
}

function refreshTagList(){
  clearTagList()
  listTags()
}
