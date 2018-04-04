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
    var minutes = 0;
    var seconds = 5;
    updateScreen(minutes, 5);
    startTimer(minutes, 5);
});

function startTimer(minutes, seconds) {
    timer.running = true;
    timer.minutes = minutes;
    timer.seconds = seconds;
    timer.intervalId = setInterval(runTimer, 1000);
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
        notifyMe('You can now take a break.', 5000);
        timer.running = false;
    }
}

function notifyMe(message, timeout) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Time is up!', {
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
