import { _decorator, Component, Node, view, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GuideRotate")
export class GuideRotate extends Component {
    @property(Node)
    container: Node = null;

    private checkOrientation(): boolean {
        if (sys.isBrowser && !sys.isMobile) {
            return false;
        }

        const size = view.getVisibleSize();
        return size.width > size.height;
    }

    protected onLoad(): void {
        this.container.active = this.checkOrientation();
        view.on("canvas-resize", () => {
            this.container.active = this.checkOrientation();
        });
    }

    protected onDestroy(): void {
        view.off("canvas-resize");
    }
}
