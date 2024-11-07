import { Box, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const NoticeCard = (props) => {
  const { title, description, date, color } = props;

  return (
    <Box sx={{ backgroundColor: color, p: 1, borderRadius: 1, my: 1 }}>
      <Stack direction="column" justifyContent="space-between">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Tooltip placement="top" title={title}>
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
              {dayjs(date).format('DD-MM-YYYY')}
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
