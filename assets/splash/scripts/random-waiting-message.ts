import gc from "@sg/game-client-base";
import { _decorator, Component, Label, tween, Tween, UIOpacity, v3, Node, TweenEasing } from "cc";
import { shuffle } from "lodash-es";
const { ccclass, property } = _decorator;

@ccclass
export class RandomWaitingMessage extends Component {
    @property(Label)
    messageLabel: Label = null;

    private static readonly ANIM_DURATION = 1;
    private static readonly DISPLAY_TIME = 4;
    private static readonly MOVE_Y = 35;
    private static readonly EASING_IN = "sineIn";
    private static readonly EASING_OUT = "sineOut";
    private static readonly OPACITY_VISIBLE = 255;
    private static readonly OPACITY_HIDDEN = 0;

    private currentIndex = 0;
    private messageList = ["message_download_first_visit", "splash_check_downloading"];
    messageTween: Tween<Node>;
    private uiOpacity: UIOpacity;

    onLoad() {
        this.uiOpacity =
            this.messageLabel.node.getComponent(UIOpacity) ||
            this.messageLabel.node.addComponent(UIOpacity);

        this.messageList = shuffle(this.messageList);
        this.showMessage(0);
    }

    private setMessage(text: string): void {
        if (this.messageLabel) {
            this.messageLabel.string = text;
        }
    }

    private createTween(
        node: Node,
        duration: number,
        posY: number,
        targetOpacity: number,
        easing: TweenEasing
    ): Tween<Node> {
        return tween(node).parallel(
            tween().to(duration, { position: v3(0, posY, 0) }, { easing }),
            tween(this.uiOpacity).to(duration, { opacity: targetOpacity }, { easing })
        );
    }

    showMessage(duration = 1): void {
        this.currentIndex = (this.currentIndex + 1) % this.messageList.length;

        this.setMessage(gc.Translator.commonTranslate(this.messageList[this.currentIndex]));

        const messageNode = this.messageLabel.node;
        messageNode.position = v3(messageNode.position.x, -RandomWaitingMessage.MOVE_Y, 0);
        this.uiOpacity.opacity = RandomWaitingMessage.OPACITY_HIDDEN;

        this.messageTween = this.createTween(
            messageNode,
            duration,
            0,
            RandomWaitingMessage.OPACITY_VISIBLE,
            RandomWaitingMessage.EASING_IN
        )
            .delay(RandomWaitingMessage.DISPLAY_TIME)
            .call(() => this.hideMessage())
            .start();
    }

    hideMessage(): void {
        this.messageTween = this.createTween(
            this.messageLabel.node,
            RandomWaitingMessage.ANIM_DURATION,
            RandomWaitingMessage.MOVE_Y,
            RandomWaitingMessage.OPACITY_HIDDEN,
            RandomWaitingMessage.EASING_OUT
        )
            .call(() => this.showMessage())
            .start();
    }
}
