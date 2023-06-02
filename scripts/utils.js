export async function getTimetableAsync() {

    let timetable = [];
    const lastUpdate = localStorage.getItem("sv-assistant-timetable-last-update");

    if (lastUpdate) {
        const timetableData = localStorage.getItem("sv-assistant-timetable");
        timetable = timetableData ? JSON.parse(timetableData) : [];
    }

    const mondays = getMondays(lastUpdate);

    for (const monday of mondays) {
        const timetableOfaWeek = await fetchTimetableForWeekAsync(monday);
        timetable = timetable.concat(timetableOfaWeek);
    }

    localStorage.setItem("sv-assistant-timetable", JSON.stringify(timetable));
    localStorage.setItem("sv-assistant-timetable-last-update", new Date().toISOString());

    return timetable;
}

export async function fetchTimetableForWeekAsync(date) {
    const response = await fetch("https://siseveeb.voco.ee/veebilehe_andmed/tunniplaan?opetaja=28243&nadal=" + date, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to fetch timetable from server");
    const data = await response.json();
    if (!data.tunnid) throw new Error("Error fetching timetable from server: " + data);
    return restructureTimetableData(data.tunnid);
}

export function restructureTimetableData(data) {
    return Object.values(data).reduce((acc, curr) => {
        const {grupp: group, aine: subject} = curr;
        if (!acc[group]) {
            acc[group] = {};
        }
        if (!acc[group][subject]) {
            acc[group][subject] = [];
        }
        acc[group][subject].push(curr);
        return acc;
    }, {});
}

export function getMondays(lastUpdate) {

    let firstMonday = null;
    const mondays = [];

    // Get today's date
    const today = new Date();

    // If last update is not set, get the start year from the page and calculate the first monday of the school year
    if (!lastUpdate) {

        // Get start year from a span element with class label-info (in 2022/2023 format):
        const startYear = document.getElementsByClassName("label-info")[0].innerText.split("/")[0];

        // Get the last monday of August in the start year
        firstMonday = getPreviousMondayFromDate(new Date(parseInt(startYear), 7, 31));

    } else {

        // Get monday before the last update
        firstMonday = getPreviousMondayFromDate(lastUpdate);
    }

    // Create array of mondays from the last update to today
    for (let d = new Date(firstMonday); d <= today; d.setDate(d.getDate() + 7)) {

        // Convert date to ISO string and push to mondays array, considering timezone offset
        mondays.push(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split("T")[0]);
    }

    console.log(mondays)
    debugger
    return mondays;
}

export function getPreviousMondayFromDate(date) {

    // Validate date
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        throw new Error("Invalid date");
    }

    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

/**
 * Get the existing lessons from the diary page
 * @returns {*[{day: string, amount: number, type: string}]}
 */
export function getExistingLessons(given_lesson_table) {
    // get the table
    console.log("Retrieved table:", given_lesson_table);

    // get the rows from the table body
    const rows = given_lesson_table.getElementsByTagName('tbody')[0].rows;
    console.log("Retrieved rows:", rows);

    const jsonArray = []; // array to store each row data

    for (let i = 0; i < rows.length; i++) {
        console.log("Processing row", i + 1);

        const jsonRow = {}; // object to store each cell data

        // get the cells from the current row
        const cells = rows[i].cells;
        console.log("Retrieved cells:", cells);

        // convert date format from DD.MM.YYYY to YYYY-MM-DD
        const [day, month, year] = cells[0].innerText.split(".");
        console.log("Split date components:", day, month, year);
        const formattedDate = `${year}-${month}-${day}`;
        console.log("Formatted date:", formattedDate);

        // get type from row class name, the last character represents the type
        const type = rows[i].className.slice(-1);
        console.log("Type:", type);

        // populate jsonRow with data
        jsonRow["day"] = formattedDate;
        jsonRow["amount"] = parseInt(cells[2].innerText, 10);
        jsonRow["type"] = type;
        console.log("Row data:", jsonRow);

        // push the row data to jsonArray
        jsonArray.push(jsonRow);
    }

    console.log("Converted JSON array:", jsonArray);
    return jsonArray;
}

/* Example timetable data:
{
  "nadal": "2023-05-22",
  "tunnid": {
    "2023-05-25": [
      {
        "tund": "3",
        "algus": "10:15",
        "lopp": "11:45",
        "aine": "kasutab UI testide loomise raamistikke",
        "grupp": "VSo21",
        "opetaja": "Henno Täht",
        "ruum": "Kopli A - A418 (Arvutiklass)"
      },
      {
        "tund": "4",
        "algus": "11:55",
        "lopp": "14:00",
        "aine": "kasutab UI testide loomise raamistikke",
        "grupp": "VSo21",
        "opetaja": "Henno Täht",
        "ruum": "Kopli A - A418 (Arvutiklass)"
      },
      {
        "tund": "5",
        "algus": "14:10",
        "lopp": "15:40",
        "aine": "dokumenteerib testi tulemused lähtudes dokumenteerimise standarditest",
        "grupp": "VSo21",
        "opetaja": "Henno Täht",
        "ruum": "Kopli A - A418 (Arvutiklass)"
      },
      {
        "tund": "6",
        "algus": "15:45",
        "lopp": "17:15",
        "aine": "dokumenteerib testi tulemused lähtudes dokumenteerimise standarditest",
        "grupp": "VSo21",
        "opetaja": "Henno Täht",
        "ruum": "Kopli A - A418 (Arvutiklass)"
      }
    ]
  },
  "viimane_muudatus": "2023-05-23 11:40:14"
} */
