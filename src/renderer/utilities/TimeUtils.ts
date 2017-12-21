export const parseToMinutes = (seconds: number): string => {
	let min = Math.floor(seconds / 60);
	let sec = seconds % 60;

	return String.prototype.concat((min < 10 ? '0' : '') + min, ':' , (sec < 10 ? '0' : '') + sec);
};