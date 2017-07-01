from django.contrib.gis import admin as gis_admin
from django.contrib import admin
from .models import Property, Category, PropertyType

class PropertyFinderAdmin(gis_admin.GeoModelAdmin):
    class Meta:
        models = Property
admin.site.register(Property, PropertyFinderAdmin)

admin.site.register(Category)
admin.site.register(PropertyType)
# admin.site.register(Property)
