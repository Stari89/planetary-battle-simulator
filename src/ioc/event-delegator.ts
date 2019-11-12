import { Container } from './container';
import { LifecycleEvents } from '../util/lifecycle';

export class EventDelegator {
    private static _instance: EventDelegator;

    private constructor() {
        this.emit = this.emit.bind(this);
    }

    public static get instance(): EventDelegator {
        if (!EventDelegator._instance) {
            EventDelegator._instance = new EventDelegator();
        }
        return this._instance;
    }

    public subscribeToEvent(eventEmitter: ContainerEventEmitter): void {
        eventEmitter.emit = this.emit;
    }

    private emit(event: LifecycleEvents, ...params: any): void {
        for (const value of Container.instance.values()) {
            if (typeof value[event] === 'function') {
                value[event](...params);
            }
        }
    }
}

export class ContainerEventEmitter {
    constructor() {
        EventDelegator.instance.subscribeToEvent(this);
    }

    public emit: ContainerEvent;
}

export type ContainerEvent = (event: LifecycleEvents, ...args: any) => void;
