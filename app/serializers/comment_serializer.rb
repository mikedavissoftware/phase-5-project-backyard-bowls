class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :dish
  has_one :user
end
