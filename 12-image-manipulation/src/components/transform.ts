import Vector2 from '../vector-2';
import { Component } from '../ioc/injector';

@Component()
export default class Transform {
	constructor(public position: Vector2, public scale: Vector2, public orientation: number) {}
}
