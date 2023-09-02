
// big function that just does everything
function calculateEverything() {
    // work how many weeks we are budgeting for
    const fromDate = new Date(document.getElementById("date-from").value);
    const toDate = new Date(document.getElementById("date-to").value);

    const days = daysBetween(fromDate, toDate);
    const weeks = Math.ceil(days / 7);

    document.getElementById("date-output").innerHTML = `<span style="font-size: 2em;">= <b>${weeks}</b> weeks</span> (<b>${days}</b> days)`;

    // if weeks is a number (we probably have valid dates!), unhide everything else and remove the warning
    if(!isNaN(weeks)) {
        document.getElementById("cover").classList.remove("shown");
        document.getElementById("date-warning").style.display = "none";
    } else {
        document.getElementById("cover").classList.add("shown");
        document.getElementById("date-warning").style.display = "block";
    }


    // sum income
    const incomeText = document.getElementById("incomes").value;
    const incomes = incomeText.split("\n");
    
    let incomeTotal = 0;
    for (const inEntry of incomes) {
        if (isNaN(parseInt(inEntry))) continue;


        incomeTotal += parseInt(inEntry);
    }

    document.getElementById("incomes-output").innerHTML = `<b>£${incomeTotal}</b>`;


    // sum outgoings
    const outgoingText = document.getElementById("outgoings").value;
    const outgoings = outgoingText.split("\n");

    let outgoingTotal = 0;
    for (const outEntry of outgoings) {
        if (isNaN(parseInt(outEntry))) continue;


        outgoingTotal += parseInt(outEntry);
    }

    document.getElementById("outgoings-output").innerHTML = `<b>£${outgoingTotal}</b>`;


    // calculate outcomes
    let totalLeft = incomeTotal - outgoingTotal;
    let perWeek = totalLeft / weeks;
    let perWeekAfterFood = perWeek - 30;
    let perDay = totalLeft / days;

    // show outcomes
    document.getElementById("total").innerText = `£${totalLeft}`;
    document.getElementById("weekly").innerText = `£${Math.floor(perWeek)}`;
    document.getElementById("weekly-after-scran").innerText = `£${Math.floor(perWeekAfterFood)}`;

}

function datesWinter() {
    return setDates(
        new Date("2023-09-16"),
        new Date("2023-12-16")
    );
}

function datesSpring() {
    return setDates(
        new Date("2024-01-08"),
        new Date("2024-04-12")
    );
}

function datesSummer() {
    return setDates(
        new Date("2024-04-13"),
        new Date("2024-07-20")
    );
}


function setDates(from, to) {
    document.getElementById("date-from").value = from.toISOString().substr(0, 10);
    document.getElementById("date-to").value = to.toISOString().substr(0, 10);
    calculateEverything();
}

// https://stackoverflow.com/a/2627482
function daysBetween(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}


// run onload
calculateEverything();

// run when anything changes
document.querySelectorAll("input").forEach(e => e.onchange = calculateEverything);
document.querySelectorAll("textarea").forEach(e => e.onkeyup = calculateEverything);