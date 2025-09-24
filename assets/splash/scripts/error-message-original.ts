import { _decorator } from "cc";
import { ErrorMessage } from "db://shared-components/splash/scripts/error-message";
import { RandomWaitingMessageOriginal } from "db://shared-components/shared/common-components/random-waiting-message-original";

const { ccclass, property } = _decorator;

@ccclass
export class ErrorMessageOriginal extends ErrorMessage {
    @property(RandomWaitingMessageOriginal)
    cmpMessage: RandomWaitingMessageOriginal = null;

    setMessage(message: string) {
        if (this.cmpMessage) {
            this.cmpMessage.reset();
        }
        this.lblMessage.string = message;
    }
}
