import gc from "@sg/game-client-base";
import { _decorator } from "cc";
import { NoticeContainer } from "db://shared-components/shared/common-components/notice/scripts/notice-container";
import Observer from "observer";

const { ccclass } = _decorator;

const { render } = Observer;

const { Auth } = gc;

@ccclass("NoticeDirectContainer")
export class NoticeDirectContainer extends NoticeContainer {
}
