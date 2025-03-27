import m from "mithril";

const emojis = {
  emoji1:
    "M304.8 454.8c0-52.8 43.2-96 96-96s96 43.2 96 96-43.2 96-96 96-96-43.2-96-96zM818.4 882c-7.2 3.6-14.4 4.8-20.4 4.8-18 0-34.8-9.6-43.2-26.4-28.8-58.8-87.6-96-154.8-96-66 0-126 37.2-154.8 96-12 24-39.6 33.6-63.6 21.6s-33.6-39.6-21.6-63.6c44.4-91.2 139.2-150 240-150 100.8 0 195.6 58.8 240 150C852.0 841.2 842.4 870 818.4 882zm-19.2-331.2c-52.8 0-96-43.2-96-96s43.2-96 96-96 96 43.2 96 96-43.2 96-96 96z",
  emoji2:
    "M400.8 358.8c52.8 0 96 43.2 96 96 0 52.8-43.2 96-96 96-52.8 0-96-43.2-96-96 0-52.8 43.2-96 96-96zm398.4 0c52.8 0 96 43.2 96 96 0 52.8-43.2 96-96 96-52.8 0-96-43.2-96-96 0-52.8 43.2-96 96-96zM601.4 744.4c54.9-.591 117.8 6.4 183.0 28.8l3.4 1.2c25.0 8.6 38.3 36.1 28.6 60.6-7.5 25.3-34.9 38.7-59.9 30.1l-.2.0-3.4-1.2c-155.4-53.6-301.3 1.5-302.5 1.1-10.3 4.1-22.8 3.6-33.0.05-12.5-4.3-24.1-14.7-28.6-27.6-9.2-24.8 2.8-52.3 27.6-61.6 4.7-1.7 80.0-30.5 184.8-31.6z",
  emoji3:
    "M304.8 454.8c0-52.8 43.2-96 96-96s96 43.2 96 96-43.2 96-96 96-96-43.2-96-96zM756 830.4H444c-26.4 0-48-21.6-48-48s21.6-48 48-48h312c26.4 0 48 21.6 48 48 0 26.4-21.6 48-48 48zm43.2-279.6c-52.8 0-96-43.2-96-96s43.2-96 96-96 96 43.2 96 96-43.2 96-96 96z",
  emoji4:
    "M400.8 358.8c52.8 0 96 43.2 96 96 0 52.8-43.2 96-96 96-52.8 0-96-43.2-96-96 0-52.8 43.2-96 96-96zm398.4 0c52.8 0 96 43.2 96 96 0 52.8-43.2 96-96 96-52.8 0-96-43.2-96-96 0-52.8 43.2-96 96-96zM434.0 744.4c5.7-.057 11.4.834 16.5 2.9 1.1-.391 147.0 54.7 302.5 1.1l3.4-1.2h.002c25.0-8.6 52.4 4.8 59.9 30.1 9.7 24.6-3.7 52.0-28.6 60.6l-3.4 1.2c-189.5 65.3-360.5-.164-367.8-2.7-24.8-9.2-36.8-36.8-27.6-61.6 4.4-12.9 16.1-23.3 28.6-27.6 5.1-1.8 10.8-2.8 16.5-2.8z",
  emoji5:
    "M304.8 454.8c0-52.8 43.2-96 96-96s96 43.2 96 96-43.2 96-96 96-96-43.2-96-96zM840 768c-44.4 91.2-139.2 150-240 150s-195.6-58.8-240-150c-12-24-1.2-52.8 21.6-63.6 24-12 52.8-1.2 63.6 21.6 28.8 58.8 87.6 96 154.8 96 67.2 0 126-37.2 154.8-96 12-24 39.6-33.6 63.6-21.6C842.4 716.4 852 745.2 840 768zm-40.8-217.2c-52.8 0-96-43.2-96-96s43.2-96 96-96 96 43.2 96 96-43.2 96-96 96z",
};

// Color definitions
const colors = {
  red: "#FF4136",
  orange: "#FFA726",
  white: "#C0C0C0",
  greenLight: "#4CAF50",
  green: "#2E7D32",
};

// Type for the component's attributes
export interface EmojiAttrs {
  value: number;
  size?: number;
  limits?: {
    veryNegative: number;
    negative: number;
    neutral: number;
    positive: number;
  };
  style?: string | Record<string, any>;
}

// Emoji Factory Component
export const EmojiScoreComponent: m.FactoryComponent<EmojiAttrs> = () => {
  return {
    view(vnode) {
      const {
        value,
        size = 100,
        style,
        limits = {
          veryNegative: -2,
          negative: -1,
          neutral: 1,
          positive: 2,
        },
      } = vnode.attrs;

      // Determine emoji and gradient based on value
      let emoji: string;
      let fillColor: string;

      if (value <= limits.veryNegative) {
        emoji = emojis.emoji1;
        fillColor = colors.red;
      } else if (value <= limits.negative) {
        emoji = emojis.emoji2;
        fillColor = colors.orange;
      } else if (value < limits.neutral) {
        emoji = emojis.emoji3;
        fillColor = colors.white;
      } else if (value < limits.positive) {
        emoji = emojis.emoji4;
        fillColor = colors.greenLight;
      } else {
        emoji = emojis.emoji5;
        fillColor = colors.green;
      }

      return m(
        "svg",
        { width: size, height: size, viewBox: "0 0 1200 1600", style },
        m("path", {
          fill: fillColor,
          d:
            "M600 30C285.6 30 30 285.6 30 600s255.6 570 570 570 570-255.6 570-570S914.4 30 600 30z" +
            emoji,
        })
      );
    },
  };
};
