import { _decorator, Label, Node, Prefab, Sprite, SpriteFrame } from "cc";
import { BetDetailLogTable } from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-log-table";

const { ccclass, property } = _decorator;

@ccclass()
export class BalancedBetLogTable extends BetDetailLogTable {
    @property({ type: String, override: true, visible: false })
    refundChoices = "";

    @property(SpriteFrame)
    activeSpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    inactiveSpriteFrame: SpriteFrame = null;

    @property(Node)
    nodeChoiceContainer: Node = null;

    @property(Label)
    lblStakeTotal: Label = null;

    @property(Label)
    lblRefundTotal: Label = null;

    protected defaultBetChoice = "big";
    private bodyItemPrefab: any;
    private roundBettingInfo: any;

    onClickBetChoice(event: Event, customEventData: string) {
        this.nodeChoiceContainer.children.forEach((child) => {
            child.getComponent(Sprite).spriteFrame = this.inactiveSpriteFrame;
        });

        const activeNode = this.nodeChoiceContainer.getChildByName(`btn-${customEventData}`);
        activeNode.getComponent(Sprite).spriteFrame = this.activeSpriteFrame;
        this.loadBetLogsChoice(this.bodyItemPrefab, this.roundBettingInfo, customEventData);
    }

    showBetDetail(bodyItemPrefab: Prefab, roundBettingInfo) {
        this.bodyItemPrefab = bodyItemPrefab;
        this.roundBettingInfo = roundBettingInfo;
        this.loadBetLogsChoice(this.bodyItemPrefab, this.roundBettingInfo, this.defaultBetChoice);
    }

    loadBetLogsChoice(bodyItemPrefab: Prefab, model, choice: string) {
        this.body.removeAllChildren();

        const { betLogsChoice, total } = model;

        const betLogsChoiceData = betLogsChoice[this.getChoiceData(choice)] || [];

        this.setStakeTotal(total, choice);
        this.setRefundTotal(total, choice);

        betLogsChoiceData &&
            betLogsChoiceData.forEach((betDetailsLog, index) => {
                this.body.addChild(
                    this.buildBodyRow(bodyItemPrefab, {
                        betDetailsLog: betDetailsLog,
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

    getChoiceData(choice: string): number {
        return 0; // override in child class
    }

    setStakeTotal(total, choice: string) {
        if (!this.lblStakeTotal) {
            return;
        }

        const totalData = total[this.getChoiceData(choice)];

        this.lblStakeTotal.string = totalData?.betAmount.toString() || "0";
    }

    setRefundTotal(total, choice: string) {
        if (!this.lblRefundTotal) {
            return;
        }
        const totalData = total[this.getChoiceData(choice)];

        this.lblRefundTotal.string = totalData?.refund.toString() || "0";
    }
}
