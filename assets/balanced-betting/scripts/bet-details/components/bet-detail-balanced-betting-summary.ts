import gc from "@sg/game-client-base";
import { _decorator, Component, Label, Sprite, SpriteFrame } from "cc";
import Observer from "observer";

import { RoundBalancedBettingHandler } from "../round-balanced-betting-handler";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";

const { ccclass, property } = _decorator;
const { observer, render, handle } = Observer;
const { DateTimeUtils } = gc;

export class BaseBetDetailSummaryTable extends ObserverComponent {
    renderResult(roundBettingInfo) {}
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

    private roundId: number;

    renderResult(roundBettingInfo) {
        if (!roundBettingInfo) {
            return;
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
    }

    getTextFollowChoice({ settlementResult }): string {
        return settlementResult.big ? "big" : "small";
    }

    @handle(RoundBalancedBettingHandler)
    handleNextRound(roundId: number) {
        return roundId;
    }

    onClickNextRound(event: Event) {
        this.roundId = this.roundId + 1;
        this.handleNextRound(this.roundId);
    }

    onClickPreviousRound(event: Event) {
        this.roundId = this.roundId - 1;
        this.handleNextRound(this.roundId);
    }
}
