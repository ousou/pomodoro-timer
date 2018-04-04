document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});


function startTimer(minutes) {
    
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
