class LikeSerializer < ActiveModel::Serializer
  attributes :id
  has_one :dish
  has_one :user
end
