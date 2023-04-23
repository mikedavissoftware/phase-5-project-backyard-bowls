Rails.application.config.middleware.insert_before 0, Rack::Cors do

  allow do
    origins 'http://localhost:4000'
    resource '*', 
      headers: :any, 
      methods: [:post]
  end

end
