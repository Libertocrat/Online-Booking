from django.shortcuts import render
import datetime # User added
import calendar # User added

# Create your views here.

def calendar_month(request, year, month):

    # Build calendar for requested month
    first_of_month = datetime.date(year,month,1)
    today = datetime.date.today()
    cal = calendar.Calendar(6)
    month_days = cal.monthdatescalendar(year, month)

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
            status = "active" if (day >= today) else "inactive"

            # Create & add current day object
            calendar_day = {"id": id, "weekNum": week_num, "date": date, "day": date_day, "month": date_month, "year": date_year, "weekDay": weekday, "weekDayNum": weekday_num, "status": status}
            week_days.append(calendar_day)
            id = id + 1
        
        # Add week into month calendar days object array
        month_calendar_days.append(week_days)
        week_num = 1


    calendar_month = {
        "titleMonth": first_of_month.strftime("%B"),
        "titleYear": first_of_month.strftime("%Y"),
        "currentDate": today,
        #"startDate": month_calendar_days[0][0].date,
        #"endDate": month_calendar_days[4][6].date,
        "weekDayLabels": weekday_labels,
        "monthDays": month_calendar_days
    }

    return render(request, 'eventcalendar/calendarmonth.html', {
        "calendar_month" : calendar_month
    })

def calendar_day(request, day_id):
    return render(request, 'eventcalendar/calendarday.html', {
        "day_id" : day_id
    })