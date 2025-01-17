import { _decorator, Prefab } from "cc";
import LoadBoostedOddsContainerPrefab from "db://shared-components/game/boosted-odds/scripts/load-boosted-odds-container-prefab";
import { bundleManager } from "db://shared-components/shared/common-components/bundle-manager/bundle-manager";
import Observer from "observer";

const { ccclass } = _decorator;
const { handle, render } = Observer;

@ccclass("LoadBoostedOddsContainerPrefab")
export default class LoadBoostedOddsDirectContainerPrefab extends LoadBoostedOddsContainerPrefab {
    protected static override readonly BundleConstants = {
        ...LoadBoostedOddsContainerPrefab.BundleConstants,
        sharePortraitDirectBundle: "shared-portrait-direct-bundle",
    };

    async getPrefabs(prefabName: string) {
        const { rootFolder } = LoadBoostedOddsDirectContainerPrefab.BundleConstants;
        const prefabPath = LoadBoostedOddsDirectContainerPrefab.BundleConstants.sharePortraitDirectBundle;

        return bundleManager.loadAssetsFromBundle<Prefab>(prefabPath, `${rootFolder}/${prefabName}`, Prefab, null);
    }
}
