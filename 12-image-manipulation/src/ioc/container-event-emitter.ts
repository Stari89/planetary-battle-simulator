import { LifecycleEvents } from '../lifecycle/lifecycle-events.enum';

export class ContainerEventEmitter {
	public emit: ContainerEvent;
}

export type ContainerEvent = (event: LifecycleEvents, ...args: any) => void;
