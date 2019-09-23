import { ILoopInfo } from './managers/game-loop.manager';

export enum LifecycleEvents {
	OnRun = 'onRun',
	OnBeforeUpdate = 'onBeforeUpdate',
	OnUpdate = 'onUpdate',
	OnAfterUpdate = 'onAfterUpdate',
	OnBeforeRender = 'onBeforeRender',
	OnRender = 'onRender',
	OnStop = 'onStop'
}

export interface OnRun {
	onRun(): void;
}
export interface OnBeforeUpdate {
	onBeforeUpdate(loopInfo: ILoopInfo): void;
}
export interface OnUpdate {
	onUpdate(loopInfo: ILoopInfo): void;
}
export interface OnAfterUpdate {
	onAfterUpdate(loopInfo: ILoopInfo): void;
}
export interface OnBeforeRender {
	onRender(loopInfo: ILoopInfo): void;
}
export interface OnRender {
	onRender(loopInfo: ILoopInfo): void;
}
export interface OnStop {
	onStop(): void;
}
