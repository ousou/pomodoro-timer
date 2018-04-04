var timer = {};

timer.running = false;

document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

document.getElementById("start").addEventListener("click", function(){
    var minutes = 25;
    var seconds = 0;
    startTimer(minutes, seconds);
});

document.getElementById("cancel").addEventListener("click", function(){
    clearInterval(timer.intervalId);
    timer.running = false;
    updateScreen(0, 0);
    setMessage('Press the Start button to start the timer!');
});

function startTimer(minutes, seconds) {
    timer.running = true;
    timer.minutes = minutes;
    timer.seconds = seconds;
    timer.intervalId = setInterval(runTimer, 1000);
    updateScreen(timer.minutes, timer.seconds);
    setMessage('Go do some work!');
}

function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}

function runTimer() {
    if (timer.seconds > 0) {
        timer.seconds--;
    } else {
        timer.minutes--;
        timer.seconds = 59;
    }
    updateScreen(timer.minutes, timer.seconds);
    checkIfTimeHasExpired();
}

function updateScreen(minutes, seconds) {
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2,0);
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2,0);
}

function checkIfTimeHasExpired() {
    if (timer.minutes <= 0 && timer.seconds <= 0) {
        clearInterval(timer.intervalId);
        notifyMe('Time is up! You can now take a break.', 7000);
        timer.running = false;
        setMessage('You can now take a break.');
    }
}

function notifyMe(message, timeout) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Pomodoro timer', {
      body: message,
    });
    notification.onclick = function () {
        window.focus();
    };
    setTimeout(function() {
        notification.close()
    }, timeout);
  }

}
