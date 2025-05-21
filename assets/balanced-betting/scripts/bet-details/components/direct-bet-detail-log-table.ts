import { _decorator, Label, Node, Prefab, Sprite, SpriteFrame } from "cc";
import { BetDetailLogTable } from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-log-table";

const { ccclass, property } = _decorator;

interface BetRecord {
    refund: number;
    baseRefund: number;
    win: boolean;
    betwin: number;
    baseBetWin: number;
    totalWin: number;
    baseTotalWin: number;
    paid: boolean;
    uid: string;
    name: string;
    time: string;
    choice: string;
    amount: number;
    baseAmount: number;
    roundId: number;
    siteId: string;
    currency: string;
    rate: number;
    operatorId: string;
    playerId: string;
}

@ccclass()
export class DirectBetDetailLogTable extends BetDetailLogTable {
    @property(SpriteFrame)
    activeSpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    inactiveSpriteFrame: SpriteFrame = null;

    @property(Node)
    nodeBetNav: Node = null;

    @property(Label)
    lblStakeTotal: Label = null;

    @property(Label)
    lblRefundTotal: Label = null;

    private defaultBetChoice = "big";
    private bodyItemPrefab: any;
    private model: any;

    handleBetNav(event: Event, customEventData: string) {
        this.nodeBetNav.children.forEach((child) => {
            child.getComponent(Sprite).spriteFrame = this.inactiveSpriteFrame;
        });

        const activeNode = this.nodeBetNav.getChildByName(`btn-${customEventData}`);
        activeNode.getComponent(Sprite).spriteFrame = this.activeSpriteFrame;
        this.loadBetLogsChoice(this.bodyItemPrefab, this.model, customEventData);
    }

    showBetDetail(bodyItemPrefab: Prefab, model) {
        this.bodyItemPrefab = bodyItemPrefab;
        this.model = model;
        this.loadBetLogsChoice(this.bodyItemPrefab, this.model, this.defaultBetChoice);
    }

    loadBetLogsChoice(bodyItemPrefab: Prefab, model, choice: string) {
        this.body.removeAllChildren();

        const { betLogsChoice, total } = model;

        const betLogsChoiceData = this.filterBetsByChoice(betLogsChoice, choice);
        console.log("---betLogsChoiceData", betLogsChoiceData);

        const data = total[choice === "big" ? "0" : "1"];
        this.lblStakeTotal && (this.lblStakeTotal.string = data.betAmount.toString());
        this.lblRefundTotal && (this.lblRefundTotal.string = data.refund.toString());

        betLogsChoiceData &&
            betLogsChoiceData.forEach((betDetailsLog, index) => {
                this.body.addChild(
                    this.buildBodyRow(bodyItemPrefab, {
                        betDetailsLog: betDetailsLog[0],
                        index,
                        odds: {},
                        settlementResult: {},
                        result: {},
                        freeBet: false,
                        fractionalOddsFormat: false,
                    })
                );
            });
    }

    filterBetLogsChoice(data) {
        return data.filter((item) => item !== undefined);
    }

    filterBetsByChoice(bets: BetRecord[], choice: string): BetRecord[] {
        return bets.filter((bet) => bet[0].choice === choice);
    }
}
