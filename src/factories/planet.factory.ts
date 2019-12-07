import { Injectable } from '../ioc/injector';
import TransformComponent from '../components/transform.component';
import Vector2 from '../util/vector-2';
import GravityAffectedComponent from '../components/gravity-affected.component';
import Entity from '../entity/entity';
import FocusComponent from '../components/focus.component';
import PolygonComponent from '../components/polygon.component';
import { Colors } from '../util/color';

@Injectable()
export default class PlanetFactory {
    constructor() {}

    generateSolarSystem(): Entity[] {
        const sun = this.generatePlanet(new Vector2(0, 0), new Vector2(0, 0), 1200, Colors.White, true);
        const p1 = this.generatePlanet(new Vector2(400, 0), new Vector2(0, 0.0575), 24, Colors.Grey);
        const p2 = this.generatePlanet(new Vector2(-400, 0), new Vector2(0, -0.0575), 24, Colors.Grey);

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
}
