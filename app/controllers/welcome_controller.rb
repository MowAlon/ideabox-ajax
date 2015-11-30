class WelcomeController < ApplicationController

  def index
    @idea = Idea.new
  end
end
