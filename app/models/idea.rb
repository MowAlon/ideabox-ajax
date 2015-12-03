class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)
  has_many :tag_joiners, :dependent => :delete_all
  has_many :tags, through: :tag_joiners

  def approve
    update(quality: quality_value + 1) unless quality_value ==  quality_count - 1
  end

  def reject
    update(quality: quality_value - 1) unless quality_value == 0
  end

  def edit(title, description)
    update(title: title, description: description)
  end

  def update_response(params)
    idea = Idea.find_by(id: params[:id])
    update_type = params[:update_type]
    if update_type == "edit"
      if idea.edit(params[:title], params[:description])
        {object: idea_with_tags(idea), status: 200}
      else
        {object: idea.errors, status: 400}
      end
    else
      if idea.send(params[:update_type])
        {object: idea_with_tags(idea), status: 200}
      else
        {object: idea.errors, status: 400}
      end
    end
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

  private

    def quality_count
     @count ||= Idea.qualities.count
    end

    def quality_value
      Idea.qualities[quality]
    end

end
