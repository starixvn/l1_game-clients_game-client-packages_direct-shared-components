import { Button, _decorator } from "cc";
const { ccclass } = _decorator;

import gc from "@sg/game-client-base";
import { NoticeCmp, NoticeType } from "db://shared-components/shared/common-components/notice/scripts/notice-cmp";

@ccclass()
export class NoticeDirectCmp extends NoticeCmp {
    setData(data: {
        title: string;
        message: string;
        type: NoticeType;
        onClose: () => void;
        showBtnConfirmButton?: boolean;
        noticeInfo?: gc.Notices.NoticeInfo;
    }) {
        const modifiedData = { ...data };

        if (this.isBlockingNotice(modifiedData.noticeInfo)) {
            this.disableBackgroundClick();
            modifiedData.showBtnConfirmButton = false;
        }

        if (modifiedData.noticeInfo === gc.Notices.NoticeInfo.ExcludedGame) {
            modifiedData.onClose = () => window.location.reload();
        }

        super.setData(modifiedData);
    }

    private isBlockingNotice(noticeInfo?: gc.Notices.NoticeInfo): boolean {
        return noticeInfo === gc.Notices.NoticeInfo.DisabledGame || noticeInfo === gc.Notices.NoticeInfo.LostGameConnection;
    }

    private disableBackgroundClick(): void {
        const bgCpm = this.nodeFadeBackground?.getComponent(Button);
        if (bgCpm) {
            bgCpm.clickEvents = [];
        }
    }
}
