import json

from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, QueryDict, Http404
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib import messages
from django.db.models import Q

# rest_framework
from rest_framework.parsers import FormParser, MultiPartParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status

from .serializers import PropertySerializer, GallerySerializer, PropertyTypeSerializer
from .utils.pagination import ResultInPagination
from .models import Property, Gallery, PropertyType

# from rest_framework.reverse import reverse
#
# api_view(['GET'])
# def api_root(request, format=None):
#     return Response({
#        'users': reverse('users:user-list', request=request, format=format),
#        'properties': reverse('properties:property-list', request=request, format=format),
#     })

@api_view(['GET', ])
def nearby_property_finder(request, current_latitude, current_longitude):
    user_location = Point(float(current_longitude), float(current_latitude))
    distance_from_point = {'km': 15}
    properties = Property.gis.filter(location__distance_lte=(user_location,D(**distance_from_point)))
    properties = properties.distance(user_location).order_by('distance')
    if properties.exists(): # count can be expensive in postgres
        paginator = ResultInPagination()
        paginated_properties = paginator.paginate_queryset(properties, request)
        serializer=PropertySerializer(paginated_properties, many=True)
        return paginator.get_paginated_response(serializer.data)
    else:
        return Response({}, status=status.HTTP_200_OK)

class PropertyListView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_fields = ('rent_price', 'rooms', 'city', )
    filter_backends = (DjangoFilterBackend,)

    def get_queryset(self):
        queryset = Property.objects.all()
        # Set up eager loading to avoid N+1 selects
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_url_kwarg = 'property_id'

    def get_queryset(self):
        queryset = Property.objects.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset

class PropertyGallery(APIView):
    serializer_class = GallerySerializer
    parser_classes = (FormParser, MultiPartParser, )
    def put(self, request, property_id=None, format=None):
        _property = get_object_or_404(Property, id=property_id)
        serializer = self.serializer_class(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save(property_instance=_property)
            return Response(serializer.data, status= status.HTTP_200_OK)
            # return Response(data={"msg": serializer.data}, status=status.HTTP_200_OK)

class PropertyTypeListView(generics.ListCreateAPIView):
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer

# class PropertyView(APIView):
#     permission_classes = (IsAuthenticated,) # explicit
#     serializer_class = PropertySerializer
#
#     def get_object(self, pk):
#         try:
#             return Property.objects.get(pk=pk)
#         except Property.DoesNotExist:
#             raise Http404
#
#     def get(self, request, property_id=None, format=None):
#         """ Get all property or a single property """
#         if property_id:
#             property_instance = self.get_object(property_id)
#             serializer = self.serializer_class(property_instance)
#             return Response(serializer.data)
#         else:
#             properties = Property.objects.filter(owner=request.user.id)
#             serializer = self.serializer_class(properties, many=True)
#             return Response(serializer.data)
#
#     def post(self, request, format=None):
#         """ Adding a new property"""
#         serializer = self.serializer_class(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
#         else:
#             data = serializer.data
#             owner = request.user
#             property_instance = Property(owner=owner, address=data['address']) # verified has to be added
#             property_instance.save()
#             request.data['id'] = property_instance.pk # return id
#             return Response(request.data, status=status.HTTP_201_CREATED)
#
#     def put(self, request, property_id, format=None):
#         """ Updating a property """
#         serializer = self.serializer_class(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
#         else:
#             data = serializer.data
#             address = data['address']
#             property_instance = Property(id=property_id, owner=request.user, address=address)
#             property_instance.save()
#             return Response(status=status.HTTP_200_OK)
#

def property(request):
    return HttpResponse("Hello World")
