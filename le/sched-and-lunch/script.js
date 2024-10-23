const schedule = new Schedule();
const lunch = new Lunch();

function main() {
  update();
  setInterval(() => {
    console.info("Interval timer fired, refreshing schedule and lunch...");
    update();
  }, REFRESH_INTERVAL);
}

// Note to any future devs here: Sorry for the null-checking hell. Initially I
// meant to use a loading state to denote errors, but I switched to human-
// readable messages instead. Because of this, I had to add a lot of null checks
// as an afterthought/workaround.

// date parameter for debug
function update(date) {
  document.querySelector("section.letter-of-the-day")
    .classList.add("loading");
  document.querySelector("section.bell-schedule")
    .classList.add("loading");

  schedule.refresh(date).then(() => {
    const data = schedule.latestData;

    // Hide errored data using a loading state
    if (data != null) {
      document.querySelector("section.letter-of-the-day")
        .classList.remove("loading");

      loadSection_bigLetter(data);
    }

    // Always remove loading state for bell schedule regardless of wheter data
    // is null; this allows the "No schedule available" message to be displayed
    document.querySelector("section.bell-schedule")
      .classList.remove("loading");

    loadSection_bellSchedule(data);
  });

  document.querySelector("section.lunch")
    .classList.add("loading");

  lunch.refresh(date).then(() => {
    document.querySelector("section.lunch")
      .classList.remove("loading");

    const data = lunch.latestData;

    for (const when of ["today", "upcoming"]) {
      loadSection_lunch(data, when);
    }
  });
}

function loadSection_bigLetter(data) {
  document.getElementById("letter")
    .innerText = data.letterOfTheDay.letter || "?";
  document.getElementById("special")
    .classList.toggle("hidden", !data.letterOfTheDay.special);
  document.getElementById("message")
    .classList.toggle("hidden", !data.letterOfTheDay.special);
}

function loadSection_bellSchedule(data) {
  document.getElementById("day-name")
    .innerText = `${data?.relativeDayName}'s schedule`;
  document.getElementById("day-name")
    .classList.toggle("hidden", data?.relativeDayName == null);
  document.getElementById("no-schedule")
    .classList.toggle("hidden", data?.todayHasSchedule ?? true);

  _displayBellSchedule(data?.classTimes);
}

function _displayBellSchedule(classTimes) {
  let ok = true;
  const element = document.getElementById("schedule");

  if (classTimes?.type === "text") {
    element.innerText = classTimes.value;
  }
  else if (classTimes?.type === "data") {
    _populateTable(classTimes.value);
  }
  else {
    ok = false;
    element.innerText = classTimes == null
      ? "No schedule available."
      : "Whoops! Something went wrong.";
  }

  element.classList.toggle("error-message", !ok);
}

function _populateTable(data) {
  const element = document.getElementById("schedule");
  const template = document.getElementById("schedule-row");

  element.replaceChildren();

  for (const block of data) {
    const row = template.content.cloneNode(true);
    const name = row.querySelector(".name");
    const time = row.querySelector(".time");

    if (/lunch/i.test(block.name)) {
      name.classList.add("lunch");
    }

    name.innerText = block.name;
    time.innerText = `${block.start} - ${block.end}`;

    element.appendChild(row);
  }
}

// Today's lunch and upcoming lunch have similar structures; this function handles both
function loadSection_lunch(data, when) {
  data = data?.[when];

  const element = document.getElementById(when);
  element.classList.toggle("hidden", data == null);

  if (data == null) {
    return;
  }

  element.querySelector(".day-name").innerText = `${data.relativeDayName}'s lunch`;
  element.querySelector(".menu-title").innerText = data.title;

  _populateMenu(element, data.sides);
}

function _populateMenu(parent, data) {
  const element = parent.querySelector(".menu-description");
  element.replaceChildren();
  element.classList.toggle("hidden", data.length === 0);

  for (const item of data) {
    const li = document.createElement("li");
    li.innerText = item;
    element.appendChild(li);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
  document.addEventListener("keydown", event => {
    if (event.ctrlKey && event.altKey && event.key === "/") {
      const date = prompt("[Debug]: Force-set ISO timestamp...");
      if (date != null)
        update(new Date(date));
    }
  });
}
else {
  main();
}
