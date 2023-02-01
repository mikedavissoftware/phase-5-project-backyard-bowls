class LikeSerializer < ActiveModel::Serializer
  attributes :id
  has_one :item
  has_one :user
end
