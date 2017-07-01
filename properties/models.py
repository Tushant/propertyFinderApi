from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse
from django.contrib.gis.db import models as gis_models
from django.conf import settings
from django.db import models

from smart_selects.db_fields import ChainedForeignKey


class PropertyType(models.Model):
    """Class that implements properties types, as House or Apartment."""
    name = models.CharField(_('Type of Property'), max_length=140)

    class Meta:
        """Set configurations for the PropertyType model."""
        verbose_name = _("Type of Property")
        verbose_name_plural = _('Type of Properties')

    def __str__(self):
        return self.name


class Category(models.Model):
    """Model for category of properties."""
    title = models.CharField(_('Category'), max_length=140)
    property_type = models.ForeignKey(PropertyType)

    class Meta:
        """Set configurations for the Category model."""
        verbose_name = _("Category")
        verbose_name_plural = _('Categories')

    def __str__(self):
        return self.title


class Property(models.Model):
    """Model for all properties."""
    owner = models.ForeignKey(settings.AUTH_USER_MODEL)
    address = models.CharField(_('Address'), max_length=140)
    state = models.CharField(_('State'), max_length=80)
    city = models.CharField(_('City'), max_length=140)
    district = models.CharField(_('District'), max_length=140)
    property_type = models.ForeignKey(PropertyType)
    category = ChainedForeignKey(
        Category,
        chained_field='property_type',
        chained_model_field='property_type'
    )
    rooms = models.PositiveSmallIntegerField(_('Rooms'))
    util_area = models.PositiveSmallIntegerField(
        _('Util Area'),
        blank=True,
        null=True
    )
    total_area = models.PositiveSmallIntegerField(_('Total Area'))
    title = models.CharField(_('Title'), max_length=140)
    image = models.ImageField(_('Image'), upload_to='img/')
    description = models.TextField(_('Description'))
    rent_price = models.DecimalField(
        _('Property Value'),
        max_digits=19,
        decimal_places=4
    )
    location = gis_models.PointField(blank=True, null=True, geography=True)
    prefered_radius = models.IntegerField(default=5, help_text="in kilometers")
    timestamp = models.DateTimeField(auto_now=True)

    gis = gis_models.GeoManager()
    objects = models.Manager()

    class Meta:
        """Set configurations for the Property model."""
        verbose_name = _("Property")
        verbose_name_plural = _('Properties')

    def __str__(self):
        return self.title
