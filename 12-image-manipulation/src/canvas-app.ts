import { Injectable } from './ioc/injector';
import GameLoopProvider from './providers/game-loop.provider';
import InputProvider from './providers/input.provider';
import CanvasProvider from './providers/canvas.provider';
import GameObjectsProvider from './providers/game-objects.provider';
import LabelSystem from './systems/label.system';
import PressedKeysLabelSystem from './systems/pressed-keys-label.system';
import MouseScrollLabelSystem from './systems/mouse-scroll-label.system';
import MouseStateLabelSystem from './systems/mouse-state-label.system';
import ImageTransformSystem from './systems/image-transform.system';
import TouchStateLabelSystem from './systems/touch-state-label.system';

@Injectable()
export default class CanvasApp {
    constructor(
        private gameLoopManager: GameLoopProvider,
        private inputManager: InputProvider,
        private canvasManager: CanvasProvider,
        private gameObjectsManager: GameObjectsProvider,
        private labelSystem: LabelSystem,
        private pressedKeysLabelSystem: PressedKeysLabelSystem,
        private mouseScrollLabelSystem: MouseScrollLabelSystem,
        private mouseStateLabelSystem: MouseStateLabelSystem,
        private imageTransformSystem: ImageTransformSystem,
        private touchStateLabelSystem: TouchStateLabelSystem
    ) {
        gameLoopManager.run();
    }
}
