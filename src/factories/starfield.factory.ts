import { Injectable } from '../ioc/injector';
import CanvasProvider from '../providers/canvas.provider';
import TransformComponent from '../components/transform.component';
import Vector2 from '../util/vector-2';
import Entity from '../entity/entity';
import Color, { ColorChannelBrightness } from '../util/color';
import BackgroundComponent, { Paralax } from '../components/background.component';

@Injectable()
export default class StarfieldFactory {
    private starfieldSize: Vector2;

    constructor(private canvasProvider: CanvasProvider) {
        this.starfieldSize = canvasProvider.ViewSize;
    }

    generateStarfieldBackground(ppm: number, starColor: Color): Entity {
        const img = new Image();
        img.src = this.generateStarfieldImage(ppm, starColor);
        let paralax: Paralax;
        switch (starColor.alpha) {
            case ColorChannelBrightness._3:
                paralax = Paralax.Medium;
                break;
            case ColorChannelBrightness._2:
                paralax = Paralax.Far;
                break;
            case ColorChannelBrightness._1:
                paralax = Paralax.VeryFar;
                break;
            default:
                paralax = Paralax.Near;
                break;
        }

        const backgroundComponent = new BackgroundComponent({
            image: img,
            cutoutSize: this.starfieldSize,
            tileSize: this.starfieldSize,
            paralax: paralax
        });
        const transformComponent = new TransformComponent({ scale: this.starfieldSize });
        const entity = new Entity();
        entity.push(backgroundComponent);
        entity.push(transformComponent);

        return entity;
    }

    private generateStarfieldImage(ppm: number, color: Color): string {
        const view = this.starfieldSize;

        const canvas = document.createElement('canvas');
        canvas.width = view.x;
        canvas.height = view.y;
        canvas.style.backgroundColor = '#00000000';
        const ctx = canvas.getContext('2d');

        const pixelCount = view.x * view.y;
        const starCount = Math.floor((pixelCount * ppm) / 1000000);

        ctx.clearRect(0, 0, view.x, view.y);
        for (let i = 0; i < starCount; i++) {
            const star: Vector2 = Vector2.getRandomVector(this.starfieldSize, false);

            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x + 1, star.y);
            ctx.strokeStyle = color.toString();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(star.x - 1, star.y - 1);
            ctx.lineTo(star.x, star.y - 1);
            ctx.strokeStyle = color.ghostRed.toString();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(star.x + 1, star.y + 1);
            ctx.lineTo(star.x + 2, star.y + 1);
            ctx.strokeStyle = color.ghostBlue.toString();
            ctx.stroke();
        }
        return canvas.toDataURL('image/png');
    }
}
