class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :authorize
  skip_before_action :authorize, only: [:hello_world]
  # skip_forgery_protection

  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { 
      message: "Welcome to the database!", 
      access: {
        front_end_login: "#{ENV['FRONTEND_URL']}/login",
        current_user: "#{ENV['BACKEND_URL']}/me",
        all_users: "#{ENV['BACKEND_URL']}/users",
        all_comments: "#{ENV['BACKEND_URL']}/comments",
        all_items: "#{ENV['BACKEND_URL']}/items",
        all_likes: "#{ENV['BACKEND_URL']}/likes"
      },
      count: session[:count] }
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
    render json: {errors: ["Not authorized"], to_database_home: "#{ENV['BACKEND_URL']}", to_login: "#{ENV['FRONTEND_URL']}/login"}, status: :unauthorized unless @current_user
  end
end
