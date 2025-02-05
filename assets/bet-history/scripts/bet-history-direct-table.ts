import { _decorator } from "cc";
import { BetHistoryTable } from "db://shared-components/game/bet-history/scripts/components/bet-history-table";
import { Dialog } from "db://shared-components/shared/common-components/dialogs/dialog";

const { ccclass, property } = _decorator;

@ccclass()
export class BetHistoryDirectTable extends BetHistoryTable {
    @property(Dialog)
    dialog: Dialog = null;
}
