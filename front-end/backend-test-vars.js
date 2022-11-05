
const calendarMonth = {
    titleMonth: "November",
    titleYear: "2022",
    currentDate: "03-11-2022",
    startDate: "30-10-2022",
    endDate: "03-12-2022",
    weekDayLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthDays: 
    [
        [
            {id: 1, weekNum: 1, date: "30-10-2022", day: "30", month: "10", year: "2022", weekDay: "Sunday", status: "inactive"},
            {id: 2, weekNum: 1, date: "31-10-2022", day: "31", month: "10", year: "2022", weekDay: "Monday", status: "inactive"},
            {id: 3, weekNum: 1, date: "01-11-2022", day: "01", month: "11", year: "2022", weekDay: "Tuesday", status: "inactive"},
            {id: 4, weekNum: 1, date: "02-11-2022", day: "02", month: "11", year: "2022", weekDay: "Wednesday", status: "inactive"},
            {id: 5, weekNum: 1, date: "03-11-2022", day: "03", month: "11", year: "2022", weekDay: "Thursday", status: "inactive"},
            {id: 6, weekNum: 1, date: "04-11-2022", day: "04", month: "11", year: "2022", weekDay: "Friday", status: "full"},
            {id: 7, weekNum: 1, date: "05-11-2022", day: "05", month: "11", year: "2022", weekDay: "Saturday", status: "full"}
        ],

        [
            {id: 8, weekNum: 2, date: "06-11-2022", day: "06", month: "11", year: "2022", weekDay: "Sunday", status: "inactive"},
            {id: 9, weekNum: 2, date: "07-11-2022", day: "07", month: "11", year: "2022", weekDay: "Monday", status: "active"},
            {id: 10, weekNum: 2, date: "08-11-2022", day: "08", month: "11", year: "2022", weekDay: "Tuesday", status: "active"},
            {id: 11, weekNum: 2, date: "09-11-2022", day: "09", month: "11", year: "2022", weekDay: "Wednesday", status: "active"},
            {id: 12, weekNum: 2, date: "10-11-2022", day: "10", month: "11", year: "2022", weekDay: "Thursday", status: "active"},
            {id: 13, weekNum: 2, date: "11-11-2022", day: "11", month: "11", year: "2022", weekDay: "Friday", status: "full"},
            {id: 14, weekNum: 2, date: "12-11-2022", day: "12", month: "11", year: "2022", weekDay: "Saturday", status: "active"}
        ],

        [
            {id: 15, weekNum: 3, date: "13-11-2022", day: "13", month: "11", year: "2022", weekDay: "Sunday", status: "inactive"},
            {id: 16, weekNum: 3, date: "14-11-2022", day: "14", month: "11", year: "2022", weekDay: "Monday", status: "active"},
            {id: 17, weekNum: 3, date: "15-11-2022", day: "15", month: "11", year: "2022", weekDay: "Tuesday", status: "active"},
            {id: 18, weekNum: 3, date: "16-11-2022", day: "16", month: "11", year: "2022", weekDay: "Wednesday", status: "active"},
            {id: 19, weekNum: 3, date: "17-11-2022", day: "17", month: "11", year: "2022", weekDay: "Thursday", status: "active"},
            {id: 20, weekNum: 3, date: "18-11-2022", day: "18", month: "11", year: "2022", weekDay: "Friday", status: "active"},
            {id: 21, weekNum: 3, date: "19-11-2022", day: "19", month: "11", year: "2022", weekDay: "Saturday", status: "active"}
        ],

        [
            {id: 22, weekNum: 4, date: "20-10-2022", day: "20", month: "11", year: "2022", weekDay: "Sunday", status: "inactive"},
            {id: 23, weekNum: 4, date: "21-10-2022", day: "21", month: "11", year: "2022", weekDay: "Monday", status: "active"},
            {id: 24, weekNum: 4, date: "22-11-2022", day: "22", month: "11", year: "2022", weekDay: "Tuesday", status: "active"},
            {id: 25, weekNum: 4, date: "23-11-2022", day: "23", month: "11", year: "2022", weekDay: "Wednesday", status: "active"},
            {id: 26, weekNum: 4, date: "24-11-2022", day: "24", month: "11", year: "2022", weekDay: "Thursday", status: "active"},
            {id: 27, weekNum: 4, date: "25-11-2022", day: "25", month: "11", year: "2022", weekDay: "Friday", status: "active"},
            {id: 28, weekNum: 4, date: "26-11-2022", day: "26", month: "11", year: "2022", weekDay: "Saturday", status: "active"}
        ],

        [
            {id: 29, weekNum: 5, date: "27-10-2022", day: "27", month: "11", year: "2022", weekDay: "Sunday", status: "inactive"},
            {id: 30, weekNum: 5, date: "28-10-2022", day: "28", month: "11", year: "2022", weekDay: "Monday", status: "active"},
            {id: 31, weekNum: 5, date: "29-11-2022", day: "29", month: "11", year: "2022", weekDay: "Tuesday", status: "active"},
            {id: 32, weekNum: 5, date: "30-11-2022", day: "30", month: "11", year: "2022", weekDay: "Wednesday", status: "active"},
            {id: 33, weekNum: 5, date: "01-12-2022", day: "01", month: "12", year: "2022", weekDay: "Thursday", status: "active"},
            {id: 34, weekNum: 5, date: "02-12-2022", day: "02", month: "12", year: "2022", weekDay: "Friday", status: "active"},
            {id: 35, weekNum: 5, date: "03-12-2022", day: "03", month: "12", year: "2022", weekDay: "Saturday", status: "active"}
        ]

    ]
};

export default calendarMonth;

/* Back test (python) test object

        [

            [
                {"id": 1, "weekNum": 1, "date": "30-10-2022", "day": "30", "month": "10", "year": "2022", "weekDay": "Sunday", "status": "inactive"},
                {"id": 2, "weekNum": 1, "date": "31-10-2022", "day": "31", "month": "10", "year": "2022", "weekDay": "Monday", "status": "inactive"},
                {"id": 3, "weekNum": 1, "date": "01-11-2022", "day": "01", "month": "11", "year": "2022", "weekDay": "Tuesday", "status": "inactive"},
                {"id": 4, "weekNum": 1, "date": "02-11-2022", "day": "02", "month": "11", "year": "2022", "weekDay": "Wednesday", "status": "inactive"},
                {"id": 5, "weekNum": 1, "date": "03-11-2022", "day": "03", "month": "11", "year": "2022", "weekDay": "Thursday", "status": "inactive"},
                {"id": 6, "weekNum": 1, "date": "04-11-2022", "day": "04", "month": "11", "year": "2022", "weekDay": "Friday", "status": "full"},
                {"id": 7, "weekNum": 1, "date": "05-11-2022", "day": "05", "month": "11", "year": "2022", "weekDay": "Saturday", "status": "full"}
            ],

            [
                {"id": 8, "weekNum": 2, "date": "06-11-2022", "day": "06", "month": "11", "year": "2022", "weekDay": "Sunday", "status": "inactive"},
                {"id": 9, "weekNum": 2, "date": "07-11-2022", "day": "07", "month": "11", "year": "2022", "weekDay": "Monday", "status": "active"},
                {"id": 10, "weekNum": 2, "date": "08-11-2022", "day": "08", "month": "11", "year": "2022", "weekDay": "Tuesday", "status": "active"},
                {"id": 11, "weekNum": 2, "date": "09-11-2022", "day": "09", "month": "11", "year": "2022", "weekDay": "Wednesday", "status": "active"},
                {"id": 12, "weekNum": 2, "date": "10-11-2022", "day": "10", "month": "11", "year": "2022", "weekDay": "Thursday", "status": "active"},
                {"id": 13, "weekNum": 2, "date": "11-11-2022", "day": "11", "month": "11", "year": "2022", "weekDay": "Friday", "status": "full"},
                {"id": 14, "weekNum": 2, "date": "12-11-2022", "day": "12", "month": "11", "year": "2022", "weekDay": "Saturday", "status": "active"}
            ],

            [
                {"id": 15, "weekNum": 3, "date": "13-11-2022", "day": "13", "month": "11", "year": "2022", "weekDay": "Sunday", "status": "inactive"},
                {"id": 16, "weekNum": 3, "date": "14-11-2022", "day": "14", "month": "11", "year": "2022", "weekDay": "Monday", "status": "active"},
                {"id": 17, "weekNum": 3, "date": "15-11-2022", "day": "15", "month": "11", "year": "2022", "weekDay": "Tuesday", "status": "active"},
                {"id": 18, "weekNum": 3, "date": "16-11-2022", "day": "16", "month": "11", "year": "2022", "weekDay": "Wednesday", "status": "active"},
                {"id": 19, "weekNum": 3, "date": "17-11-2022", "day": "17", "month": "11", "year": "2022", "weekDay": "Thursday", "status": "active"},
                {"id": 20, "weekNum": 3, "date": "18-11-2022", "day": "18", "month": "11", "year": "2022", "weekDay": "Friday", "status": "active"},
                {"id": 21, "weekNum": 3, "date": "19-11-2022", "day": "19", "month": "11", "year": "2022", "weekDay": "Saturday", "status": "active"}
            ],

            [
                {"id": 22, "weekNum": 4, "date": "20-10-2022", "day": "20", "month": "11", "year": "2022", "weekDay": "Sunday", "status": "inactive"},
                {"id": 23, "weekNum": 4, "date": "21-10-2022", "day": "21", "month": "11", "year": "2022", "weekDay": "Monday", "status": "active"},
                {"id": 24, "weekNum": 4, "date": "22-11-2022", "day": "22", "month": "11", "year": "2022", "weekDay": "Tuesday", "status": "active"},
                {"id": 25, "weekNum": 4, "date": "23-11-2022", "day": "23", "month": "11", "year": "2022", "weekDay": "Wednesday", "status": "active"},
                {"id": 26, "weekNum": 4, "date": "24-11-2022", "day": "24", "month": "11", "year": "2022", "weekDay": "Thursday", "status": "active"},
                {"id": 27, "weekNum": 4, "date": "25-11-2022", "day": "25", "month": "11", "year": "2022", "weekDay": "Friday", "status": "active"},
                {"id": 28, "weekNum": 4, "date": "26-11-2022", "day": "26", "month": "11", "year": "2022", "weekDay": "Saturday", "status": "active"}
            ],

            [
                {"id": 29, "weekNum": 5, "date": "27-10-2022", "day": "27", "month": "11", "year": "2022", "weekDay": "Sunday", "status": "inactive"},
                {"id": 30, "weekNum": 5, "date": "28-10-2022", "day": "28", "month": "11", "year": "2022", "weekDay": "Monday", "status": "active"},
                {"id": 31, "weekNum": 5, "date": "29-11-2022", "day": "29", "month": "11", "year": "2022", "weekDay": "Tuesday", "status": "active"},
                {"id": 32, "weekNum": 5, "date": "30-11-2022", "day": "30", "month": "11", "year": "2022", "weekDay": "Wednesday", "status": "active"},
                {"id": 33, "weekNum": 5, "date": "01-12-2022", "day": "01", "month": "12", "year": "2022", "weekDay": "Thursday", "status": "active"},
                {"id": 34, "weekNum": 5, "date": "02-12-2022", "day": "02", "month": "12", "year": "2022", "weekDay": "Friday", "status": "active"},
                {"id": 35, "weekNum": 5, "date": "03-12-2022", "day": "03", "month": "12", "year": "2022", "weekDay": "Saturday", "status": "active"}
            ]
        ]

*/