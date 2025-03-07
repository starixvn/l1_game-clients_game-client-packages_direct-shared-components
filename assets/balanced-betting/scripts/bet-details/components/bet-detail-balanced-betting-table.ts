import { _decorator, instantiate } from "cc";
import { BetDetailTable, BetDetailTableType } from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-table";
import Observer from "observer";
const { ccclass, property } = _decorator;
const { observer, render, handle } = Observer;

export interface BetDetaiBalancedBettingType extends BetDetailTableType {
    roundBettingInfo: any;
}

@ccclass
export class BetDetailBalancedBettingTable extends BetDetailTable {
    showBetDetail(data: BetDetaiBalancedBettingType) {
        const { roundBettingInfo, resultContentPrefab, betDetailSummaryPrefab, logDetailItemPrefab, betDetailLogTablePrefab } = data;

        const betDetailLogTable = instantiate(betDetailLogTablePrefab);
        //betDetailLogTable.getComponent(BetDetailLogTable).showBetDetail(logDetailItemPrefab, roundBettingInfo);
        this.nodeBetDetailLogTablePrefab.addChild(betDetailLogTable);

        const betDetailSummaryTable = instantiate(betDetailSummaryPrefab);
        //betDetailSummaryTable?.getComponent(BaseBetDetailSummaryTable).renderResult(roundBettingInfo, resultContentPrefab);
        this.nodeBetDetailSummaryTable?.addChild(betDetailSummaryTable);
    }
}
