import { Injectable } from './ioc/injector';
import { LifecycleEvents } from './lifecycle/lifecycle-events.enum';
import { OnInit } from './lifecycle/lifecycle-interfaces';
import { ContainerEventEmitter } from './ioc/event-delegator';

@Injectable()
export default class CanvasApp extends ContainerEventEmitter implements OnInit {
	constructor() {
		super();
		console.log('Hello, World!');
	}

	onInit(param1: string): void {
		console.log(param1);
	}

	someStuff(): void {
		this.emit(LifecycleEvents.OnInit, 'test', 'pest');
	}
}
