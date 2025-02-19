class Product < ApplicationRecord
  has_one_attached :main_image
  has_many_attached :gallery_images
  validates :title, :price , presence: true
end
