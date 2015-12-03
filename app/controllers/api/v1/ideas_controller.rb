class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    ideas = Idea.all.order('created_at ASC')
    respond_with ideas_with_tags(ideas)
  end

  def show
    idea = Idea.find_by(id: params[:id])
    respond_with idea_with_tags(idea)
  end

  def create
    new_idea = Idea.new(idea_params.except("tags"))
    if new_idea.save
      Tag.add_new_tags(params[:tags], new_idea) if !params[:tags].empty?
      render json: idea_with_tags(new_idea), status: 200
    else
      render json: new_idea.errors, status: 400
    end
  end

  def update
    idea = Idea.find_by(id: params[:id])
    update_type = params[:update_type]
    if update_type == "edit"
      if idea.edit(params[:title], params[:description])
        render json: idea_with_tags(idea), status: 200
      else
        render json: idea.errors, status: 400
      end
    else
      if idea.send(params[:update_type])
        render json: idea_with_tags(idea), status: 200
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

    def ideas_with_tags(ideas)
      JSON.parse(ideas.to_json).map do |idea|
        idea["tags"] = Idea.find(idea["id"]).tags.map{|tag| tag.name}.join(", ")
        idea
      end
    end

    def idea_with_tags(idea)
      ideas_with_tags([idea]).first
    end

end
