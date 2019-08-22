import { Injectable } from './ioc/injectable.decorator';
import { ContainerEventEmitter } from './ioc/container-event-emitter';
import { LifecycleEvents } from './lifecycle/lifecycle-events.enum';
import { OnInit } from './lifecycle/lifecycle-interfaces';

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
