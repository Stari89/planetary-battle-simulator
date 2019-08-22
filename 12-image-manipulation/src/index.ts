import './style.css';
import { Injector } from './ioc/injector';
import CanvasApp from './canvas-app';

window.onload = () => {
	const injector = new Injector();
	const canvasApp: CanvasApp = injector.resolve<CanvasApp>(CanvasApp);
	canvasApp.someStuff();
};
