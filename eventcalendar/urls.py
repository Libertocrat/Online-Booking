from django.urls import path
from . import views

app_name = "eventcalendar"
urlpatterns = [
    path('', views.index, name='index'), # app-domain.com/
    path('calendar/<int:year>/<int:month>', views.calendar_month, name='calendar_month'), # app-domain.com/calendar/*year/*month (POST)
    path('calendar/<int:year>/<int:month>/<int:day>', views.calendar_day, name='calendar_day'), # app-domain.com/calendar/*year/*month/*day (POST)
    path('calendar/request_appointment/', views.request_appointment, name='request_appointment') # app-domain.com/calendar/request_appointment (POST)
]