import { Injectable } from '../ioc/injector';
import SpriteComponent from '../components/sprite.component';
import TransformComponent from '../components/transform.component';
import Vector2 from '../vector-2';
import GravityAffectedComponent from '../components/gravity-affected.component';
import Entity from '../entity/entity';

import planet01 from '../assets/planet01.png';
import planet02 from '../assets/planet02.png';
import planet03 from '../assets/planet03.png';
import planet04 from '../assets/planet04.png';
import planet05 from '../assets/planet05.png';
import planet06 from '../assets/planet06.png';
import planet07 from '../assets/planet07.png';
import planet08 from '../assets/planet08.png';
import planet09 from '../assets/planet09.png';
import planet10 from '../assets/planet10.png';
import planet11 from '../assets/planet11.png';
import planet12 from '../assets/planet12.png';
import planet13 from '../assets/planet13.png';
import planet14 from '../assets/planet14.png';
import planet15 from '../assets/planet15.png';
import planet16 from '../assets/planet16.png';
import planet17 from '../assets/planet17.png';
import planet18 from '../assets/planet18.png';
import CanvasProvider from '../providers/canvas.provider';
import FocusComponent from '../components/focus.component';

@Injectable()
export default class PlanetFactory {
    constructor(private canvasProvider: CanvasProvider) {}

    generateSolarSystem(): Entity[] {
        const sun = this.generatePlanet(
            this.canvasProvider.ViewSize.scale(0.5),
            new Vector2(0, 0),
            50,
            this.getRandomImage(),
            true
        );

        const p1 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 96, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.1),
            3,
            this.getRandomImage()
        );

        const p2 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 150, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.08333),
            4,
            this.getRandomImage()
        );

        const p3 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 288, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.06),
            5,
            this.getRandomImage()
        );

        const p4 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 400, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.05333),
            6,
            this.getRandomImage()
        );

        const p4m1 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 410, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.07),
            2,
            this.getRandomImage()
        );

        const p5 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 768, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.04),
            15,
            this.getRandomImage()
        );

        const p5m1 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 788, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.08333),
            3,
            this.getRandomImage()
        );

        const p5m2 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 798, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.08),
            2,
            this.getRandomImage()
        );

        return [sun, p1, p2, p3, p4, p4m1, p5, p5m1, p5m2];
    }

    generatePlanet(
        position: Vector2,
        speed: Vector2,
        diameter: number,
        image: HTMLImageElement,
        isFocused?: boolean
    ): Entity {
        const sprite = new SpriteComponent({
            image: image,
            cutoutPosition: new Vector2(0, 0),
            cutoutSize: new Vector2(300, 300),
            offset: new Vector2(150, 150)
        });

        const transform = new TransformComponent({
            position: position,
            scale: new Vector2(diameter * 3, diameter * 3)
        });

        const gravityAssisted = new GravityAffectedComponent({
            mass: Math.pow(diameter, 3),
            preUpdatedPosition: transform.position,
            velocity: speed
        });

        let focus = new FocusComponent({ isFocused: isFocused });

        const planet = new Entity();
        planet.push(sprite);
        planet.push(transform);
        planet.push(gravityAssisted);
        planet.push(focus);

        return planet;
    }

    generateRandomPlanet(): Entity {
        return this.generatePlanet(
            new Vector2(
                Math.floor(Math.random() * this.canvasProvider.ViewSize.x),
                Math.floor(Math.random() * this.canvasProvider.ViewSize.y)
            ),
            Vector2.getRandomVector(new Vector2(0.1, 0.1), true),
            10 + Math.floor(Math.random() * 40),
            this.getRandomImage()
        );
    }

    private getRandomImage(): HTMLImageElement {
        const image = new Image();
        switch (Math.floor(Math.random() * 18 + 1)) {
            case 1:
                image.src = planet01;
                break;
            case 2:
                image.src = planet02;
                break;
            case 3:
                image.src = planet03;
                break;
            case 4:
                image.src = planet04;
                break;
            case 5:
                image.src = planet05;
                break;
            case 6:
                image.src = planet06;
                break;
            case 7:
                image.src = planet07;
                break;
            case 8:
                image.src = planet08;
                break;
            case 9:
                image.src = planet09;
                break;
            case 10:
                image.src = planet10;
                break;
            case 11:
                image.src = planet11;
                break;
            case 12:
                image.src = planet12;
                break;
            case 13:
                image.src = planet13;
                break;
            case 14:
                image.src = planet14;
                break;
            case 15:
                image.src = planet15;
                break;
            case 16:
                image.src = planet16;
                break;
            case 17:
                image.src = planet17;
                break;
            default:
                image.src = planet18;
                break;
        }
        return image;
    }
}
