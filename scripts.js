document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('courseForm');
    const scheduleDisplay = document.getElementById('scheduleDisplay');
    const conflictDisplay = document.getElementById('conflictDisplay');
    let schedule = [];
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const courseName = document.getElementById('courseName').value;
      const courseDay = document.getElementById('courseDay').value;
      const courseStartTime = document.getElementById('courseStartTime').value;
      const courseEndTime = document.getElementById('courseEndTime').value;
      
      const course = createCourse(courseName, courseDay, courseStartTime, courseEndTime);
      schedule.push(course);
      displaySchedule(schedule, scheduleDisplay);
      
      const conflicts = detectConflicts(schedule);
      displayConflicts(conflicts, conflictDisplay);
    });
  });
  
  function createCourse(name, day, startTime, endTime) {
    return { name, day, startTime, endTime };
  }
  
  function displaySchedule(schedule, displayElement) {
    displayElement.innerHTML = '';
    schedule.forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.classList.add('course-item');
      courseElement.textContent = `${course.name} - ${course.day} ${course.startTime} to ${course.endTime}`;
      displayElement.appendChild(courseElement);
    });
  }
  
  function detectConflicts(schedule) {
    // ... implement your conflict detection logic here
    return []; // return an array of conflict messages
  }
  
  function displayConflicts(conflicts, displayElement) {
    displayElement.innerHTML = '';
    conflicts.forEach(conflict => {
      const conflictElement = document.createElement('div');
      conflictElement.classList.add('conflict');
      conflictElement.textContent = conflict;
      displayElement.appendChild(conflictElement);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('courseForm');
    const scheduleDisplay = document.getElementById('scheduleDisplay');
    const conflictDisplay = document.getElementById('conflictDisplay');
    let schedule = [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const courseName = document.getElementById('courseName').value;
        const courseDay = document.getElementById('courseDay').value;
        const courseStartTime = document.getElementById('courseStartTime').value;
        const courseEndTime = document.getElementById('courseEndTime').value;

        const course = createCourse(courseName, courseDay, courseStartTime, courseEndTime);
        const conflictMessages = detectConflicts(course, schedule);
        
        if (conflictMessages.length === 0) {
            schedule.push(course);
            displaySchedule(schedule, scheduleDisplay);
        }

        displayConflicts(conflictMessages, conflictDisplay);
    });
});

function createCourse(name, day, startTime, endTime) {
    return { name, day, startTime, endTime };
}

function displaySchedule(schedule, displayElement) {
    displayElement.innerHTML = '';
    schedule.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course-item');
        courseElement.textContent = `${course.name} - ${course.day} ${course.startTime} to ${course.endTime}`;
        displayElement.appendChild(courseElement);
    });
}

function detectConflicts(newCourse, existingCourses) {
    let conflicts = [];
    existingCourses.forEach(course => {
        if (newCourse.day === course.day && timeOverlap(newCourse, course)) {
            conflicts.push(`Conflict: ${newCourse.name} clashes with ${course.name}`);
        }
    });
    return conflicts;
}

function timeOverlap(courseA, courseB) {
    const startA = parseTime(courseA.startTime);
    const endA = parseTime(courseA.endTime);
    const startB = parseTime(courseB.startTime);
    const endB = parseTime(courseB.endTime);
    return startA < endB && startB < endA;
}

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes; // Convert time to minutes for easy comparison
}

function displayConflicts(conflicts, displayElement) {
    displayElement.innerHTML = ''; // Clear any previous conflicts
    if (conflicts.length === 0) {
        displayElement.innerHTML = '<div class="no-conflict">No conflicts detected!</div>';
    } else {
        conflicts.forEach(conflict => {
            const conflictElement = document.createElement('div');
            conflictElement.classList.add('conflict');
            conflictElement.textContent = conflict;
            displayElement.appendChild(conflictElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('courseForm');
    const scheduleDisplay = document.getElementById('scheduleDisplay');
    const conflictDisplay = document.getElementById('conflictDisplay');
    let schedule = [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const courseName = document.getElementById('courseName').value;
        const courseDay = document.getElementById('courseDay').value.toUpperCase();
        const courseStartTime = document.getElementById('courseStartTime').value;
        const courseEndTime = document.getElementById('courseEndTime').value;

        const course = createCourse(courseName, courseDay, courseStartTime, courseEndTime);
        const conflictMessages = detectConflicts(course, schedule);

        if (conflictMessages.length === 0) {
            schedule.push(course);
            displayFullSchedule(schedule, scheduleDisplay);
        }

        displayConflicts(conflictMessages, conflictDisplay);
    });
});

function createCourse(name, day, startTime, endTime) {
    return { name, day, startTime, endTime };
}

// This function will generate a grid for the 7-day schedule
function displayFullSchedule(schedule, displayElement) {
    const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    displayElement.innerHTML = '<div class="schedule-grid">';

    weekDays.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('schedule-day');
        dayColumn.innerHTML = `<div class="schedule-day-name">${day}</div>`;
        schedule.filter(course => course.day === day).forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('schedule-course');
            courseElement.textContent = `${course.name}: ${course.startTime} - ${course.endTime}`;
            dayColumn.appendChild(courseElement);
        });
        displayElement.firstChild.appendChild(dayColumn);
    });

    displayElement.innerHTML += '</div>';
}

// ... keep the rest of the functions (detectConflicts, timeOverlap, parseTime, displayConflicts) as before


  