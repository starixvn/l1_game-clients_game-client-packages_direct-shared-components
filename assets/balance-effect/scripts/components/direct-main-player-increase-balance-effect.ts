import { _decorator, Node } from "cc";
import { BalanceContainer } from "db://shared-components/game/balance-effect/scripts/components/balance-effect";
import { BalanceEffectStore, TUpdateBalance } from "db://shared-components/game/balance-effect/scripts/stores/balance-effect-store";
import Observer from "observer";

const { ccclass, property } = _decorator;
const { render } = Observer;

@ccclass()
export class MainPlayerIncreaseBalanceEffect extends BalanceContainer {
    @property(Node)
    parentNode: Node = null;

    @render(BalanceEffectStore, (store) => store.increaseBalanceMainPlayer, { fireImmediately: false })
    increaseBalanceMainPlayer(balanceWhenMainPlayerPayout: TUpdateBalance) {
        this.updateBalanceEffect(this.parentNode, balanceWhenMainPlayerPayout?.balanceEffect?.balance);
    }
}
