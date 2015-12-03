class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all.order('created_at ASC')
  end

  def show
    respond_with Idea.find_by(id: params[:id])
  end

  def create
    new_idea = Idea.new(idea_params.except("tags"))
    Tag.add_new_tags(params[:tags]) if !params[:tags].empty?
    if new_idea.save
      render json: new_idea, status: 200
    else
      render json: new_idea.errors, status: 400
    end
  end

  def update
    idea = Idea.find_by(id: params[:id])
    update_type = params[:update_type]
    if update_type == "edit"
      if idea.edit(params[:title], params[:description])
        render json: idea, status: 200
      else
        render json: idea.errors, status: 400
      end
    else
      if idea.send(params[:update_type])
        render json: idea, status: 200
      else
        render json: idea.errors, status: 400
      end
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
      params.permit(:title, :description, :tags)
    end
end
