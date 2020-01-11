import { Injectable } from '../ioc/injector';
import PlanetFactory from './planet.factory';
import StarfieldFactory from './starfield.factory';
import TransformComponent from '../components/transform.component';
import SpriteComponent from '../components/sprite.component';
import splashSrc from '../assets/splash.jpg';
import CanvasProvider from '../providers/canvas.provider';
import Vector2 from '../util/vector-2';
import CameraComponent from '../components/camera.component';
import Entity from '../entity/entity';
import GridFactory from './grid.factory';
import ColorFactory from './color.factory';
import { ColorChannelBrightness } from '../util/color';

@Injectable()
export default class SceneFactory {
    constructor(
        private planetFactory: PlanetFactory,
        private starfieldFactory: StarfieldFactory,
        private gridFactory: GridFactory,
        private canvasProvider: CanvasProvider,
        private colorFactory: ColorFactory
    ) {}

    generateSimulationScene(): Array<Entity> {
        const entities: Array<Entity> = [];

        entities.push(this.generateCamera());
        entities.push(
            this.starfieldFactory.generateStarfieldBackground(10, this.colorFactory.getWhite(ColorChannelBrightness._3))
        );
        entities.push(
            this.starfieldFactory.generateStarfieldBackground(
                100,
                this.colorFactory.getWhite(ColorChannelBrightness._2)
            )
        );
        entities.push(
            this.starfieldFactory.generateStarfieldBackground(
                1000,
                this.colorFactory.getWhite(ColorChannelBrightness._1)
            )
        );

        entities.push(this.gridFactory.generateGrid());

        const solarSystem = this.planetFactory.generateSolarSystem();
        solarSystem.forEach(item => {
            entities.push(item);
        });
        return entities;
    }

    generateSplashScene(): Array<Entity> {
        const entities: Array<Entity> = [];
        entities.push(this.generateCamera());
        entities.push(this.generateSplash());
        return entities;
    }

    private generateCamera(): Entity {
        const camera = new Entity();
        camera.push(new TransformComponent());
        camera.push(new CameraComponent());

        return camera;
    }

    private generateSplash(): Entity {
        const transform = new TransformComponent({
            position: this.canvasProvider.ViewSize.scale(0.5),
            scale: new Vector2(this.canvasProvider.ViewSize.x / 3, (this.canvasProvider.ViewSize.x / 3 / 1200) * 859)
        });

        const sprite = new SpriteComponent();
        sprite.image = new Image();
        sprite.image.src = splashSrc;
        sprite.cutoutPosition = new Vector2(0, 0);
        sprite.cutoutSize = new Vector2(1200, 859);
        sprite.offset = new Vector2(600, 429);

        const splash = new Entity();
        splash.push(transform);
        splash.push(sprite);

        return splash;
    }
}
