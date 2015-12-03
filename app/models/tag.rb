class Tag < ActiveRecord::Base
  has_many :tag_joiners
  has_many :ideas, through: :tag_joiners

  def self.add_new_tags(tags, idea)
    tags.split(',').each do |tag|
      tag = Tag.find_or_create_by(name: tag.strip)
      idea.tags << tag
    end
  end
end
