import gc from "@sg/game-client-base";
import { _decorator, Component, director, Label } from "cc";
import Observer from "observer";
import GameConnection from "db://shared-components/shared/common-components/game-connection";

const { ccclass, property } = _decorator;
const { observer, handle, render } = Observer;
const { Auth, ChipSetting, sentryLogger, BrowserDomUtils, App, AppTypes } = gc;

declare global {
    interface Window {
        setSplashScreenNoticeMessage?: Function;
        updateLoadingPercentage?: Function;
    }
}

@ccclass
@observer
export default class Splash extends Component {
    @property(Label)
    label: Label = null;

    gameConnection: GameConnection = null;

    protected system: number = AppTypes.Club;

    onLoad() {
        gc.initMobxLogger();
        this.initGameConnectionComponent();
        this.updateProgressBar(0);
        this.sso();
        window.addEventListener("message", this.registerEvents);
    }

    onDestroy(): void {
        window.removeEventListener("message", this.registerEvents);
    }

    protected onEnable(): void {
        BrowserDomUtils.postMessageToParent({ splashEnabled: true });
    }

    protected registerEvents = (event: MessageEvent) => {
        this.removeUserSetting(event);
        this.registerEventUserGesturePage(event);
    };

    removeUserSetting(event: MessageEvent) {
        if (event?.data?.isClearStorage) {
            this.handleClearStorage();
        }
    }

    @handle(App.AppHandlers.ClearStorage)
    handleClearStorage() {
        return true;
    }

    @handle(App.AppHandlers.UserGesturePage)
    protected registerEventUserGesturePage(event: MessageEvent) {
        return event.data?.isUserGesture || false;
    }

    private initGameConnectionComponent() {
        this.gameConnection = this.getComponent(GameConnection);
        if (this.gameConnection) {
            this.gameConnection.openGameCallback = () => this.loadSceneGame();
        }
    }

    @handle(Auth.AuthHandlers.SSO)
    sso() {
        return new URLSearchParams(window.location.search);
    }

    @render(Auth.AuthStore, (store) => ({
        isAuthorized: store.isAuthorized,
        system: store.system,
    }))
    openGame({ isAuthorized, system }) {
        if (isAuthorized) {
            this.system = system;
            this.loadChipSetting();
            this.triggerRecheckIn();
            this.connectToGameService();
        }
    }

    connectToGameService() {
        this.gameConnection?.connectToService();
    }

    @render(Auth.AuthStore, (store) => store.ssoErrorMessage, { fireImmediately: false })
    renderMessage(message: string) {
        this.label && (this.label.string = message);
        window.setSplashScreenNoticeMessage?.(message);
    }

    updateProgressBar(progress: number) {
        const percentage = Math.round(progress * 100);
        this.label && (this.label.string = `${percentage}%`);
        window.updateLoadingPercentage?.(percentage);
    }

    loadSceneGame() {
        const sceneName = this.sceneName;
        director.preloadScene(
            sceneName,
            (completedCount: number, totalCount: number) => {
                this.updateProgressBar(completedCount / totalCount);
            },
            (error) => {
                if (error) {
                    sentryLogger.logError(error);
                } else {
                    director.loadScene(sceneName);
                }
            }
        );
    }

    get sceneName() {
        return "game";
    }

    @handle(Auth.AuthHandlers.TriggerRecheckIn)
    triggerRecheckIn() {}

    @handle(ChipSetting.ChipSettingHandler)
    loadChipSetting() {}
}
