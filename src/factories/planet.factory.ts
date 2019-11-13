import { Injectable } from '../ioc/injector';
import TransformComponent from '../components/transform.component';
import Vector2 from '../util/vector-2';
import GravityAffectedComponent from '../components/gravity-affected.component';
import Entity from '../entity/entity';
import CanvasProvider from '../providers/canvas.provider';
import FocusComponent from '../components/focus.component';
import PolygonComponent from '../components/polygon.component';
import { Colors } from '../util/color';

@Injectable()
export default class PlanetFactory {
    constructor(private canvasProvider: CanvasProvider) {}

    generateSolarSystem(): Entity[] {
        const sun = this.generatePlanet(
            this.canvasProvider.ViewSize.scale(0.5),
            new Vector2(0, 0),
            1200,
            Colors.White,
            true
        );

        const p1 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 + 400, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, 0.0575),
            24,
            Colors.Grey
        );

        const p2 = this.generatePlanet(
            new Vector2(this.canvasProvider.ViewSize.x * 0.5 - 400, this.canvasProvider.ViewSize.y * 0.5),
            new Vector2(0, -0.0575),
            24,
            Colors.Grey
        );

        return [sun, p1, p2];
    }

    generatePlanet(position: Vector2, speed: Vector2, diameter: number, color: Colors, isFocused?: boolean): Entity {
        const transform = new TransformComponent({
            position: position,
            scale: new Vector2(diameter, diameter)
        });

        const gravityAssisted = new GravityAffectedComponent({
            mass: Math.pow(diameter, 3),
            preUpdatedPosition: transform.position,
            velocity: speed
        });

        let focus = new FocusComponent({ isFocused: isFocused });

        const points: Array<Vector2> = [];
        let rad = 0;
        while (rad < 2 * Math.PI) {
            points.push(new Vector2(Math.cos(rad) / 4, Math.sin(rad) / 4));
            rad += (Math.PI * 2) / 64;
        }
        const polygon = new PolygonComponent({
            points: points,
            center: new Vector2(0, 0),
            lineColor: color
        });

        const planet = new Entity();
        planet.push(transform);
        planet.push(gravityAssisted);
        planet.push(focus);
        planet.push(polygon);

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
            Colors.Yellow
        );
    }
}
