class FollowsController < ApplicationController

	def create
		@follow = Follow.new
		@follow.blog_id = (params[:blog_id])
		@follow.follower_id = current_user.id
		@follow.save!

		render :json => @follow
	end

	def destroy
		@follow = Follow.find(:id)
		@follow.destroy
	end

end
