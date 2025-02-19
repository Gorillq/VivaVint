class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  helper_method :current_cart, :cart_products


private



  def current_cart
    session[:cart] ||= {}
  end

  def cart_products
    current_cart.keys.map { |id| Product.find(id) } rescue []
  end
end
