import gc from "@sg/game-client-base";
import { _decorator, Label } from "cc";
import { BaseBetDetailLogItem, BetDetailLogItemType } from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-log-item";
import Observer from "observer";
import { GameRoundBetDetailsLog } from "../types/balanced-betting.types";

const { ccclass, property } = _decorator;
const { observer, render } = Observer;
const { DateTimeUtils, Player } = gc;

@ccclass()
export class BalancedBetDetailLogItem extends BaseBetDetailLogItem {
    @property(Label)
    lblTime: Label = null;

    @property(Label)
    lblUser: Label = null;

    @property(Label)
    lblStake: Label = null;

    @property(Label)
    lblRefund: Label = null;

    @property({ type: Label, override: true, visible: false })
    lblWin: Label = null;

    private playerName = "";

    @render(Player.MainPlayerStore, (store) => store.name)
    renderResult(name: string) {
        this.nodeBackground.active = this.playerName === name;
    }

    setData(data: BetDetailLogItemType) {
        const { betDetailsLog } = data;
        const { time, name, refund, amount } = betDetailsLog as GameRoundBetDetailsLog;
        this.playerName = name;
        this.lblTime && (this.lblTime.string = `${DateTimeUtils.getString12HourByTime(time)}`);
        this.lblUser && (this.lblUser.string = name);
        this.lblRefund && (this.lblRefund.string = refund.toString());
        this.lblStake && (this.lblStake.string = amount.toString());
    }
}
