class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :authorize
  # skip_forgery_protection

  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { count: session[:count] }
  end

  private

  def render_not_found(exception)
    render json: {error: "#{exception.model} not found"}, status: :not_found
  end

  def render_unprocessable_entity(exception)
    render json: {errors:exception.record.errors.full_messages}, status: :unprocessable_entity
  end

  def authorize
    @current_user = User.find_by(id:session[:user_id])
    render json: {errors: ["Not authorized"]}, status: :unauthorized unless @current_user
  end
end
