function filterByTag() {
  $(document).on("click", ".tag_button", function() {
    var tag = $(this).attr("id");
    hideAllIdeas();
    if (tag === "clear_tag_filter") {tag = ""};
    clearTextFilter();
    showFilteredIdeasByTag(tag);
    highlightTagButton($(this));
  });
}

function clearTextFilter() {
  $("#filter").val("");
}

function showFilteredIdeasByTag(tag) {
  $("em:contains('" + tag + "')").closest(".idea").show();
}

function highlightTagButton(tagObject) {
  $(".tag_button").toggleClass("btn-info", false)
  tagObject.toggleClass("btn-info", true);
}
