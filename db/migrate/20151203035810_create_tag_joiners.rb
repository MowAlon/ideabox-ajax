class CreateTagJoiners < ActiveRecord::Migration
  def change
    create_table :tag_joiners do |t|
      t.references :idea, index: true, foreign_key: true
      t.references :tag, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
