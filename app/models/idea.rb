class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)

  def approve
    update(quality: quality_value + 1) unless quality_value ==  quality_count - 1
  end

  def reject
    update(quality: quality_value - 1) unless quality_value == 0
  end

  private

    def quality_count
     @count ||= Idea.qualities.count
    end

    def quality_value
      Idea.qualities[quality]
    end

end
