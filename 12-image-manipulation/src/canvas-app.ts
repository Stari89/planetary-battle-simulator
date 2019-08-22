import { Injectable } from './di/injectable.decorator';

@Injectable()
export default class CanvasApp {
	constructor() {
		console.log('Hello, World!');
	}
}
