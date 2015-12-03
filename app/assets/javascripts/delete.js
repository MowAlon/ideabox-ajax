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
         console.log("fail");
       }
     })
   });
}

function removeIdeaFromView(idea) {
  $('#' + idea.id).remove();
}
