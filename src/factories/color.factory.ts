import { Injectable } from '../ioc/injector';
import Color, { ColorChannelBrightness } from '../util/color';

@Injectable()
export default class ColorFactory {
    getColor(
        red: ColorChannelBrightness,
        green: ColorChannelBrightness,
        blue: ColorChannelBrightness,
        alpha?: ColorChannelBrightness
    ) {
        return new Color(red, green, blue, alpha);
    }

    getBlack(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._0, ColorChannelBrightness._0, ColorChannelBrightness._0, alpha);
    }
    getGrey(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._2, ColorChannelBrightness._2, ColorChannelBrightness._2, alpha);
    }
    getWhite(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._4, ColorChannelBrightness._4, ColorChannelBrightness._4, alpha);
    }

    getRed(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._4, ColorChannelBrightness._0, ColorChannelBrightness._0, alpha);
    }
    getLime(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._0, ColorChannelBrightness._4, ColorChannelBrightness._0, alpha);
    }
    getBlue(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._0, ColorChannelBrightness._0, ColorChannelBrightness._4, alpha);
    }

    getYellow(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._4, ColorChannelBrightness._4, ColorChannelBrightness._0, alpha);
    }
    getCyan(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._0, ColorChannelBrightness._4, ColorChannelBrightness._4, alpha);
    }
    getMagenta(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._4, ColorChannelBrightness._0, ColorChannelBrightness._4, alpha);
    }

    getOrange(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._4, ColorChannelBrightness._2, ColorChannelBrightness._0, alpha);
    }
    getIndigo(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._2, ColorChannelBrightness._0, ColorChannelBrightness._4, alpha);
    }
    getChartreuse(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._2, ColorChannelBrightness._4, ColorChannelBrightness._0, alpha);
    }
    getDeepPink(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._4, ColorChannelBrightness._0, ColorChannelBrightness._2, alpha);
    }
    getDodgerBlue(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._0, ColorChannelBrightness._2, ColorChannelBrightness._4, alpha);
    }
    getSpringGreen(alpha?: ColorChannelBrightness): Color {
        return new Color(ColorChannelBrightness._0, ColorChannelBrightness._4, ColorChannelBrightness._2, alpha);
    }
}
