Rails.application.routes.draw do
  resources :tasks
  get "/service-worker.js" => "service_worker#service_worker"
  get "/manifest.json" => "service_worker#manifest"
end
