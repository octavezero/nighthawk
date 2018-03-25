class Player {
    player: HTMLAudioElement;
    constructor() {
        this.player = new Audio();
    }

    getInstance() {
        return this.player;
    }

    getDuration() {
        return this.player.duration;
    }

    play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    replay() {
        this.player.load();
        this.play();
    }

    isMuted() {
        return this.player.muted;
    }

    isPaused() {
        return this.player.paused;
    }

    mute() {
        this.player.muted = true;
    }

    unmute() {
        this.player.muted = false;
    }

    getCurrentTime(): number {
        return this.player.currentTime;
    }

    setCurrentTime(duration: number) {
        this.player.currentTime = duration;
    }

    getVolume(): number {
        return this.player.volume;
    }

    setVolume(volume: number) {
        this.player.volume = volume;
    }

    getAudioSrc(): string {
        return this.player.currentSrc;
    }

    setAudioSrc(src: string) {
        this.player.src = src;
    }
}

export default new Player();
