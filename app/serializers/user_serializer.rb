class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :image, :favorite_dish, :diet
end
