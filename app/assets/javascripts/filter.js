function filterIdeas() {
  $(document).on("keyup", "#filter", function () {
    var filterText = $(this).val();
    hideAllIdeas();
    showFilteredIdeas(filterText);
    highlightTagButton($('#all_tags_button'))
  });
}

function hideAllIdeas() {
  $("#idea_list").children().hide()
}

function showFilteredIdeas(filterText) {
  $("span:contains('" + filterText + "')").closest(".idea").show();
}
