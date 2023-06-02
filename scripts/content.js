import {getExistingLessons, getTimetableAsync} from './utils.js';

// Get timetable data
const timetable = await getTimetableAsync();
debugger

// Get group name from #main_container > div > div.col-xs-12.col-sm-9.col-md-10.col-lg-10.fluid-print > div > div.row > div.col-lg-12 > h4 > span:nth-child(1)
const groupName = document.querySelector('#main_container > div > div.col-xs-12.col-sm-9.col-md-10.col-lg-10.fluid-print > div > div.row > div.col-lg-12 > h4 > span:nth-child(1)').innerText;

// Get existing lessons from the diary page
const existingLessons = getExistingLessons(document.getElementById("given_lesson_table"));

// Iterate over the timetable data for given group and given subject and find the lessons that are not yet in the diary
for (const [subject, lessons] of Object.entries(timetable[groupName])) {
    console.log(`Processing subject ${subject}...`);

    // Iterate over the lessons for the current subject
    for (const lesson of lessons) {
        console.log(`Processing lesson ${lesson.day}...`);

        // Check if the lesson is already in the diary
        if (existingLessons.some(existingLesson => existingLesson.day === lesson.day && existingLesson.type === lesson.type)) {
            console.log("Lesson already exists, skipping...");
            continue;
        }

        // Add the lesson to the diary
        console.log("Adding lesson...");
        addLesson(lesson.day, lesson.amount, lesson.type);
    }
}
