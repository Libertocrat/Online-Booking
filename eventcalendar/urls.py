from django.urls import path
from . import views

app_name = "eventcalendar"
urlpatterns = [
    path('<int:year>/<int:month>', views.calendar_month, name='calendar_month'), # app-domain.com/calendar/year/month
    path('day/<int:day_id>', views.calendar_day, name='calendar_day') # app-domain.com/calendar/day/id
]