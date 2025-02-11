import gc from "@sg/game-client-base";
import { _decorator, Component, director } from "cc";
import Observer from "observer";

const { observer, render } = Observer;
const { App } = gc;

const { ccclass } = _decorator;
@ccclass
@observer
export default class SessionTimeOutDirectVisibility extends Component {
    @render(App.AppStore, (store) => store.isSessionTimeout)
    redirectToSessionTimeoutPage(isSessionTimeout: boolean) {
        if (isSessionTimeout) {
            director.loadScene("session-timeout-direct");
        }
    }
}
