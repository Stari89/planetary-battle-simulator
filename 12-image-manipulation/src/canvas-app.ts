import { Injectable } from './ioc/injector';
import { OnInit, LifecycleEvents } from './lifecycle';
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
