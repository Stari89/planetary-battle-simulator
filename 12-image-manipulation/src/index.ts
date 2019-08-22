import './style.css';
import { Injector } from './di/injector';
import CanvasApp from './canvas-app';

window.onload = () => {
	const injector = new Injector();
	injector.resolve<CanvasApp>(CanvasApp);
};
