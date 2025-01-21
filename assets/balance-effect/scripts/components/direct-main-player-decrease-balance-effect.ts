import { _decorator, Node } from "cc";
import { BalanceContainer } from "db://shared-components/game/balance-effect/scripts/components/balance-effect";
import { BalanceEffectStore, TUpdateBalance } from "db://shared-components/game/balance-effect/scripts/stores/balance-effect-store";
import Observer from "observer";

const { ccclass, property } = _decorator;
const { render } = Observer;

@ccclass()
export class DirectMainPlayerDecreaseBalanceEffect extends BalanceContainer {
    @property(Node)
    parentNode: Node = null;

    isIncrease = false;
    @render(BalanceEffectStore, (store) => store.decreaseBalanceMainPlayer, { fireImmediately: false })
    decreaseBalanceMainPlayer(balanceWhenMainPlayerBet: TUpdateBalance) {
        this.updateBalanceEffect(this.parentNode, balanceWhenMainPlayerBet?.balanceEffect?.balance);
    }
}
