class Tag < ActiveRecord::Base
  has_many :tag_joiners
  has_many :ideas, through: :tag_joiners

  def self.add_new_tags(tags, idea_id)
    tags.split(',').each do |tag|
      tag = Tag.find_or_create_by(name: tag.strip)
      TagJoiner.find_or_create_by(tag_id: tag.id, idea_id: idea_id)
    end
  end
end
