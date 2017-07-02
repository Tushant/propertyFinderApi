import geocoder
from django.contrib.auth.models import User
from django.contrib.gis.geos import fromstr
from django.contrib.gis.geos import Point

from rest_framework import serializers

from .models import PropertyType, Category, Property, Gallery

class EagerLoadingMixin:
    @classmethod
    def setup_eager_loading(cls, queryset):
        if hasattr(cls, "_SELECT_RELATED_FIELDS"):
            queryset = queryset.select_related(*cls._SELECT_RELATED_FIELDS)
        if hasattr(cls, "_PREFETCH_RELATED_FIELDS"):
            queryset = queryset.prefetch_related(*cls._PREFETCH_RELATED_FIELDS)
        return queryset

class UserSerializer(serializers.ModelSerializer):
    properties = serializers.PrimaryKeyRelatedField(many=True, queryset=Property.objects.all())
    class Meta:
        model = User
        fields = ('id', 'username', 'properties',)

class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = ('id', 'name', )

class GallerySerializer(serializers.ModelSerializer, EagerLoadingMixin):
    class Meta:
        model = Gallery
        fields=('id', 'caption', 'image', )

    def perform_create(self, serializer):
        serializer.save(property_instance_id=serializer.validated_data['property_id'])

class PropertySerializer(serializers.ModelSerializer, EagerLoadingMixin):
    _SELECT_RELATED_FIELDS = ['owner', ]
    _PREFETCH_RELATED_FIELDS = ['property_type',]
    gallery = GallerySerializer(many=True)
    class Meta:
        model = Property
        exclude = ('timestamp', 'prefered_radius', )
        read_only_fields = ('location', )

    def perform_create(self, serializer):
        address = serializer.initial_data['address']
        g = geocoder.google(address)
        latitude = g.latlng[0]
        longitude = g.latlng[1]
        pnt = 'POINT(' +str(longitude) + '' + str(latitude) +')'
        #"SRID=4326;POINT (-0.01838496826510052 0.01071804253405522)",
        serializer.save(location=pnt)

    def to_representation(self, instance):
        ret = super(PropertySerializer, self).to_representation(instance)
        pnt = fromstr(ret['location'])
        ret['location'] = {'longitude': pnt.coords[0], 'latitude': pnt.coords[1]}
        # ret['distance'] = intance.distance.km
        return ret
