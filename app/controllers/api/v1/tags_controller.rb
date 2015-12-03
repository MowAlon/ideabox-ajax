class Api::V1::TagsController < ApplicationController
  respond_to :json

  def index
    respond_with Tag.all.order('name ASC')
  end

end
