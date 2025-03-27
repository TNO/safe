import m, { FactoryComponent } from "mithril";

export interface ThermometerLikertAttributes {
  value: number;
  max?: number;
  width?: number;
  height?: number;
  style?: string | Record<string, any>;
}

export const ThermometerLikert: FactoryComponent<
  ThermometerLikertAttributes
> = () => {
  const percentageToRange = (percentage: number): number =>
    -30 + 570 * (1 - percentage / 100);

  return {
    view: ({
      attrs: { value, width = 50, height = 50, max = 5, style = {} },
    }) => {
      const percentage = Math.min(100, Math.max(0, (value / max) * 100));

      // Color gradient from blue to red
      const red = Math.round((percentage / 100) * 255);
      const blue = Math.round((1 - percentage / 100) * 255);
      const color = `rgb(${red}, 0, ${blue})`;

      // Calculate the fill height based on the percentage.
      const fillHeight = percentageToRange(percentage);

      return m(".thermometer-likert", [
        m(
          "svg",
          {
            width: `${width}px`,
            height: `${height}px`,
            viewBox: "0 0 1200 1200",
            style,
          },
          [
            m("path", {
              d: `m666.66 735.19v-546.28c0-36.75-29.906-66.656-66.656-66.656s-66.656 29.906-66.656 66.656v546.28c-64.453 26.203-111.09 89.25-111.09 164.81 0 100.03 82.172 180.1 182.11 177.74 94.266-2.25 170.9-78.75 173.39-172.92 1.9219-74.672-43.031-142.18-111.09-169.64zm-66.656-568.5c12.234 0 22.219 9.9844 22.219 22.219v${fillHeight}h-44.438v-${fillHeight}c0-12.281 9.9844-22.219 22.219-22.219z`,
              fill: color,
            }),
            m("path", {
              d: "m755.58 683.39v-494.48c0-85.781-69.797-155.58-155.58-155.58s-155.58 69.797-155.58 155.58v494.53c-69.797 50.109-111.09 130.22-111.09 216.61 0 149.02 121.82 268.87 270.56 266.63 145.6-2.0625 263.48-122.26 262.78-267.89-0.42188-85.922-41.719-165.56-111.09-215.39zm-152.34 438.79c-124.36 1.7344-225.47-98.297-225.47-222.19 0-75.422 37.781-145.03 101.02-186.28 6.2812-4.125 10.078-11.109 10.078-18.609v-506.21c0-61.266 49.828-111.09 111.09-111.09s111.09 49.828 111.09 111.09v506.21c0 7.5 3.7969 14.531 10.078 18.609 62.906 41.016 100.69 110.25 101.02 185.21 0.65625 121.4-97.594 221.53-218.9 223.26z",
              fill: "#000",
            }),
          ]
        ),
      ]);
    },
  };
};
