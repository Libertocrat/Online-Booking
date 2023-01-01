from django.shortcuts import render
from django.urls import reverse # User added
from django.http import JsonResponse # User added
from django.core.exceptions import ValidationError # User added: manage model fields validation errors
import json # User added
import datetime # User added
import calendar # User added
import pytz # Manage time zones
import eventcalendar.helpers as h # User custom helper functions

# MODEL IMPORTS
from .models import User, Business, Service, Customer, Appointment

# Create your views here.

def index(request):

    # Prepare initial context
    business = Business.objects.get(pk=1)
    time_zone = pytz.timezone(business.time_zone) # Business local time zone
    now = datetime.datetime.now(tz=time_zone)

    # Get the service list, ordered by price
    service_list = Service.objects.filter(business=business).order_by('price')
    services = [{"value": "", "name": "-- Please choose a service --"}]
    for service in service_list:
        services.append({"value": service.pk, "name": service.name + " - $"+str(service.price)})

    business_address = {
        "street" : business.street,
        "city" : business.city,
        "state" : business.state,
        "postalCode": business.postal_code,
        "country": business.country}

    business_data = {
        "legalName": business.name,
        "brandName": business.brand_name,
        "tagline": business.tagline,
        "phone": business.phone,
        "email": business.email,
        "website": business.website,
        "address": business_address,
        "timeZone": business.time_zone,
        "now": str(now) }
    page_context = { "services": services, "business": business_data}

    return render(request, "index.html", {
        "page_context": page_context
    })

def calendar_month(request, year, month):

    # Get business object
    business = Business.objects.get(pk=1)

    # Build calendar for requested month
    first_of_month = datetime.date(year,month,1)
    today = datetime.date.today()
    cal = calendar.Calendar(6)
    month_days = cal.monthdatescalendar(year, month)

    # Set current month object
    month_date = {"year" : year, "month" : month}

    # Set last month url
    last_year = year
    last_month = month - 1
    if month == 1:
        last_year = year - 1
        last_month = 12
    last_month_url = reverse("eventcalendar:calendar_month", kwargs={"year" : last_year, "month": last_month})
    last_month_date = {"year" : last_year, "month" : last_month}

    # Set next month url
    next_year = year
    next_month = month + 1
    if month == 12:
        next_year = year + 1
        next_month = 1
    next_month_url = reverse("eventcalendar:calendar_month", kwargs={"year" : next_year, "month": next_month})
    next_month_date = {"year" : next_year, "month" : next_month}

    weekday_labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    month_calendar_days = []
    id = 1
    week_num = 1

    for week in month_days:
        # Create day list for each week
        week_days = []

        for day in week:
            # Add days for current week
            date_day = day.strftime("%d")
            date_month = day.strftime("%m")
            date_year = day.strftime("%Y")
            date = str(date_day) + str(date_month) + str(date_year)
            weekday = day.strftime("%a")
            weekday_num = day.strftime("%w")
            status = "active" if (day >= today and (int(weekday_num) != 0 or business.open_on_sunday)) else "inactive"
            is_today = (day == today)
            calendar_day_url = reverse("eventcalendar:calendar_day",
                                kwargs={"year" : int(date_year), "month" : int(date_month), "day" : int(date_day) })

            # Create & add current day object
            calendar_day = {"id": id, "dayUrl" : calendar_day_url, "weekNum": week_num, "date": date, "day": date_day, "month": date_month, "year": date_year, "weekDay": weekday, "weekDayNum": weekday_num, "status": status, "isToday": is_today}
            week_days.append(calendar_day)
            id = id + 1

        # Add week into month calendar days object array
        month_calendar_days.append(week_days)
        week_num = 1

    calendar_month = {
        "titleMonth": first_of_month.strftime("%B"),
        "titleYear": first_of_month.strftime("%Y"),
        "currentDate": today,
        "monthDate" : month_date,
        "weekDayLabels": weekday_labels,
        "lastMonthUrl" : last_month_url,
        "nextMonthUrl" : next_month_url,
        "lastMonthDate" : last_month_date,
        "nextMonthDate" : next_month_date,
        "monthDays": month_calendar_days
    }

    if request.method == "POST":

        try:
            post_data = json.load(request)['data']
        except:
            post_data = ""

        response = {"success": True, "calendarMonth" : calendar_month, "data": post_data}
        return JsonResponse(response);

    else:
        response = {"success": False, "message": "GET request isn't allowed on this endpoint, try POST"}
        return JsonResponse(response)

def calendar_day(request, year, month, day):

    if request.method == "POST":

        # Get requested service
        try:
            post_data = json.load(request)['data']
            service_id = int(post_data['service_id'])
        except:
            post_data = ""
            service_id = 1

        # Get requested day
        req_day =  datetime.date(year,month,day)
        day_date = {"year": year, "month": month, "day": day}
        last_day = req_day - datetime.timedelta(days=1)
        last_day_url =  reverse("eventcalendar:calendar_day",
                                kwargs={"year" : int(last_day.strftime("%Y")),
                                "month" : int(last_day.strftime("%m")),
                                "day" : int(last_day.strftime("%d")) })
        next_day = req_day + datetime.timedelta(days=1)
        next_day_url =  reverse("eventcalendar:calendar_day",
                                kwargs={"year" : int(next_day.strftime("%Y")),
                                "month" : int(next_day.strftime("%m")),
                                "day" : int(next_day.strftime("%d")) })

        # Assembly requested calendar day time blocks
        time_blocks = h.get_day_schedule(service_id, year, month, day)

        calendar_day = {
            "dayDate" : day_date,
            "weekDay" : req_day.strftime("%a"),
            "day" : req_day.strftime("%d"),
            "month" : req_day.strftime("%m"),
            "year" : req_day.strftime("%Y"),
            "monthName" : req_day.strftime("%b"),
            "lastDayUrl" : last_day_url,
            "nextDayUrl" : next_day_url,
            "timeBlocks" : time_blocks
        }

        response = {"success": True, "calendarDay" : calendar_day}
        return JsonResponse(response)
    else:
        response = {"success": False, "message": "GET request isn't allowed on this endpoint, try POST"}
        return JsonResponse(response)


def request_appointment(request):

    # The only allowed method is POST
    if request.method == "POST":

        # Get posted data
        post_data = json.load(request)['data']

        # time-block: post_data.timeblock
            # day = timeblock.dayDate
            # start_hour = timeblock.startHour
            # end_hour = timeblock.endHour
            # status = timeblock.status (active, blocked or inactive)
        # service_id = post_data.service-value
        # customer.name = post_data.name
        # customer.phone = post_data.phone

        try:
            # GET POST INFO
            customer_name = post_data['name']
            customer_phone = post_data['phone']
            service_id = int(post_data['service-value'])
            time_block = post_data['timeblock']

            day_date = time_block['dayDate']
            day = datetime.date(day_date['year'],day_date['month'],day_date['day'])
            start_hour = h.parse_time(time_block['startHour'],"%I:%M %p")
            end_hour = h.parse_time(time_block['endHour'],"%I:%M %p")

            # GET/CREATE RELATED MODELS

            # Get business object
            try:
                business = h.get_main_business()
            except:
                # Respond with an error message and status
                message = "No business was found. Please contact the administrator." + e
                response = {"success": False, "message": message, "body": post_data}
                return JsonResponse(response)

            # Get service
            try:
                service = Service.objects.get(pk=service_id)
            except:
                # Respond with an error message and status
                message = "Service with id=" + str(service_id) + " wasn't found"
                response = {"success": False, "message": message, "body": post_data}
                return JsonResponse(response)

            # Create/update customer

            # Check if there's already a customer with the entered phone number
            customers = Customer.objects.filter(phone=customer_phone)

            if len(customers) > 0:
                # Get the first result (should be the only, since "phone" is a unique field)
                customer = customers[0]
                # Update customer name
                customer.name = customer_name
            else:
                # Create a new customer, since no one has the entered phone
                customer = Customer(name=customer_name, phone=customer_phone)

            # Save/update customer
            try:
                # Check field validations
                customer.full_clean()
                customer.save()

                # Add main business to customer's supplier list
                customer.suppliers.add(business)
            except ValidationError as e:
                # Respond with an error message and status
                message = "An error has ocurred:\n" + str(e)
                response = {"success": False, "message": message, "body": post_data}
                return JsonResponse(response)

            # Create appointment
            appointment = Appointment(service=service, customer=customer, business=business,
            day=day, start_hour=start_hour, end_hour=end_hour,
            service_name=service.name, service_price=service.price,
            customer_phone=customer.phone, customer_name=customer.name)

            # Save appointment
            try:
                # Check field validations
                appointment.full_clean()
                appointment.save()
            except ValidationError as e:
                # Respond with an error message and status
                message = "An error has ocurred:\n" + str(e)
                response = {"success": False, "message": message, "body": post_data}
                return JsonResponse(response)

            message = "Your request was successfully received.\nWe'll contact you very soon."
            response = {"success": True, "message": message, "body": post_data}
            return JsonResponse(response)

        except:
            message = "An error has ocurred, please contact the web administrator."
            response = {"success": False, "message": message, "body": post_data}
            return JsonResponse(response)

    else:
        response = {"success": False, "message": "GET request isn't allowed on this endpoint, try POST."}
        return JsonResponse(response)
