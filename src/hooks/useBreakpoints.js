import { useMediaQuery, useTheme } from "@mui/material";

export function useBreakpoints() {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  return { downMd };
}
