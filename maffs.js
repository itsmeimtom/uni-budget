
// big function that just does everything
function calculateEverything() {
    // work how many weeks we are budgeting for
    const fromDate = new Date(document.getElementById("date-from").value);
    const toDate = new Date(document.getElementById("date-to").value);

    const days = daysBetween(fromDate, toDate);
    const weeks = Math.ceil(days / 7);

    document.getElementById("date-output").innerHTML = `<b>${days}</b> days (<b>${weeks}</b> weeks)`


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
    let perDay = totalLeft / days;

    // show outcomes
    document.getElementById("total").innerText = `£${totalLeft}`;
    document.getElementById("weekly").innerText = `£${Math.floor(perWeek)}`;


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