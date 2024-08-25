const calendarContainer = document.getElementById('calendar-container');
const eventInfo = document.getElementById('event-info');

// Define special events
const events = {
    "2024-08-14": "holiday",
    "2024-08-25": "holiday",
    "2024-10-01": "holiday",
    "2024-10-16": "holiday",
    "2024-10-27": "holiday",
    "2024-10-28": "holiday",
    "2024-10-29": "holiday",
    "2024-10-30": "holiday",
    "2024-10-31": "holiday",
    "2024-11-17": "holiday",
    "2024-11-07": "fes",
    "2024-11-08": "fes",
    "2024-11-09": "fes",
    "2024-10-17": "sports-week",
    "2024-10-18": "sports-week",
    "2024-10-19": "sports-week",
    "2024-09-10": "exams",
    "2024-09-11": "exams",
    "2024-09-12": "exams",
    "2024-09-13": "exams",
    "2024-11-18": "exams",
    "2024-11-19": "exams",
    "2024-11-20": "exams",
    "2024-11-21": "exams",
    "2024-11-22": "exams",
    "2024-11-23": "exams",
    "2024-11-24": "exams",
    "2024-11-25": "exams",
    "2024-11-26": "exams",
    "2024-11-27": "exams",
    "2024-11-28": "exams",
};

// Create an array of months to display
const monthsToShow = [
    { month: 6, year: 2024, startDay: 22 }, // July 2024 starting from 22nd
    { month: 7, year: 2024 }, // August 2024
    { month: 8, year: 2024 }, // September 2024
    { month: 9, year: 2024 }, // October 2024
    { month: 10, year: 2024 }, // November 2024
    { month: 11, year: 2024 } // December 2024
];

function generateCalendar() {
    const today = new Date();

    monthsToShow.forEach(({ month, year, startDay }) => {
        const firstDay = startDay || 1;
        const monthStart = new Date(year, month, firstDay);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');

        // Create and append month name header
        const monthHeader = document.createElement('div');
        monthHeader.classList.add('month-header');
        monthHeader.innerText = `${monthStart.toLocaleString('default', { month: 'long' })} ${year}`;
        monthDiv.appendChild(monthHeader);

        // Create grid for days
        const dayGrid = document.createElement('div');
        dayGrid.classList.add('day-grid');

        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const headerCell = document.createElement('div');
            headerCell.classList.add('day-cell', 'day-header');
            headerCell.innerText = day;
            dayGrid.appendChild(headerCell);
        });

        // Add empty cells for days before the first day of the month
        const firstDayOfWeek = monthStart.getDay();
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day-cell');
            dayGrid.appendChild(emptyCell);
        }

        // Add actual day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');

            // Add classes based on event type and weekends
            const dateString = date.toISOString().split('T')[0];
            if (events[dateString]) {
                dayCell.classList.add(events[dateString]);

                // Create and append tooltip for special days
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.innerText = `${events[dateString]} - ${dateString}`;
                dayCell.appendChild(tooltip);
            }

            let specialStartDate = new Date('2024-07-21');  

            if (date > specialStartDate) {
                if (date.toDateString() === today.toDateString()) {
                    dayCell.classList.add('today');
                } else if (date < today && date > specialStartDate) {
                    dayCell.classList.add('past-day');
                } else if (date.getDay() === 6 || date.getDay() === 0) { // Saturday or Sunday that is not in the past
                    dayCell.classList.add('holiday');
                }
            }

            dayCell.innerText = day; // Ensure only the day is displayed
            dayGrid.appendChild(dayCell);
        }

        monthDiv.appendChild(dayGrid);
        calendarContainer.appendChild(monthDiv);
    });

    calculateDaysLeft();
    // Update the event info with days passed excluding special events
    const daysPassed = countDaysPassed(startDate, events);
}


function calculateDaysLeft() {
    const today = new Date();
    const futureEvents = Object.keys(events).filter(date => new Date(date) > today);

    if (futureEvents.length > 0) {
        const nextEventDate = new Date(futureEvents[0]);
        const daysLeft = Math.ceil((nextEventDate - today) / (1000 * 60 * 60 * 24));
        // eventInfo.innerText = `Next special event is in ${daysLeft} days.`;
    } else {
        eventInfo.innerText = "No more special events.";
    }
}

function countDaysPassed(startDate, events) {
    const today = new Date();
    let count = 0;

    // Iterate from the start date to today
    let currentDate = new Date(startDate);
    while (currentDate <= today) {
        const dateString = currentDate.toISOString().split('T')[0];
        // Check if the date is not a special event
        if (!events[dateString]) {
            count++;
        }
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
}

const startDate = '2024-07-22'; // Starting from July 22, 2024
const daysPassed = countDaysPassed(startDate, events);
console.log(`Days passed since ${startDate} (excluding special events): ${daysPassed}`);


generateCalendar();
