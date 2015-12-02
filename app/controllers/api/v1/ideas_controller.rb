class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all.order('created_at ASC').to_json
  end

  def create
    new_idea = Idea.new(idea_params)
    if new_idea.save
      # respond_with new_idea, status: 200, location: [:api, :v1, new_idea]
      render json: new_idea, status: 200
    else
      render json: new_idea.errors, status: 400
    end
  end

  def destroy
    deleted_idea = Idea.find_by(id: params[:id]).destroy
    if deleted_idea
      render json: deleted_idea, status: 200
    else
      render json: deleted_idea.errors, status: 400
    end
  end

  private

    def idea_params
      params.permit(:title, :description)
    end
end

# var $ideas = $('.ideas');
#
# $.getJSON('/api/v1/ideas').then(function (data) {
#   data.forEach(appendIdeaToPage);
#   });
#
# function createElementFromIdea(idea) {
#   return $('<div class="idea"><h2>' + idea.title + '</h2><p>' + idea.description + '</p></div>');
# }
#
# function appendIdeaToPage(idea) {
#   var $idea = $('<div class="idea"><h2>' + idea.title + '</h2><p>' + idea.description + '</p></div>');
#   $ideas.append($idea);
# }
