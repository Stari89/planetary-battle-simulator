import './style.css';
import { Injector } from './ioc/injector';
import CanvasApp from './canvas-app';
import kittyUrl from './assets/kitty.jpg';

window.onload = () => {
    const canvasApp: CanvasApp = Injector.instance.resolve<CanvasApp>(CanvasApp);
    const image = new Image();
    image.src = kittyUrl;
};
