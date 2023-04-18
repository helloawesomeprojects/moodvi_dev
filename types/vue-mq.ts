type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type Orientation = "landspace" | "portrait";
type Theme = "light" | "dark";

export interface MqObject {
  current: Breakpoint;
  xs: boolean;
  smMinus: boolean;
  smPlus: boolean;
  sm: boolean;
  mdMinus: boolean;
  mdPlus: boolean;
  md: boolean;
  lgMinus: boolean;
  lgPlus: boolean;
  lg: boolean;
  xlMinus: boolean;
  xlPlus: boolean;
  xl: boolean;
  xxl: boolean;
  orientation: Orientation;
  isLandscape: boolean;
  isPortrait: boolean;
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  motionPreference: string;
  isMotion: boolean;
  isInert: boolean;
}
