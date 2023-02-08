class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :user_id, :item_id
  has_one :item
  has_one :user
end
