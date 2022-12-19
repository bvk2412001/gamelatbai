import { _decorator, Component, Node, SpriteFrame, Sprite, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    @property(SpriteFrame)
    cardSpriteFrame: SpriteFrame[] = [];

    @property(Sprite)
    cardSprite: Sprite;


    cardType;
    callback;

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchCard, this)
    }

    update(deltaTime: number) {

    }

    onTouchCard() {
        this.callback(this);
    }

    setUp(type, callBack) {
        this.cardType = type;
        this.callback = callBack;
        this.cardSprite.spriteFrame = this.cardSpriteFrame[0];
    }

    closeCard(finishcallBack = null) {
        tween(this.cardSprite.node).sequence(
            tween(this.cardSprite.node).to(0.2, { scale: new Vec3(0, 1, 0) }),
            tween(this.cardSprite.node).call(() => {
                this.cardSprite.spriteFrame = this.cardSpriteFrame[0];
            }),
            tween(this.cardSprite.node).to(0.2, { scale: new Vec3(1, 1, 1) }),
            tween(this.cardSprite.node).delay(0.5),
            tween(this.cardSprite.node).call(() => {
                if (finishcallBack) {
                    finishcallBack();
                }
            })
        ).start()
    }

    upCard(finishcallBack) {
        tween(this.cardSprite.node).sequence(
            tween(this.cardSprite.node).to(0.2, { scale: new Vec3(0, 1, 0) }),
            tween(this.cardSprite.node).call(() => {
                this.cardSprite.spriteFrame = this.cardSpriteFrame[this.cardType];
            }),
            tween(this.cardSprite.node).to(0.2, { scale: new Vec3(1, 1, 1) }),
            tween(this.cardSprite.node).delay(0.5),
            tween(this.cardSprite.node).call(() => {
                finishcallBack();
            })
        ).start();
    }
}


