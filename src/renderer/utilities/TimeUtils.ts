export const parseToMinutes = (seconds: number): string => {
    let secondsFloor = Math.floor(seconds);
    const min = Math.floor(secondsFloor / 60);
    const sec = secondsFloor % 60;

    return String.prototype.concat(
        (min < 10 ? '0' : '') + min,
        ':',
        (sec < 10 ? '0' : '') + sec
    );
};
