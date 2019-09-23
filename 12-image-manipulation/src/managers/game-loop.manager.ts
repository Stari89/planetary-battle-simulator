import { Injectable, System } from '../ioc/injector';
import { ContainerEventEmitter } from '../ioc/event-delegator';
import { LifecycleEvents } from '../lifecycle';

@System()
@Injectable()
export default class GameLoopManager extends ContainerEventEmitter {
	private readonly tUpdate: number = 1000 / 240;
	private loopInfo: ILoopInfo;
	private breakLoop: boolean;

	constructor() {
		super();

		this.loop = this.loop.bind(this);
		this.update = this.update.bind(this);
		this.afterUpdate = this.afterUpdate.bind(this);
		this.render = this.render.bind(this);

		const now = performance.now();
		this.loopInfo = {
			dtUpdate: this.tUpdate,
			tUpdate: now,
			dtRender: NaN,
			tRender: now
		};
	}

	public run(): void {
		this.emit(LifecycleEvents.OnRun);
		this.loop(performance.now());
	}

	public stop(): void {
		this.breakLoop = true;
		this.emit(LifecycleEvents.OnStop);
	}

	private loop(t: number): void {
		if (this.breakLoop) {
			return;
		}
		requestAnimationFrame(this.loop);
		while (t > this.loopInfo.tUpdate) {
			this.loopInfo.tUpdate += this.loopInfo.dtUpdate;
			this.beforeUpdate();
			this.update();
			this.afterUpdate();
		}
		this.loopInfo.dtRender = t - this.loopInfo.tRender;
		this.loopInfo.tRender = t;
		this.render();
	}

	private beforeUpdate(): void {
		this.emit(LifecycleEvents.OnBeforeUpdate, this.loopInfo);
	}

	private update(): void {
		this.emit(LifecycleEvents.OnUpdate, this.loopInfo);
	}

	private afterUpdate(): void {
		this.emit(LifecycleEvents.OnAfterUpdate, this.loopInfo);
	}

	private render(): void {
		this.emit(LifecycleEvents.OnRender, this.loopInfo);
	}
}

export interface ILoopInfo {
	dtUpdate: number;
	tUpdate: number;
	dtRender: number;
	tRender: number;
}
