import { _decorator, Component, Node, director, Label, Prefab, instantiate, Vec3 } from 'cc';
import { Card } from './gameObject/Card';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Label)
    levelLable: Label;

    @property(Label)
    scoreLabel: Label;

    @property(Prefab)
    cardPrefab: Prefab;

    @property(Node)
    cardGroup: Node

    NUM_OF_COL = 5;
    NUM_OF_ROW = 2;
    CARD_WITH = 110;
    CARD_HEIGHT = 130;
    CARD_TYPE_LIST1 = []
    CARD_LIST_TAN_SUAT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    CARD_TYPE_LIST = []
    cardList:Node [] = []
    oldCard = null;
    start() {
        this.randomList()
        let count = 0;
        for (let i = 0; i < this.NUM_OF_COL; i++) {
            for (let j = 0; j < this.NUM_OF_ROW; j++) {

                let card = instantiate(this.cardPrefab)
                let cardType = this.CARD_TYPE_LIST[count];
                count++;
                card.getComponent(Card).setUp(cardType, (card: Card) => {
                   
                    this.onTouchCard(card);
                })
                let x = -250 + i * (this.CARD_WITH + 3)
                let y = 0 + j * (this.CARD_HEIGHT + 3);
                card.setPosition(new Vec3(x, y, 0));
                this.cardGroup.addChild(card);
                this.cardList.push(card);
                console.log(this.cardList);
            }
        }

    }

    length = 0;
    randomList(){
        let random = Math.floor(Math.random() * 5) + 1
        if(this.CARD_LIST_TAN_SUAT[random] < 2){
            this.CARD_LIST_TAN_SUAT[random] += 1;
            this.CARD_TYPE_LIST[this.length] = random;
            this.length++;
        }
        else{
            this.randomList();
        }

        if(this.length == 10){
            return;
        }
        else{
            this.randomList();
        }
    }

    update(deltaTime: number) {

    }

    onclickExitGame() {
        director.loadScene("menu");

    }
    isPaused = false;
    onTouchCard(card: Card) {
        if(this.isPaused)return;
        if (this.oldCard == card) {
            card.closeCard();
            this.oldCard = null;
        }
        else {
            card.upCard(() => {
                if (this.oldCard == null) {
                    this.oldCard = card;
                } else {
                    if (this.oldCard.cardType == card.cardType) {
                        let removeIndex1 = this.cardList.findIndex( item => item === this.oldCard.node);
                        this.cardList.splice(removeIndex1, 1);
                        this.oldCard.node.destroy();
                        let removeIndex = this.cardList.findIndex( item => item === card.node);
                        this.cardList.splice(removeIndex, 1);
                        card.node.destroy();
                        this.oldCard = null;
                        console.log(this.cardList)
                    }
                    else {
                        this.oldCard.closeCard(()=>{
                            this.oldCard = null;
                        });
                        card.closeCard();
                    }
                }
            });
        }

        
    }

}


