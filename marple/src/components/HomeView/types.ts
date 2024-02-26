import { SvgIconProps } from "@mui/material";

export interface OptionCardProps {
  icon: React.ElementType<SvgIconProps>;
  option: string;
  description: string;
  onClick: () => void;
}
