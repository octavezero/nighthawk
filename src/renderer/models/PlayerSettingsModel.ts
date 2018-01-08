export interface PlayerSettingsModel {
	shuffleMode?: 'shuffle' | 'shuffle-disabled';
	repeatMode?: 'repeat' | 'repeat-once';
	volume?: number;
}