from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.property, name='index'),
    # Property Endpoint
    url(r'^property/$', views.PropertyListView.as_view(), name='property'),
    url(r'^property/(?P<property_id>[0-9]*)/$', views.PropertyDetailView.as_view(), name='property-detail'),
    url(r'^nearby_property/(?P<current_latitude>-?\d*.\d*)/(?P<current_longitude>-?\d*.\d*)/$', views.nearby_property_finder, name="nearby-property"),
    url(r'^upload/images/(?P<property_id>[0-9]*)/$', views.PropertyGallery.as_view(), name='property-gallery'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
