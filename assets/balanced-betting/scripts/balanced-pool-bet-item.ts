import { _decorator } from "cc";
import BetItem from "db://shared-components/game/bets/scripts/components/bet-item";
import { NumberUtils } from "db://shared-components/shared/utils/number-utils";
const { ccclass, property } = _decorator;

@ccclass
export class BalancedPoolBetItem extends BetItem {
    public balanceBet(bet: number) {
        if (this.lblTotalBet.string === "") {
            return;
        }
        NumberUtils.numberTo(this.lblTotalBet, bet, 1.5, true);
    }
}
