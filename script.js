const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const clearLapsBtn = document.getElementById("clearLaps");
const lapsList = document.getElementById("laps");
const lapSection = document.getElementById("lapSection");

let startTime = null;
let elapsed = 0;
let intervalId = null;

function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    const time = elapsed + (Date.now() - startTime);
    display.textContent = formatTime(time);
}

startStopBtn.addEventListener("click", () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        elapsed += Date.now() - startTime;
        startStopBtn.textContent = "Start";
    } else {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 10);
        startStopBtn.textContent = "Pause";
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    elapsed = 0;
    display.textContent = "00:00:00.000";
    startStopBtn.textContent = "Start";
    lapsList.innerHTML = "";
    lapSection.style.display = "none";
});

lapBtn.addEventListener("click", () => {
    if (intervalId) {
        const time = elapsed + (Date.now() - startTime);
        const li = document.createElement("li");
        li.textContent = `#${lapsList.children.length + 1}     ${formatTime(time)}`;
        lapsList.prepend(li);
        lapSection.style.display = "block";
    }
});

clearLapsBtn.addEventListener("click", () => {
    lapsList.innerHTML = "";
    lapSection.style.display = "none";
});