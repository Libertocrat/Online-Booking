import datetime
import time
import calendar
import pytz # Manage time zones

# MODEL IMPORTS
from .models import User, Business, Service, Customer, Appointment


# GET_MAIN_BUSINESS
def get_main_business(business_index = 0):

   return Business.objects.all()[business_index]

# GET_DAY_SCHEDULE
# Builds the day schedule for a given service at a given day
# It returns an array containing the time blocks for that day, reflecting blocked & available slots
# Confirmed & requested appointments are passed as "blocked" timeblocks
def get_day_schedule(service_id, year, month, day):

   # Get main business
   business = Business.objects.get(pk=1)
   time_zone = pytz.timezone(business.time_zone) # Business local time zone
   # Current DateTime at business time zone
   now = datetime.datetime.now(tz=time_zone)

   # Requested day
   req_day =  datetime.date(year,month,day)
   weekday_num = int(req_day.strftime("%w"))

   # Get requested service
   service = Service.objects.get(pk=service_id)

   # Get already booked or requested appointments
   blocked_appointments = Appointment.objects.filter(service=service, day=req_day, status__range=(0, 1)).order_by('start_hour')

   # CHECK WORKING HOURS
   if (weekday_num == 6 or weekday_num == 0):
      open_hour =  get_datetime(req_day, business.open_hour_weekend, time_zone)
      close_hour = get_datetime(req_day, business.close_hour_weekend, time_zone)
   else:
      open_hour = get_datetime(req_day, business.open_hour, time_zone)
      close_hour = get_datetime(req_day, business.close_hour, time_zone)

   # Check if it's sunday and closed
   if (weekday_num == 0 and not business.open_on_sunday):
      # Return a single blocked timeblock
      return [{"id" : 1, "status" : "blocked", "relHeight" : 10, "startHour": open_hour.strftime("%I:%M %p"), "endHour" : close_hour.strftime("%I:%M %p")}]

   # ARRANGE TIME SLOTS
   time_schedule = []

   timeblock_index = 0
   appointment_index = 0
   start_timeslot = get_datetime(req_day, open_hour, time_zone)
   end_timeslot = start_timeslot + datetime.timedelta(minutes=service.duration)

   while (end_timeslot <= close_hour):

      if appointment_index < len(blocked_appointments):
         appointment = blocked_appointments[appointment_index]
         next_appointment_start = get_datetime(req_day, appointment.start_hour, time_zone)
      else:
         next_appointment_start = None

      # Check if there's already an appointment reserving current time slot
      if (next_appointment_start != None and end_timeslot > next_appointment_start):

         # Check if appointment is reserving current time slot
         appointment = blocked_appointments[appointment_index]

         start_hour = start_timeslot.strftime("%I:%M %p")
         end_hour = appointment.end_hour.strftime("%I:%M %p")
         timeslot = {"id" : timeblock_index + 1, "status" : "blocked", "relHeight" : 1, "startHour": start_hour, "endHour" : end_hour}

         start_timeslot = get_datetime(req_day, appointment.end_hour, time_zone)
         appointment_index += 1
      else:
         start_hour = start_timeslot.strftime("%I:%M %p")
         end_hour = end_timeslot.strftime("%I:%M %p")

         # Check if time slot is in the future (set status to "active") or has passed (status to "blocked")
         status = "active" if start_timeslot > now else "blocked"
         timeslot = {"id" : timeblock_index + 1, "status" : status, "relHeight" : 1, "startHour": start_hour, "endHour" : end_hour}
         start_timeslot = end_timeslot

      # Compute the end of the next time slot
      end_timeslot = start_timeslot + datetime.timedelta(minutes=service.duration)
      # Append the current time slot to the schedule
      time_schedule.append(timeslot)
      timeblock_index += 1

   """
   while (end_timeslot <= close_hour):

      start_hour = start_timeslot.strftime("%I:%M %p")
      end_hour = end_timeslot.strftime("%I:%M %p")
      timeslot = {"id" : timeblock_index + 1, "status" : "active", "relHeight" : 1, "startHour": start_hour, "endHour" : end_hour}
      time_schedule.append(timeslot)

      start_timeslot = end_timeslot
      end_timeslot = start_timeslot + datetime.timedelta(minutes=service.duration)
      timeblock_index += 1
   """

   return time_schedule


# GET_DATETIME
# Returns an aware datetime object by adding the "hour" time object to the "day" date object, at "time_zone" local time
def get_datetime(day, hour, time_zone):

   date_time_unaware = datetime.datetime(day.year,day.month,day.day,hour.hour,hour.minute, 0)
   date_time_aware = date_time_unaware.replace(tzinfo=time_zone)
   return date_time_aware

# PARSE_TIME
def parse_time(str_time, format):

   parsed_time = datetime.datetime.strptime(str_time, format)
   time_obj = datetime.time(parsed_time.hour, parsed_time.minute, parsed_time.second)
   return time_obj