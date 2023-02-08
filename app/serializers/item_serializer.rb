class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :image, :base, :protein, :veggies, :dressing, :price
  has_many :likes
  has_many :comments
end
