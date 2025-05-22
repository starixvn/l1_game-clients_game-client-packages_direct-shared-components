import { _decorator, Label, Node, Prefab, Sprite, SpriteFrame } from "cc";
import { BetDetailLogTable } from "db://shared-components/game/bet-history/scripts/components/bet-detail/bet-detail-log-table";
import { BalancedBetDetailLogItem } from './balanced-bet-detail-log-item';

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
export class BalancedBetLogTable extends BetDetailLogTable {
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

    getChoiceData(choice: string) {
        return choice === "big" ? "0" : "1";
    }    

    setStakeTotal(data, choice: string) {
        if(!this.lblStakeTotal) {
            return;
        }

        const totalData =  data[this.getChoiceData(choice)];

        this.lblStakeTotal.string = totalData?.betAmount.toString() || "0";
        
    }

    setRefundTotal(data, choice: string) {
        if(!this.lblRefundTotal) {
            return;
        }
        const totalData = data[this.getChoiceData(choice)];

        this.lblRefundTotal.string = totalData?.refund.toString() || "0"
        
    }

    filterBetLogsChoice(data) {
        return data.filter((item) => item !== undefined);
    }

    filterBetsByChoice(bets: BetRecord[], choice: string): BetRecord[] {
        return bets.filter((bet) => bet[0].choice === choice);
    }
}
