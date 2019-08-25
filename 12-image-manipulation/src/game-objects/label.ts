import GameObject from './game-object';
import CanvasManager from '../managers/canvas-manager';
import { OnRender } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop-manager';
import { Injectable } from '../ioc/injector';
import Vector2 from '../vector-2';

@Injectable()
export default class Label extends GameObject implements OnRender {
	public text: string;
	public position: Vector2;

	constructor(protected canvasManager: CanvasManager) {
		super();
		this.position = new Vector2(0, 0);
	}

	public onRender(loopInfo: ILoopInfo) {
		const ctx = this.canvasManager.Context;
		ctx.font = '20px Arial';
		ctx.fillStyle = 'black';
		ctx.fillText(`${this.text}`, this.position.x, this.position.y);
	}
}
