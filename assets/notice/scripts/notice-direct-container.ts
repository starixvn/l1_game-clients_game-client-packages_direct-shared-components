import gc from "@sg/game-client-base";
import { _decorator, game } from "cc";
import { NoticeContainer } from "db://shared-components/shared/common-components/notice/scripts/notice-container";
import { RandomWaitingMessage } from "../../splash/scripts/random-waiting-message";

const { ccclass, property } = _decorator;

@ccclass("NoticeDirectContainer")
export class NoticeDirectContainer extends NoticeContainer {
    @property(RandomWaitingMessage)
    cmpMessage: RandomWaitingMessage = null;

    showNotice(notice: gc.Notices.Notice) {
        if (!game.isPaused() && notice) {
            this.cmpMessage && this.cmpMessage.reset();
        }

        super.showNotice(notice);
    }
}
