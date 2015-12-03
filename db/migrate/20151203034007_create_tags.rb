class CreateTags < ActiveRecord::Migration
  def change
    enable_extension 'citext'

    create_table :tags do |t|
      t.citext :name

      t.timestamps null: false
    end
  end
end
