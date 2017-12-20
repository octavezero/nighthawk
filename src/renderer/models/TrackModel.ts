import { ICommonTagsResult, IFormat } from 'music-metadata';

export default interface TrackModel {
	id: number;
	source: string;
	common: ICommonTagsResult;
	format: IFormat;
}