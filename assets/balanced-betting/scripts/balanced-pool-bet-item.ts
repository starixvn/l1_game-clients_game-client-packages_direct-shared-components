import { _decorator } from "cc";
import BetItem from "db://shared-components/game/bets/scripts/components/bet-item";
import { NumberUtils } from "db://shared-components/shared/utils/number-utils";

const { ccclass, property } = _decorator;

@ccclass
export class BalancedPoolBetItem extends BetItem {
    private DURATION_BALANCED_BET = 1.5;

    public balanceBet(bet: number, hasAnimation = true) {
        if (this.lblTotalBet.string === "") {
            return;
        }
        NumberUtils.numberTo(this.lblTotalBet, bet, this.DURATION_BALANCED_BET, true, hasAnimation);
    }
}
