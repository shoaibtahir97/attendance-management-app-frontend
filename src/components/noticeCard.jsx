import React from 'react';
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';

const NoticeCard = (props) => {
  const { title, description, startDate, endDate, color } = props;

  const [tooltipEnabled, setTooltipEnabled] = React.useState(false);

  const hideTooltip = () => {
    setTooltipEnabled(false);
  };
  const handleShowTooltip = ({ currentTarget }) => {
    console.log('currentTarget', currentTarget);
    if (currentTarget.scrollWidth > currentTarget.clientWidth) {
      setTooltipEnabled(true);
    }
  };
  return (
    <Box sx={{ backgroundColor: color, p: 1, borderRadius: 1, my: 1 }}>
      <Stack direction="column" justifyContent="space-between">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Tooltip
            // onMouseEnter={handleShowTooltip}
            // onMouseLeave={hideTooltip}
            // disableHoverListener={!tooltipEnabled}
            placement="top"
            title={title}>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                textOverflow: 'ellipsis',
                width: '100%',
                cursor: 'pointer',
              }}
              fontWeight="bold">
              {title}
            </Typography>
          </Tooltip>
          <Box sx={{ background: 'white', px: 1, width: '110px' }}>
            <Typography variant="caption" color={'#797979'}>
              {dayjs(startDate).format('DD-MM-YYYY')}
              {/* {endDate && `to ${dayjs(endDate).format('DD-MM-YYYY')}`} */}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="caption" color={'#797979'}>
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};

export default NoticeCard;
