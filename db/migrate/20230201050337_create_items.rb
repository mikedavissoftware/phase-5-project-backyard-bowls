class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :category
      t.string :image
      t.string :base
      t.string :protein
      t.string :veggies
      t.string :dressing
      t.integer :price

      t.timestamps
    end
  end
end
