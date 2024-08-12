let sound_enabled = true;
let timeInterval;

function play_sound(sound) {
    if (sound_enabled) {
        var audio = new Audio(sound);
        audio.play();
    }
}

function toggle_sound() {
    play_sound('click sound.mp3');
    sound_enabled = !sound_enabled;
    const button = document.querySelector('.button_container button:nth-child(3)');
    button.innerHTML = sound_enabled ? "<b>Sound OFF</b>" : "<b>Sound ON</b>";
}

function find_date() {
    const dateDisplay = document.getElementById("date_display");
    const dateButton = document.querySelector('.button_container button:nth-child(2)');
    
    if (dateDisplay.classList.contains("hidden")) {
        var mydate = new Date();
        var year = mydate.getFullYear();
        var month = mydate.getMonth();
        var day = mydate.getDay();
        var daym = mydate.getDate();

        var array_day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var array_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        dateDisplay.classList.remove("hidden");
        dateDisplay.textContent = `${array_day[day]} ${','} ${daym} ${array_month[month]} ${year}`;
        dateButton.innerHTML = "<b>Date Unreveal</b>";
    } else {
        dateDisplay.classList.add("hidden");
        dateButton.innerHTML = "<b>Date Reveal</b>";
    }
    play_sound('click sound.mp3');
}


function update_clock(clockId) {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDegrees = ((seconds / 60) * 360) - 90;
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) - 90;
    const hourDegrees = ((hours % 12) / 12 * 360) + ((minutes / 60) * 30) - 90;

    const clock = document.getElementById(clockId);
    clock.querySelector('.second_hand').style.transform = `rotate(${secondDegrees}deg)`;
    clock.querySelector('.minute_hand').style.transform = `rotate(${minuteDegrees}deg)`;
    clock.querySelector('.hour_hand').style.transform = `rotate(${hourDegrees}deg)`;
}

function start_clocks() {
    setInterval(() => {
        update_clock('left_clock');
        update_clock('right_clock');
    }, 1000);
}

function show_analogue_clocks() {
    document.getElementById('left_clock').classList.remove('hidden');
    document.getElementById('right_clock').classList.remove('hidden');
    start_clocks();
}

function update_time() {
    var mydate = new Date();
    var hours = mydate.getHours();
    var minutes = mydate.getMinutes();
    var seconds = mydate.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var final_time = document.getElementById("time_display");
    final_time.textContent = `${hours} : ${minutes} : ${seconds}`;
    play_sound('clock sound.mp3');
}

function find_time() {
    const timeDisplay = document.getElementById("time_display");
    const timeButton = document.querySelector('.button_container button:nth-child(1)');

    if (timeDisplay.classList.contains("hidden")) {
        timeDisplay.classList.remove("hidden");
        timeButton.innerHTML = "<b>Time Unreveal</b>";
        update_time();
        timeInterval = setInterval(update_time, 1000);
        show_analogue_clocks();
    } else {
        timeDisplay.classList.add("hidden");
        timeButton.innerHTML = "<b>Time Reveal</b>";
        clearInterval(timeInterval);

        document.getElementById('left_clock').classList.add('hidden');
        document.getElementById('right_clock').classList.add('hidden');
    }
    play_sound('click sound.mp3');
}

function dark_light_mode() {
    document.body.classList.toggle('dark_mode');
    const modeButton = document.querySelector('.button_container button:nth-child(4)');
    modeButton.innerHTML = document.body.classList.contains('dark_mode') ? "<b>Light Mode</b>" : "<b>Dark Mode</b>";
    play_sound('click sound.mp3');
}