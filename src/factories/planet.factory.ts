import { Injectable } from "../ioc/injector";
import TransformComponent from "../components/transform.component";
import Vector2 from "../util/vector-2";
import GravityAffectedComponent from "../components/gravity-affected.component";
import Entity from "../entity/entity";
import CanvasProvider from "../providers/canvas.provider";
import FocusComponent from "../components/focus.component";
import PolygonComponent from "../components/polygon.component";
import { Colors } from "../util/color";

@Injectable()
export default class PlanetFactory {
  constructor(private canvasProvider: CanvasProvider) {}

  generateSolarSystem(): Entity[] {
    const sun = this.generatePlanet(
      this.canvasProvider.ViewSize.scale(0.5),
      new Vector2(0, 0),
      50,
      Colors.Yellow,
      true
    );

    const p1 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 96,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.1),
      3,
      Colors.Grey
    );

    const p2 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 150,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.08333),
      4,
      Colors.Lime
    );

    const p3 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 288,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.06),
      5,
      Colors.Orange
    );

    const p4 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 400,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.05333),
      6,
      Colors.Blue
    );

    const p4m1 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 410,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.07),
      2,
      Colors.Black
    );

    const p5 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 768,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.04),
      15,
      Colors.Cyan
    );

    const p5m1 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 788,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.08333),
      3,
      Colors.Indigo
    );

    const p5m2 = this.generatePlanet(
      new Vector2(
        this.canvasProvider.ViewSize.x * 0.5 + 798,
        this.canvasProvider.ViewSize.y * 0.5
      ),
      new Vector2(0, 0.08),
      2,
      Colors.DodgerBlue
    );

    return [sun, p1, p2, p3, p4, p4m1, p5, p5m1, p5m2];
  }

  generatePlanet(
    position: Vector2,
    speed: Vector2,
    diameter: number,
    color: Colors,
    isFocused?: boolean
  ): Entity {
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

  // private getRandomImage(): HTMLImageElement {
  //     const image = new Image();
  //     switch (Math.floor(Math.random() * 18 + 1)) {
  //         case 1:
  //             image.src = planet01;
  //             break;
  //         case 2:
  //             image.src = planet02;
  //             break;
  //         case 3:
  //             image.src = planet03;
  //             break;
  //         case 4:
  //             image.src = planet04;
  //             break;
  //         case 5:
  //             image.src = planet05;
  //             break;
  //         case 6:
  //             image.src = planet06;
  //             break;
  //         case 7:
  //             image.src = planet07;
  //             break;
  //         case 8:
  //             image.src = planet08;
  //             break;
  //         case 9:
  //             image.src = planet09;
  //             break;
  //         case 10:
  //             image.src = planet10;
  //             break;
  //         case 11:
  //             image.src = planet11;
  //             break;
  //         case 12:
  //             image.src = planet12;
  //             break;
  //         case 13:
  //             image.src = planet13;
  //             break;
  //         case 14:
  //             image.src = planet14;
  //             break;
  //         case 15:
  //             image.src = planet15;
  //             break;
  //         case 16:
  //             image.src = planet16;
  //             break;
  //         case 17:
  //             image.src = planet17;
  //             break;
  //         default:
  //             image.src = planet18;
  //             break;
  //     }
  //     return image;
  // }
}
