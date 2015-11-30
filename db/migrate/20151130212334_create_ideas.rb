class CreateIdeas < ActiveRecord::Migration
  def change
    enable_extension 'citext'

    create_table :ideas do |t|
      t.citext :title
      t.citext :body
      t.integer :quality

      t.timestamps null: false
    end
  end
end
