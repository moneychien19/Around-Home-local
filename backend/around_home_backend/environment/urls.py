from django.conf.urls import url
from environment import views

urlpatterns = [
    url('air-quality', views.air_quality),
    url('uv', views.uv),
    url('waste-disposal', views.disposal_list),
    url('water-quality', views.water_quality)
]