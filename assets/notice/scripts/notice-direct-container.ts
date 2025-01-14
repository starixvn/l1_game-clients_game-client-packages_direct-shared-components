import gc from "@sg/game-client-base";
import { _decorator, game } from "cc";
import { NoticeContainer } from "db://shared-components/shared/common-components/notice/scripts/notice-container";
import { RandomWaitingMessage } from "../../splash/scripts/random-waiting-message";

const { ccclass, property } = _decorator;

@ccclass("NoticeDirectContainer")
export class NoticeDirectContainer extends NoticeContainer {
    @property(RandomWaitingMessage)
    private cmpMessage: RandomWaitingMessage = null;

    showNotice(notice: gc.Notices.Notice): void {
        if (!game.isPaused() && notice) {
            this.resetMessage();
        }
        super.showNotice(notice);
    }

    renderUMNotice(noticeDisable: gc.Notices.Notice): void {
        if (!noticeDisable) {
            this.noticeCmp?.hide();
            return;
        }

        if (!this.noticeCmp?.node) {
            this.resetMessage();
        }
        super.renderUMNotice(noticeDisable);
    }

    private resetMessage(): void {
        this.cmpMessage?.reset();
    }
}
