class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create

  def show
    render json: @current_user
  end

  def create
    user = User.find_by(username: params[:username])
    if user &.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: {errors: ["Invalid username or password. Please try again."]}, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

end
