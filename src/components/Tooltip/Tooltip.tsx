import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#1976d2',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1976d2',
  },
}));

export default CustomizedTooltip;
