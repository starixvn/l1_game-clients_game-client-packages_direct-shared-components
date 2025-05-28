import gc from "@sg/game-client-base";
import { _decorator, Label, Node } from "cc";
import {
    BaseBetDetailLogItem,
    BetDetailLogItemType,
} from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-log-item";
import Observer from "observer";
import { GameRoundBetDetailsLog } from "../types/balanced-betting.types";
import { shortenName } from "../../../../../../shared-components/assets/shared/utils/utils";

const { ccclass, property } = _decorator;
const { observer, render } = Observer;
const { DateTimeUtils, Player, FormatUtils } = gc;

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

    @property(Node)
    nodeHighlight: Node = null;

    @property({ type: Label, override: true, visible: false })
    lblWin: Label = null;

    @property({ type: Label, override: true, visible: false })
    lblOdds: Label = null;

    @property({ type: Label, override: true, visible: false })
    lblAmount: Label = null;

    @property({ type: Label, override: true, visible: false })
    lblChoice: Label = null;

    private playerName = "";

    @render(Player.MainPlayerStore, (store) => store.name)
    renderResult(name: string) {
        const isLoginUser = this.playerName === name;
        this.nodeHighlight.active = isLoginUser;
        this.lblUser && (this.lblUser.string = isLoginUser ? name : shortenName(name));
    }

    setData(data: BetDetailLogItemType) {
        const { betDetailsLog, index } = data;
        const { time, name, refund, amount } = betDetailsLog as GameRoundBetDetailsLog;

        this.nodeBackground.active = +index % 2 > 0;

        this.playerName = name;
        this.lblTime && (this.lblTime.string = DateTimeUtils.getStringHourByTime(time));
        this.lblRefund && (this.lblRefund.string = FormatUtils.numberWithCommas(refund, 2));
        this.lblStake && (this.lblStake.string = FormatUtils.numberWithCommas(amount, 2));
    }
}
