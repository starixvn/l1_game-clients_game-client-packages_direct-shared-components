import gc from "@sg/game-client-base";
import { _decorator, Component, director } from "cc";
import Observer from "observer";

const { render, observer } = Observer;

const { App } = gc;

const { ccclass } = _decorator;

@ccclass
@observer
export default class UnderMaintenanceDirectVisibility extends Component {
    @render(App.AppStore, (store) => store.isUM)
    redirectToSessionTimeoutPage(isUM: boolean) {
        if (isUM) {
            director.loadScene("under-maintenance-direct");
        }
    }
}
