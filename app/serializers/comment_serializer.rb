class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :item
  has_one :user
end
