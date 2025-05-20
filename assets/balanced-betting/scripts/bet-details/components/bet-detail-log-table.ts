import gc from "@sg/game-client-base";
import { _decorator, instantiate, Prefab, Node, Label, Component } from "cc";
import { BetDetailLogTable } from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-log-table";

const { ccclass, property } = _decorator;

@ccclass()
export class BetDirectDetailLogTable extends BetDetailLogTable {

    @property(Label)
    lblTotal: Label = null;

    showBetDetail(bodyItemPrefab: Prefab, model) {
        const { betLogsChoice, total } = model;
        const totalAmount = this.filterBetLogsChoice(total);
        const betLogsChoiceData = this.filterBetLogsChoice(betLogsChoice);
        this.lblTotal && (this.lblTotal.string = totalAmount[0].betAmount.toString());
        betLogsChoiceData && betLogsChoiceData[0]?.forEach((betDetailsLog, index) => {
            this.body.addChild(
                this.buildBodyRow(bodyItemPrefab, {
                    betDetailsLog: { ...betDetailsLog, total },
                    index,
                    odds: {},
                    settlementResult: {},
                    result: {},
                    freeBet: false,
                    fractionalOddsFormat: false
                })
            );
        });
    }

    filterBetLogsChoice(betLogsChoice) {
        return betLogsChoice.filter(item => item !== undefined);
    }
}
