import { _decorator, Component, instantiate, Label, Prefab, Sprite, SpriteFrame, Node } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import gc from "@sg/game-client-base";
import Observer from "observer";
import { RoundBalancedBettingHandler } from "../round-balanced-betting-handler";
const { ccclass, property } = _decorator;
const { observer, render, handle } = Observer;
const { DateTimeUtils } = gc;
export class BaseBetDetailSummaryTable extends Component {
    renderResult(roundBettingInfo, resultPrefab: Prefab | null) { }
}
@ccclass
export class BetDetailBalancedBettingSummary extends BaseBetDetailSummaryTable {
    @property(Label)
    lblRound: Label = null;

    @property(Label)
    lblDate: Label = null;

    @property(Label)
    totalDices: Label = null;

    @property([Sprite])
    dices: Sprite[] = [];

    @property([SpriteFrame])
    dicesSpriteFrames: SpriteFrame[] = [];

    @property(SpriteFrame)
    historySpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    activeSpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    inactiveSpriteFrame: SpriteFrame = null;

    @property(Node)
    nodeBetNav: Node = null;

    private roundId: number;

    renderResult(roundBettingInfo, resultPrefab: Prefab | null) {
        if (!roundBettingInfo) {
            return
        }
        const { id, result, time, settlementResult } = roundBettingInfo;
        const totalDice = result.dice1 + result.dice2 + result.dice3;
        const choice = this.getTextFollowChoice({ settlementResult });
        this.roundId = id;
        this.lblRound.string = id;
        this.lblDate && (this.lblDate.string = `${DateTimeUtils.getStringDate1(time)} ${DateTimeUtils.getString12HourByTime(time)}`);
        this.totalDices.string = `- ${gc.Translator.translate(`BigSmall.glossary_${choice}`)} ${totalDice}`;
        this.dices[0].spriteFrame = this.dicesSpriteFrames[result.dice1 - 1];
        this.dices[1].spriteFrame = this.dicesSpriteFrames[result.dice2 - 1];
        this.dices[2].spriteFrame = this.dicesSpriteFrames[result.dice3 - 1];
        this.setActiveBetNav(choice);
    }

    getTextFollowChoice({ settlementResult }): string {
        return settlementResult.big ? "big" : "small";
    }

    setActiveBetNav(choice: string) {
        this.nodeBetNav.getChildByName(`history-bttn-tab-normal-${choice}`).getComponent(Sprite).spriteFrame = this.historySpriteFrame;
    }

    handleBetNav(event: Event, customEventData: string) {
        const bigNode = this.nodeBetNav.getChildByName('history-bttn-tab-normal-big');
        const smallNode = this.nodeBetNav.getChildByName('history-bttn-tab-normal-small');

        bigNode.getComponent(Sprite).spriteFrame = customEventData === 'big' ? this.activeSpriteFrame : this.inactiveSpriteFrame;
        smallNode.getComponent(Sprite).spriteFrame = customEventData === 'small' ? this.activeSpriteFrame : this.inactiveSpriteFrame;

        this.setActiveBetNav(customEventData);
    }
    @handle(RoundBalancedBettingHandler)
    handleNextBet(event: Event) {
        const round = this.roundId++;
        return round;
    }
    @handle(RoundBalancedBettingHandler)
    handlePreviousBet(event: Event) {
        const round = this.roundId--;
        return round;
    }
}
