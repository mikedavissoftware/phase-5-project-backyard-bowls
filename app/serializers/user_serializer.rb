class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :image, :fav_bowl, :diet
end
