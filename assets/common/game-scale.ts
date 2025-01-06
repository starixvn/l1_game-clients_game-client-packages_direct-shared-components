import { _decorator, Enum, sys } from "cc";

import { AutoScalePolicy, AutoScaleWidget } from "../../../shared-components/assets/shared/common-components/auto-scale-widget";

const { ccclass, disallowMultiple, executeInEditMode, property } = _decorator;

/** Automatically scales to match parent's size. */
@ccclass("Game Scale")
@disallowMultiple
@executeInEditMode
export class GameScale extends AutoScaleWidget {
    @property({ type: Enum(AutoScalePolicy), visible: false, override: true })
    protected _policy = AutoScalePolicy.FitContent;

    @property({ type: Enum(AutoScalePolicy), visible: false, override: true })
    public get policy(): AutoScalePolicy {
        if (sys.isMobile) {
            return AutoScalePolicy.MatchWidth;
        }
        return this._policy;
    }
}
