import { Injectable } from '../ioc/injector';
import GridComponent from '../components/grid.component';
import Entity from '../entity/entity';
import TransformComponent from '../components/transform.component';
import PolygonComponent from '../components/polygon.component';
import ColorFactory from './color.factory';
import { ColorChannelBrightness } from '../util/color';

@Injectable()
export default class GridFactory {
    constructor(private colorFactory: ColorFactory) {}

    generateGrid(): Entity {
        const grid = new GridComponent({
            resolution: 100
        });

        const gridEntity = new Entity();
        gridEntity.push(grid);
        gridEntity.push(new TransformComponent());
        gridEntity.push(new PolygonComponent({ lineColor: this.colorFactory.getGrey(ColorChannelBrightness._1) }));
        return gridEntity;
    }
}
