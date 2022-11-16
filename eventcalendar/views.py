from django.shortcuts import render
from django.urls import reverse # User added
from django.http import JsonResponse # User added
import json # User added
import datetime # User added
import calendar # User added

# Create your views here.

def calendar_month(request, year, month):

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
            status = "active" if (day >= today and int(weekday_num) != 0) else "inactive"
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
        #"startDate": month_calendar_days[0][0].date,
        #"endDate": month_calendar_days[4][6].date,
        "weekDayLabels": weekday_labels,
        "lastMonthUrl" : last_month_url,
        "nextMonthUrl" : next_month_url,
        "lastMonthDate" : last_month_date,
        "nextMonthDate" : next_month_date,
        "monthDays": month_calendar_days
    }

    if request.method == "POST":

        response = {"success": True, "calendarMonth" : calendar_month}
        return JsonResponse(response);
       # return render(request, 'eventcalendar/calendarmonth.html', {
       #     "calendar_month" : calendar_month
        #})
    else:
        response = {"success": False, "message": "GET request isn't allowed on this endpoint, try POST"}
        return JsonResponse(response)

def calendar_day(request, year, month, day):

    if request.method == "POST":

        # Get requested day
        req_day =  datetime.date(year,month,day)
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

        # Assembly requested calendar day
        if req_day.strftime("%a") == "Sun":
            time_blocks = [
                {"id" : 1, "status" : "inactive", "relHeight" : 1, "startHour" : "", "endHour" : ""},
                {"id" : 2, "status" : "blocked", "relHeight" : 8, "startHour": "8:00am", "endHour" : "4:00pm"},
                {"id" : 3, "status" : "inactive", "relHeight" : 1, "startHour" : "", "endHour" : ""}
            ]
        elif req_day.strftime("%a") == "Sat":
            time_blocks = [
                {"id" : 1, "status" : "inactive", "relHeight" : 1, "startHour" : "", "endHour" : ""},
                {"id" : 2, "status" : "active", "relHeight" : 2, "startHour" : "8:00am", "endHour" : "10:00am"},
                {"id" : 3, "status" : "blocked", "relHeight" : 1, "startHour" : "10:00am", "endHour" : "11:00am"},
                {"id" : 4, "status" : "active", "relHeight" : 1, "startHour" : "11:00am", "endHour" : "12:00pm"},
                {"id" : 5, "status" : "active", "relHeight" : 1, "startHour" : "12:00pm", "endHour" : "1:00pm"},
                {"id" : 6, "status" : "inactive", "relHeight" : 4, "startHour" : "", "endHour" : ""}
            ]
        else:
            time_blocks = [
                {"id" : 1, "status" : "inactive", "relHeight" : 1, "startHour" : "", "endHour" : ""},
                {"id" : 2, "status" : "blocked", "relHeight" : 2, "startHour" : "8:00am", "endHour" : "10:00am"},
                {"id" : 3, "status" : "active", "relHeight" : 1, "startHour" : "10:00am", "endHour" : "11:00am"},
                {"id" : 4, "status" : "active", "relHeight" : 1, "startHour" : "11:00am", "endHour" : "12:00pm"},
                {"id" : 5, "status" : "active", "relHeight" : 1, "startHour" : "12:00pm", "endHour" : "1:00pm"},
                {"id" : 6, "status" : "blocked", "relHeight" : 1, "startHour" : "1:00pm", "endHour" : "2:00pm"},
                {"id" : 7, "status" : "active", "relHeight" : 2, "startHour" : "2:00pm", "endHour" : "4:00pm"},
                {"id" : 8, "status" : "inactive", "relHeight" : 1, "startHour" : "", "endHour" : ""}
            ]

        calendar_day = {

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

    if request.method == "POST":

        post_data = json.load(request)['data']

        # date = post_data.date
        # start_hour = post_data.startHour
        # end_hour = post_data.endHour
        # service_id = post_data.serviceId

        message = "The appointment request was successfully recieved"
        response = {"success": True, "message": message, "body": post_data}
        return JsonResponse(response)

    else:
        response = {"success": False, "message": "GET request isn't allowed on this endpoint, try POST"}
        return JsonResponse(response)
