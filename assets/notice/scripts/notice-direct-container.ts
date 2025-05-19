import gc from "@sg/game-client-base";
import { _decorator } from "cc";
import { NoticeContainer } from "db://shared-components/shared/common-components/notice/scripts/notice-container";
import { NoticeDirectCmp } from "./notice-direct-cmp";
import { GameGuideUtils } from "db://shared-components/game/game-guide/scripts/utils/game-guide-utils";
import Observer from "observer";

const { ccclass } = _decorator;

const { render } = Observer;

const { Auth } = gc;

@ccclass("NoticeDirectContainer")
export class NoticeDirectContainer extends NoticeContainer {
    noticeCmp: NoticeDirectCmp = null;

    private appType: number = 0;

    @render(Auth.AuthStore, (store) => store.system)
    storeAppType(appType: number) {
        this.appType = appType;
    }

    protected override async showNoticeComponent(notice: gc.Notices.Notice) {
        await GameGuideUtils.hideWebViewGuide();
        const node = this.createNode();
        this.noticeCmp = node.getComponent<NoticeDirectCmp>(NoticeDirectCmp);
        this.noticeCmp.setAppType(this.appType);
        this.noticeCmp.setData(notice);
    }
}
