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
const { DateTimeUtils, Player, FormatUtils, Shared } = gc;

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

    private betLog: gc.BetHistory.DynamicObject<object>;
    private mainPlayerRate = 1;

    @render(Player.MainPlayerStore, (store) => store.rate)
    updateMainPlayerRate(rate: number) {
        this.mainPlayerRate = rate;
    }

    @render(Player.MainPlayerStore, (store) => store.name)
    checkMainPlayer(mainPlayerName: string) {
        const { name, refund, amount, rate } = this.betLog as GameRoundBetDetailsLog;
        const isLoginUser = name === mainPlayerName;

        this.nodeHighlight.active = isLoginUser;
        this.lblUser && (this.lblUser.string = isLoginUser ? mainPlayerName : shortenName(name));

        const convertRefund = Shared.utils.NumberUtils.getValueByCurrency(refund, this.mainPlayerRate, rate);
        this.lblRefund && (this.lblRefund.string = FormatUtils.numberWithCommas(convertRefund, 2));

        const convertStake = Shared.utils.NumberUtils.getValueByCurrency(amount, this.mainPlayerRate, rate);
        this.lblStake && (this.lblStake.string = FormatUtils.numberWithCommas(convertStake, 2));
    }

    setData(data: BetDetailLogItemType) {
        const { betDetailsLog, index } = data;
        const { time } = betDetailsLog as GameRoundBetDetailsLog;

        this.betLog = betDetailsLog;
        this.nodeBackground.active = +index % 2 > 0;
        this.lblTime && (this.lblTime.string = DateTimeUtils.getStringHourByTime(time));
    }
}
