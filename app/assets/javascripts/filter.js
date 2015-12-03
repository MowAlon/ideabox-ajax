function filterIdeas() {
  $(document).on("keyup", "#filter", function () {
    var filterText = $(this).val();
    hideAllIdeas()
    showFilteredIdeas(filterText)
  });
}

function hideAllIdeas() {
  $("#idea_list").children().hide()
}

function showFilteredIdeas(filterText) {
  $("span:contains('" + filterText + "')").closest(".idea").show();
}
