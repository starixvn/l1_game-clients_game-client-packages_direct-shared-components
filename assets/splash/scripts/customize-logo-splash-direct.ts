import { _decorator } from "cc";
import * as i18n from "db://i18n/LanguageData";
import { OperatorUtils } from "db://shared-components/shared/utils";
import { CustomizeLogoSplash } from "db://shared-components/splash/scripts/components/customize-logo-splash";
const { ccclass } = _decorator;


@ccclass
export class CustomizeLogoSplashDirect extends CustomizeLogoSplash {

    protected createTagLinePath() {
        const operator = OperatorUtils.getOperatorAlias();
        let taglinePath = "";
        if (operator === "OTHER") {
            return;
        }
        const lang = i18n._language;
        const tagName = `splash_${operator.toLowerCase()}_text_${lang}`;
        if (operator === "SabaPlay") {
            taglinePath = `${this.href}images/${tagName}.webp?v=${this.versionImg}`;
        } else {
            taglinePath = `${this.href}images/splash_text_${lang}.webp?v=${this.versionImg}`;
        }
        return taglinePath;
    }
}
