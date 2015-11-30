class WelcomeController < ApplicationController

  def index
    @idea = Idea.new
    @ideas = Idea.all
  end
end
