// Starts the timer with the given duration.
export function startTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft) {
    if (!timerRef) {
        setTimeLeft(timerDuration) // reset to 'timerDuration'
        setTimerRef(
            setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000)
        );
    }
};

// Restarts the timer, resetting it to 0.
export function restartTimerHandler(timerDuration, timerRef, setTimerRef, setTimeLeft) {
    clearInterval(timerRef);
    setTimerRef(null);
    setTimeLeft(0); // reset to 0
    // startTimerHandler(timerDuration);
};

export function stopTimerHandler(timerRef, setTimerRef){
    if(timerRef) clearInterval(timerRef);
    setTimerRef(null);
    // setTimeLeft(0);
}

// It formats time into MM:SS format
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}