from django.conf.urls import url
from eco import views

urlpatterns = [
    url('clothes-recycle', views.clothes_recycle),
    url('garbage-truck', views.garbage_truck),
    url('green-store', views.green_store),
    url('reward-store', views.reward_store)
]