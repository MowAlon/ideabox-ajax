class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)
  has_many :tag_joiners, :dependent => :delete_all
  has_many :tags, through: :tag_joiners

  def update_response(params)
    update_type = params[:update_type]
    @params = params
    if send(params[:update_type])
      {object: idea_with_tags, status: 200}
    else
      {object: errors, status: 400}
    end
  end

  def ideas_with_tags(ideas)
    ideas.map{|idea| idea_with_tags(idea)}
  end

  def idea_with_tags(idea = self)
    idea.as_json.merge({tags: tag_string(idea)})
  end

  private

    def approve
      update(quality: quality_value + 1) unless quality_value ==  quality_count - 1
    end

    def reject
      update(quality: quality_value - 1) unless quality_value == 0
    end

    def edit
      update(title: @params[:title], description: @params[:description])
    end

    def quality_count
     @count ||= Idea.qualities.count
    end

    def quality_value
      Idea.qualities[quality]
    end

    def tag_string(idea)
      idea.tags.map{|tag| tag.name}.join(", ")
    end

end
