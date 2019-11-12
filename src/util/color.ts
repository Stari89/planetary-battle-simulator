export namespace Colors {
    export function ghostA(color: Colors): string {
        const red = parseInt(`0x${color.substr(1, 2)}`);
        const blue = parseInt(`0x${color.substr(5, 2)}`);
        const avg = Math.floor((red + blue) / 2);
        const alpha = `00${avg.toString(16)}`.slice(-2);
        return `#FF00FF${alpha}`;
    }

    export function ghostB(color: Colors): string {
        const green = parseInt(`0x${color.substr(3, 2)}`);
        const blue = parseInt(`0x${color.substr(5, 2)}`);
        const avg = Math.floor((green + blue) / 2);
        const alpha = `00${avg.toString(16)}`.slice(-2);
        return `#00FFFF${alpha}`;
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
