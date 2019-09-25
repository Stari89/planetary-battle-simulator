import { Injectable } from '../ioc/injector';
import LabelEntity from '../entities/label.entity';
import TransformComponent from '../components/transform.component';
import Vector2 from '../vector-2';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity from '../entities/base.entity';
import PressedKeysLabelEntity from '../entities/pressed-keys-label.entity';
import PressedKeysComponent from '../components/pressed-keys.component';
import MouseScrollLabelEntity from '../entities/mouse-scroll-label.entity';
import MouseScrollComponent from '../components/mouse-scroll.component';
import MouseStateLabelEntity from '../entities/mouse-state-label.entity';
import MouseStateComponent from '../components/mouse-state.component';
import SpriteEntity from '../entities/sprite.entity';
import Kitty from '../assets/Kitty.jpg';
import ImageComponent from '../components/image.component';
import TouchStateLabelEntity from '../entities/touch-state-label.entity';
import TouchStateComponent from '../components/touch-state.component';

@Injectable()
export default class GameObjectsProvider {
    public readonly gameObjectItems: Array<BaseEntity>;

    constructor() {
        const image = new Image();
        image.src = Kitty;

        this.gameObjectItems = [
            new LabelEntity(
                new TransformComponent(new Vector2(10, 40), new Vector2(1, 1), 0),
                new LabelTextComponent('Test Label', 'black', '20px Arial')
            ),
            new PressedKeysLabelEntity(
                new TransformComponent(new Vector2(10, 80), new Vector2(1, 1), 0),
                new LabelTextComponent('', 'black', '20px Arial'),
                new PressedKeysComponent()
            ),
            new MouseScrollLabelEntity(
                new TransformComponent(new Vector2(10, 120), new Vector2(1, 1), 0),
                new LabelTextComponent('', 'black', '20px Arial'),
                new MouseScrollComponent()
            ),
            new MouseStateLabelEntity(
                new TransformComponent(new Vector2(10, 160), new Vector2(1, 1), 0),
                new LabelTextComponent('', 'black', '20px Arial'),
                new MouseStateComponent()
            ),
            new TouchStateLabelEntity(
                new TransformComponent(new Vector2(10, 200), new Vector2(1, 1), 0),
                new LabelTextComponent('', 'black', '20px Arial'),
                new TouchStateComponent()
            ),
            new SpriteEntity(
                new TransformComponent(new Vector2(10, 240), new Vector2(300, 300), 0),
                new ImageComponent(image)
            )
        ];
    }
}
