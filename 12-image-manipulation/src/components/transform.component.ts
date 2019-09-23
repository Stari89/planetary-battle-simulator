import Vector2 from '../vector-2';
import { Component } from '../ioc/injector';

@Component('transform')
export default class TransformComponent {
	constructor(public position: Vector2, public scale: Vector2, public orientation: number) {}
}
