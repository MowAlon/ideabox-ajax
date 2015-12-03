class Tag < ActiveRecord::Base
  has_many :tag_joiners
  has_many :ideas, through: :tag_joiners

  def self.add_new_tags(tags)
    tags.split(',').each{|tag| Tag.find_or_create_by(name: tag.strip)}
  end
end
