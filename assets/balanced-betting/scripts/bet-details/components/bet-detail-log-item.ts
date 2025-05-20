import gc from "@sg/game-client-base";
import { _decorator, Label } from "cc";
import { BaseBetDetailLogItem, BetDetailLogItemType } from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-log-item";

const { ccclass, property } = _decorator;
const { DateTimeUtils } = gc;
type GameRoundBetDetailsLog = gc.BetHistory.DynamicObject<object> & {
    time: string;
    name: string;
    refund: number;
    amount: number;
}

@ccclass()
export class BetDetailLogItem extends BaseBetDetailLogItem {
    @property(Label)
    lblTime: Label = null;

    @property(Label)
    lblUser: Label = null;

    @property(Label)
    lblStake: Label = null;

    @property(Label)
    lblRefund: Label = null;

    setData(data: BetDetailLogItemType) {
        const { index, betDetailsLog } = data;
        const { time, name, refund, amount } = betDetailsLog as GameRoundBetDetailsLog;
        // this.nodeBackground.active = index % 2 > 0;
        this.lblTime && (this.lblTime.string = `${DateTimeUtils.getString12HourByTime(time)}`);
        this.lblUser && (this.lblUser.string = name);
        this.lblRefund && (this.lblRefund.string = refund.toString());
        this.lblStake && (this.lblStake.string = amount.toString());
    }
}
