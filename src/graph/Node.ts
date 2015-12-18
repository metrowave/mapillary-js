import {IAPINavImIm} from "../API";
import {ILatLon} from "../Graph";
import Sequence from "./Sequence";

export class Node {
    public key: string;
    public ca: number;
    public latLon: ILatLon;
    public worthy: boolean;
    public sequence: Sequence;
    public apiNavImIm: IAPINavImIm;
    public translation: number[];
    public edgesSynched: boolean;

    constructor (
        key: string,
        ca: number,
        latLon: ILatLon,
        worthy: boolean,
        sequence: Sequence,
        apiNavImIm: IAPINavImIm,
        translation: number[]) {
        this.key = key;
        this.ca = ca;
        this.latLon = latLon;
        this.worthy = worthy;
        this.sequence = sequence;
        this.apiNavImIm = apiNavImIm;
        this.translation = translation;
        this.edgesSynched = false;
    }

    public get merged(): boolean {
        return this.apiNavImIm != null &&
            this.apiNavImIm.merge_version != null &&
            this.apiNavImIm.merge_version > 0;
    }

    public get fullPano(): boolean {
        return this.apiNavImIm.gpano != null &&
            this.apiNavImIm.gpano.CroppedAreaLeftPixels === 0 &&
            this.apiNavImIm.gpano.CroppedAreaTopPixels === 0 &&
            this.apiNavImIm.gpano.CroppedAreaImageWidthPixels === this.apiNavImIm.gpano.FullPanoWidthPixels &&
            this.apiNavImIm.gpano.CroppedAreaImageHeightPixels === this.apiNavImIm.gpano.FullPanoHeightPixels;
    }

    public findNextKeyInSequence (): string {
        return this.sequence.findNextKey(this.key);
    }

    public findPrevKeyInSequence (): string {
        return this.sequence.findPrevKey(this.key);
    }

}

export default Node;
