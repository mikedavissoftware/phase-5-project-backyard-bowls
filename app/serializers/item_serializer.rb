class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :image, :base, :protein, :veggies, :dressing, :price
end
