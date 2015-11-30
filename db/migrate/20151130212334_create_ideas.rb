class CreateIdeas < ActiveRecord::Migration
  def change
    enable_extension 'citext'

    create_table :ideas do |t|
      t.citext :title
      t.citext :description
      t.integer :quality, default: 0

      t.timestamps null: false
    end
  end
end
