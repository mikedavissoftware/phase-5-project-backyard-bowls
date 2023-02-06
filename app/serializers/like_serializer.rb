class LikeSerializer < ActiveModel::Serializer
  attributes :id, :item_id, :user_id
  # has_one :item
  # has_one :user
end
