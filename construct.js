// Set the date we're counting down to
let countDownDate = new Date("Aug 17, 2024 00:00:00").getTime();

// Update the countdown every 1 second
let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    // Calculate time remaining
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Launched!";
    }
}, 1000);
