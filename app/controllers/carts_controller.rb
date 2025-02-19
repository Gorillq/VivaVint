class CartsController < ApplicationController
  def show
    @cart_items = cart_products
  end

  def add_item
    product_id = params[:product_id]
    session[:cart] ||= []
    session[:cart] << product_id unless session[:cart].include?(product_id)
    
    if session[:cart].include?(product_id)
      render json: { success: true, message: "Product added to cart" }
    else
      render json: { success: false, message: "Failed to add product to cart" }, status: :unprocessable_entity
    end
  end

  def remove_item
    if current_cart.delete(params[:product_id])
      render json: { success: true, message: "Product removed from cart" }
    else
      render json: { success: false, message: "Product not in cart" }, status: :not_found
    end
  end

  private

  def current_cart
    session[:cart] ||= {}
  end

  def cart_products
    product_ids = current_cart.keys
    Product.where(id: product_ids).index_by(&:id)
  end
end
