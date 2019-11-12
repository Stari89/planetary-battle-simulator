import { Injectable } from '../ioc/injector';
import { ContainerEventEmitter } from '../ioc/event-delegator';
import { LifecycleEvents } from '../util/lifecycle';

@Injectable()
export default class GameLoopProvider extends ContainerEventEmitter {
    private loopInfo: ILoopInfo;
    private breakLoop: boolean;

    constructor() {
        super();

        this.loop = this.loop.bind(this);
        this.update = this.update.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.render = this.render.bind(this);

        this.loopInfo = {
            dt: NaN,
            t: performance.now()
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
        this.loopInfo.dt = t - this.loopInfo.t;
        this.loopInfo.t = t;
        this.beforeUpdate();
        this.update();
        this.afterUpdate();
        this.render();
        requestAnimationFrame(this.loop);
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
    dt: number; // miliseconds from previous loop
    t: number; // total miliseconds
}
