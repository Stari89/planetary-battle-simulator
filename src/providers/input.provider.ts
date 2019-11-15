import { Injectable } from '../ioc/injector';
import { OnAfterUpdate } from '../util/lifecycle';
import Vector2 from '../util/vector-2';

export interface IKeyboardState {
    pressedKeys: Array<string>;
    keyDowns: Array<string>;
    keyUps: Array<string>;
}

export interface IMouseState {
    position: Vector2;
    previousPosition: Vector2;
    deltaPosition: Vector2;
    pressedButtons: Array<number>;
    buttonDowns: Array<number>;
    buttonUps: Array<number>;
    scrollDelta: Vector2;
}

export interface ITouchState {
    touchList: Array<ITouch>;
    touchDowns: Array<ITouch>;
    touchUps: Array<ITouch>;
}

export interface ITouch {
    id: number;
    position: Vector2;
}

@Injectable()
export default class InputProvider implements OnAfterUpdate {
    // Fields
    private keyboardState: IKeyboardState;
    private mouseState: IMouseState;
    private touchState: ITouchState;

    // Properties
    public get KeyboardState(): IKeyboardState {
        return this.keyboardState;
    }

    public get MouseState(): IMouseState {
        return this.mouseState;
    }

    public get TouchState(): ITouchState {
        return this.touchState;
    }

    // Constructor
    constructor() {
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseScroll = this.onMouseScroll.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);

        window.onkeydown = this.onKeyDown;
        window.onkeyup = this.onKeyUp;
        window.onmousemove = this.onMouseMove;
        window.onmousedown = this.onMouseDown;
        window.onmouseup = this.onMouseUp;
        window.onwheel = this.onMouseScroll;
        window.ontouchstart = this.onTouchStart;
        window.ontouchend = this.onTouchEnd;
        window.ontouchcancel = this.onTouchEnd;
        window.ontouchmove = this.onTouchMove;

        this.keyboardState = {
            pressedKeys: [],
            keyDowns: [],
            keyUps: []
        };
        this.mouseState = {
            position: new Vector2(0, 0),
            previousPosition: new Vector2(0, 0),
            deltaPosition: new Vector2(0, 0),
            pressedButtons: [],
            buttonDowns: [],
            buttonUps: [],
            scrollDelta: new Vector2(0, 0)
        };
        this.touchState = {
            touchList: [],
            touchDowns: [],
            touchUps: []
        };
    }

    public onAfterUpdate(): void {
        this.keyboardState.keyDowns = [];
        this.keyboardState.keyUps = [];
        this.mouseState.previousPosition = new Vector2(this.mouseState.position.x, this.mouseState.position.y);
        this.mouseState.deltaPosition = new Vector2(0, 0);
        this.mouseState.buttonDowns = [];
        this.mouseState.buttonUps = [];
        this.mouseState.scrollDelta = new Vector2(0, 0);
        this.touchState.touchDowns = [];
        this.touchState.touchUps = [];
    }

    // Private
    private onKeyDown(e: KeyboardEvent): void {
        const keyIsPressed = this.keyboardState.pressedKeys.some(key => {
            return key === e.key;
        });
        if (keyIsPressed) {
            return;
        }
        this.keyboardState.pressedKeys.push(e.key);
        this.keyboardState.keyDowns.push(e.key);
    }

    private onKeyUp(e: KeyboardEvent): void {
        const i = this.keyboardState.pressedKeys.indexOf(e.key);
        if (i >= 0) {
            this.keyboardState.pressedKeys.splice(i, 1);
            this.keyboardState.keyUps.push(e.key);
        }
    }

    private onMouseMove(e: MouseEvent): void {
        this.mouseState.position.x = e.x;
        this.mouseState.position.y = e.y;
        this.mouseState.deltaPosition = this.mouseState.position.substract(this.mouseState.previousPosition);
    }

    private onMouseDown(e: MouseEvent): void {
        const isButtonPressed = this.mouseState.pressedButtons.some(button => {
            return button === e.button;
        });
        if (isButtonPressed) {
            return;
        }
        this.mouseState.pressedButtons.push(e.button);
        this.mouseState.buttonDowns.push(e.button);
    }

    private onMouseUp(e: MouseEvent): void {
        const i = this.mouseState.pressedButtons.indexOf(e.button);
        if (i >= 0) {
            this.mouseState.pressedButtons.splice(i, 1);
            this.mouseState.buttonUps.push(e.button);
        }
    }

    private onMouseScroll(e: WheelEvent): void {
        this.mouseState.scrollDelta = new Vector2(e.deltaX, e.deltaY);
    }

    private onTouchStart(e: TouchEvent): void {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const newTouch: ITouch = {
                id: touch.identifier,
                position: new Vector2(touch.clientX, touch.clientY)
            };
            this.touchState.touchDowns.push(newTouch);
            this.touchState.touchList.push(newTouch);
        }
    }

    private onTouchEnd(e: TouchEvent): void {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            const old = this.touchState.touchList.find(t => t.id === touch.identifier);
            if (old) {
                this.touchState.touchList.splice(this.touchState.touchList.indexOf(old), 1);
            }
            const newTouch: ITouch = {
                id: touch.identifier,
                position: new Vector2(touch.clientX, touch.clientY)
            };
            this.touchState.touchUps.push(newTouch);
        }
    }

    private onTouchMove(e: TouchEvent): void {
        for (let i = 0; i < e.targetTouches.length; i++) {
            const touch = e.changedTouches[i];
            let old = this.touchState.touchList.find(t => t.id === touch.identifier);
            if (old) {
                old.position = new Vector2(touch.clientX, touch.clientY);
            } else {
                const newTouch: ITouch = {
                    id: touch.identifier,
                    position: new Vector2(touch.clientX, touch.clientY)
                };
                this.touchState.touchList.push(newTouch);
            }
        }
    }
}
