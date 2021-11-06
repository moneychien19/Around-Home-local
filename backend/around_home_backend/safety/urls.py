from django.conf.urls import url
from safety import views

urlpatterns = [
    url('accident', views.accident_list),
    url('theft', views.theft_list)
]