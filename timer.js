document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById('timer');
    let startTime = parseFloat(localStorage.getItem('startTime')) || Date.now();
    let mode = localStorage.getItem('mode') || 'start';

    function updateTimer() {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000; // in seconds

        let minutes, seconds;
        if (mode === 'start') {
            // Counting from 0 to 45 minutes
            minutes = Math.min(Math.floor(elapsed / 60), 45);
            seconds = Math.floor(elapsed % 60);
        } else if (mode === 'resume') {
            // Counting from 45 to 90 minutes
            const adjustedElapsed = elapsed - (45 * 60); // Shift by 45 minutes
            minutes = Math.min(Math.floor(adjustedElapsed / 60) + 45, 90);
            seconds = Math.floor(adjustedElapsed % 60);
        }

        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Save the current time in localStorage
        localStorage.setItem('startTime', startTime);
        requestAnimationFrame(updateTimer);
    }

    function checkContent() {
        // Check if the content matches '1st' or '2nd' and set mode accordingly
        const contentElement = document.getElementById('content');
        const contentText = contentElement.textContent.trim();

        if (contentText === '1st') {
            if (mode !== 'start') {
                // Reset the start time if mode changes
                startTime = Date.now();
                localStorage.setItem('mode', 'start');
                localStorage.setItem('startTime', startTime);
            }
            mode = 'start';
        } else if (contentText === '2nd') {
            if (mode !== 'resume') {
                // Reset the start time if mode changes
                startTime = Date.now() - (45 * 60 * 1000); // Adjust for 45 minutes
                localStorage.setItem('mode', 'resume');
                localStorage.setItem('startTime', startTime);
            }
            mode = 'resume';
        }

        // Save mode
        localStorage.setItem('mode', mode);
    }

    // Update the timer and check content periodically
    setInterval(() => {
        checkContent();
        updateTimer();
    }, 1000); // Check and update every second
});
