export namespace Colors {
    export function ghostA(color: Colors): string {
        return `${color.substring(0, 3)}00${color.substring(5)}`;
    }

    export function ghostB(color: Colors): string {
        return `${color.substring(0, 1)}00${color.substring(3)}`;
    }
}

export enum Colors {
    Black = '#000000',
    Charcoal = '#3F3F3F',
    Grey = '#7F7F7F',
    Silver = '#C0C0C0',
    White = '#FFFFFF',

    Red = '#FF0000',
    Lime = '#00FF00',
    Blue = '#0000FF',

    Yellow = '#FFFF00',
    Cyan = '#00FFFF',
    Magenta = '#FF00FF',

    Orange = '#FF7F00',
    Indigo = '#7F00FF',
    Chartreuse = '#7FFF00',
    DeepPink = '#FF007F',
    DodgerBlue = '#007FFF',
    SpringGreen = '#00FF7F'
}
