import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  SvgIcon,
  Typography,
} from "@mui/material";
import { OptionCardProps } from "./types";

const OptionCard = ({
  icon,
  option,
  description,
  onClick,
}: OptionCardProps) => (
  <Card sx={{ maxWidth: 300 }} onClick={onClick}>
    <CardActionArea>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            minHeight: "300px",
          }}
        >
          <SvgIcon component={icon} color="primary" fontSize="large" />
          <Typography variant="h5" color="primary" textAlign="center">
            {option}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default OptionCard;
