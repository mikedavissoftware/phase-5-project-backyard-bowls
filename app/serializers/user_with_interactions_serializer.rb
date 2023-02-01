class UserWithInteractionsSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :image, :fav_bowl, :diet

  has_many :likes
  has_many :comments
end
