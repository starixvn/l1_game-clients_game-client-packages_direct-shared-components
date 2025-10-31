import { _decorator } from "cc";
import { AdjustPortraitResolution } from "./adjust-portrait-resolution";

const { ccclass } = _decorator;

@ccclass("OriginalGameAdjustPortraitResolution")
export class OriginalGameAdjustPortraitResolution extends AdjustPortraitResolution {
    protected readonly portraitResolution = {
        width: 786,
        height: 1344,
    };
}
