from django.contrib import admin
from .models import User, Business, Service, Customer, Appointment

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ("pk", "username", "created", "last_modified", "name", "email", "phone")
    search_fields = ("name", "phone", "email")

class BusinessAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "email", "phone", "website", "time_zone", "open_hour", "close_hour", "open_hour_weekend", "close_hour_weekend", "open_on_sunday")

class ServiceAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "price", "duration", "description", "business")

class CustomerAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "phone")
    search_fields = ("name", "phone")

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("pk", "status", "service", "customer", "day", "start_hour", "end_hour")
    list_filter = ("status", "service")
    default_filters = {'status': 0}
    ordering = ("-day", "start_hour", "service")

admin.site.register(User, UserAdmin)
admin.site.register(Business, BusinessAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Appointment, AppointmentAdmin)