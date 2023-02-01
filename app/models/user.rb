class User < ApplicationRecord
  # has_secure_password

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :items, through: :likes
  has_many :items, through: :comments

  validates_presence_of :username, :diet
  validates_uniqueness_of :username
end
