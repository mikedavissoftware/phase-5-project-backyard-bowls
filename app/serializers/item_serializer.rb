class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :image, :base, :protein, :veggies, :dressing, :price
end
