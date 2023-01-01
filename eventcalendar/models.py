from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import EmailValidator, MaxValueValidator, MinValueValidator, MinLengthValidator, MaxLengthValidator
from django.core.exceptions import ValidationError
from django.utils.html import escape # Escape input fields against html, javascript or malicious code
import pytz # Manage time zones
import re # Use REGEX


# Custom validators

def validate_phone(value):
    if not re.match(r'^\(\d{3}\)\s\d{3}-\d{4}$', value):
        raise ValidationError('Phone number must be in the format (XXX) XXX-XXXX')

def validate_timezone(value):
    if value not in pytz.all_timezones:
        raise ValidationError('Time zone is invalid.')


# Create your models here.


# User model
class User(AbstractUser):
    pass

    # Relationships:
    # businesses: defined in Business

    # Model fields
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    # User profile info
    email = models.EmailField(max_length=128, unique=True, blank=True, validators=[EmailValidator])
    #phone must have this format: (xxx) xxx-xxxx. Check that before saving or updating it
    phone = models.CharField(max_length=14, unique=True, blank=False, validators=[validate_phone])
    name = models.CharField(max_length=64, unique=False, blank=False)

    def __str__(self):
        return self.username

    def clean(self):
        # Sanitize fields sent by the front-end
        self.name = escape(self.name)
        self.email = escape(self.email)
        self.phone = escape(self.phone)


# Business model
class Business(models.Model):

    # Relationships
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name="businesses")
    # services: defined in Service
    # customers: defined in Customer
    # appointments: defined in Appointment

    # Model fields
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    # Business general info
    name = models.CharField(max_length=64, unique=True, blank=False)
    brand_name = models.CharField(max_length=64, unique=False, blank=False, default=name)
    tagline = models.CharField(max_length=128, blank=True)
    description = models.TextField(max_length=256, blank=True)
    time_zone = models.CharField(
        default='UTC',
        max_length=255,
        unique=True,
        blank=False,
        choices=[(tz, tz) for tz in pytz.all_timezones],
        validators=[MaxLengthValidator(255), validate_timezone],
    )

    # Business contact info
    email = models.EmailField(max_length=128, unique=True, blank=False, validators=[EmailValidator])
    #phone must have this format: (xxx) xxx-xxxx. Check that before saving or updating it
    phone = models.CharField(max_length=14, unique=True, blank=False, validators=[validate_phone])
    website = models.URLField(max_length=200, unique=True, blank=False)

    # Business address
    street = models.CharField(max_length=128, unique=False, blank=False)
    city = models.CharField(max_length=64, unique=False, blank=False)
    state = models.CharField(max_length=64, unique=False, blank=False)
    country = models.CharField(max_length=64, unique=False, blank=False)
    postal_code = models.PositiveIntegerField(unique=False, blank=False)

    # Business working schedule
    open_hour = models.TimeField()
    close_hour = models.TimeField()
    open_hour_weekend = models.TimeField()
    close_hour_weekend = models.TimeField()
    open_on_sunday = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def clean(self):
        # Sanitize all text-based fields
        self.name = escape(self.name)
        self.tagline = escape(self.tagline)
        self.description = escape(self.description)
        self.phone = escape(self.phone)
        self.street = escape(self.street)
        self.city = escape(self.city)
        self.state = escape(self.state)
        self.country = escape(self.country)
        self.postal_code = escape(self.postal_code)

# Service model
class Service(models.Model):

    # Relationships
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="services")

    # Model fields
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    # Service general fields
    name = models.CharField(max_length=64, unique=True, blank=False)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=False)
    duration = models.IntegerField(default=60, blank=False, validators=[MinValueValidator(1)]) # In minutes
    description = models.TextField(max_length=256, blank=True)

    def __str__(self):
        return self.name + " - $" + str(self.price)

    def clean(self):
        # Sanitize all non-auto fields
        self.name = escape(self.name)
        self.price = escape(self.price)
        self.duration = escape(self.duration)
        self.description = escape(self.description)


# Customer model
class Customer(models.Model):

    # Relationships
    suppliers = models.ManyToManyField(Business, blank=False, related_name="customers")
    # appointments: defined in Appointment

    # Model fields
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    # Customer fields
    #phone must have this format: (xxx) xxx-xxxx. Check that before saving or updating it
    phone = models.CharField(max_length=14, unique=True, blank=False, validators=[validate_phone])
    name = models.CharField(max_length=64, blank=False)

    def __str__(self):
        return self.name + " - " + self.phone

    def clean(self):
        # Sanitize fields recieved from the front-end
        self.name = escape(self.name)
        self.phone = escape(self.phone)


# Appointment model
class Appointment(models.Model):

    # Relationships: service, customer
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, related_name="appointments")
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, related_name="appointments")
    business = models.ForeignKey(Business, on_delete=models.SET_NULL, null=True, related_name="appointments")

    # Model fields
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    # Appointment general fields
    # (Even though this data can be accessed through relationships, it's registered to keep a history log)
    service_name = models.CharField(max_length=64, blank=True, editable=False)
    service_price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, editable=False)
    customer_phone = models.CharField(max_length=14, blank=True, editable=False, validators=[validate_phone])
    customer_name = models.CharField(max_length=64, blank=True, editable=False)

    # Appointment time fields
    day = models.DateField(blank=False)
    start_hour = models.TimeField(blank=False)
    end_hour = models.TimeField(blank=False)

    # Appointment status fields
    STATUS_NEW = 0
    STATUS_CONFIRMED = 1
    STATUS_COMPLETED = 2
    STATUS_MISSED = 3
    STATUS_REJECTED = 4
    STATUS_BUSINESS_CANCELLED = 5
    STATUS_CUSTOMER_CANCELLED = 6

    APPOINTMENT_STATUSES = [
        (STATUS_NEW, 'New'),
        (STATUS_CONFIRMED, 'Confirmed'),
        (STATUS_COMPLETED, 'Completed'),
        (STATUS_MISSED, 'Missed'),
        (STATUS_REJECTED, 'Rejected'),
        (STATUS_BUSINESS_CANCELLED, 'Cancelled (By Business)'),
        (STATUS_CUSTOMER_CANCELLED, 'Cancelled (By Customer)'),
    ]

    status = models.IntegerField(default=STATUS_NEW, blank=False, choices=APPOINTMENT_STATUSES)
    is_confirmed = models.BooleanField(default=False, blank=False)

    def __str__(self):
        return self.service_name + " for " + self.customer_name

    def clean(self):
        # Sanitize fields recieved from the front-end
        self.day = escape(self.day)
        self.start_hour = escape(self.start_hour)
        self.end_hour = escape(self.end_hour)