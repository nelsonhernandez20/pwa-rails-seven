Rails.application.routes.draw do
  root 'tasks#index'
  resources :tasks
  get "/service-worker.js" => "service_worker#service_worker"
  get "/manifest.json" => "service_worker#manifest"
end
