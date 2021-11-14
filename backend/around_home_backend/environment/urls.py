from django.conf.urls import url
from environment import views

urlpatterns = [
    url('airquality', views.air_quality),
    url('uv', views.uv),
    url('waste-disposal', views.disposal_list)
]