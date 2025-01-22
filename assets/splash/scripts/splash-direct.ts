import gc from "@sg/game-client-base";
import { _decorator, Node, Prefab } from "cc";
import SplashComponentBase from "db://shared-components/splash/scripts/components/splash-component-base";
import Observer from "observer";
const { AppTypes } = gc;

const { ccclass, property } = _decorator;
const { observer } = Observer;

@ccclass
@observer
export default class SplashDirect extends SplashComponentBase {
    @property({ type: Node, override: true, visible: false })
    signNameContainer: Node = null;

    @property({ type: Node, override: true, visible: false })
    containerCustomize: Node = null;

    @property({ type: Prefab, override: true, visible: false })
    prefabCustomize: Prefab = null;

    override get sceneName() {
        if (this.system === AppTypes.MobileDirect) {
            return "direct-game";
        }

        return "portrait-game";
    }
}
