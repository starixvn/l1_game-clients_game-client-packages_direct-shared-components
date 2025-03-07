import { _decorator } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import Observer from "observer";
const { ccclass, property } = _decorator;
const { observer, render, handle } = Observer;

@ccclass
export class BetDetailBalancedBettingSummary extends ObserverComponent {}
