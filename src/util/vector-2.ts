export default class Vector2 {
    // Fields
    public x: number;
    public y: number;

    // Properties
    public get magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public get direction(): Vector2 {
        return this.scale(1 / this.magnitude);
    }

    // Constructor
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Public interface
    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    public scale(scale: number): Vector2 {
        return new Vector2(this.x * scale, this.y * scale);
    }

    public equals(vector: Vector2): boolean {
        return this.x === vector.x && this.y === vector.y;
    }

    public floor(): Vector2 {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }

    public rotate(angle: number, around?: Vector2): Vector2 {
        around = around || new Vector2(0, 0);
        const rotCos = Math.cos(angle);
        const rotSin = Math.sin(angle);
        const rotX = (this.x - around.x) * rotCos - (this.y - around.y) * rotSin + around.x;
        const rotY = (this.x - around.x) * rotSin + (this.y - around.y) * rotCos + around.y;
        return new Vector2(rotX, rotY);
    }

    // Static interface
    public static getRandomVector(bounds?: Vector2, includeNegative?: boolean): Vector2 {
        if (!bounds) {
            return new Vector2(Math.random(), Math.random());
        }
        if (!includeNegative) {
            return new Vector2(Math.random() * bounds.x, Math.random() * bounds.y);
        }
        return new Vector2(Math.random() * 2 * bounds.x - bounds.x, Math.random() * 2 * bounds.y - bounds.y);
    }

    public toString(): string {
        return `[${this.x}, ${this.y}]`;
    }
}
