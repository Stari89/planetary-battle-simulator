import { Injectable } from '../ioc/injector';
import PlanetFactory from './planet.factory';
import StarfieldFactory from './starfield.factory';
import GridComponent, { GridWeight } from '../components/grid.component';
import TransformComponent from '../components/transform.component';
import SpriteComponent from '../components/sprite.component';
import splashSrc from '../assets/splash.jpg';
import CanvasProvider from '../providers/canvas.provider';
import Vector2 from '../vector-2';
import CameraComponent from '../components/camera.component';
import { Luminosity } from '../components/starfield.component';
import Entity from '../entity/entity';

@Injectable()
export default class SceneFactory {
    constructor(
        private planetFactory: PlanetFactory,
        private starfieldFactory: StarfieldFactory,
        private canvasProvider: CanvasProvider
    ) {}

    generateSimulationScene(): Array<Entity> {
        const entities: Array<Entity> = [];

        entities.push(this.generateCamera());

        entities.push(this.starfieldFactory.generateStarfield(10, Luminosity.Bright));
        entities.push(this.starfieldFactory.generateStarfield(100, Luminosity.Normal));
        entities.push(this.starfieldFactory.generateStarfield(1000, Luminosity.Dim));
        entities.push(this.generateGrid(100, GridWeight.strong));

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

    private generateGrid(resolution: number, weight: GridWeight): Entity {
        const gridComponent = new GridComponent({
            resolution: resolution,
            weight: weight
        });
        const grid = new Entity();
        grid.push(gridComponent);
        return grid;
    }

    private generateCamera(): Entity {
        const camera = new Entity();
        camera.push(new TransformComponent());
        camera.push(new CameraComponent());

        return camera;
    }

    private generateSplash(): Entity {
        const transform = new TransformComponent({
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
