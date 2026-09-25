import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import {
  FormProvider,
  RHFDatePicker,
  RHFTextField,
} from '../../../components/HookForm';

const filterLabels = {
  name: 'Course Name',
  intake: 'Intake',
};

const CourseFilter = (props) => {
  const { open, query, onOpen, onClose, onSubmit, onRemoveFilter, clearFilters } =
    props;

  const methods = useForm({
    defaultValues: {
      name: query.name || '',
      intake: query.intake ? dayjs(query.intake) : null,
    },
  });

  const { handleSubmit, reset, formState } = methods;

  useEffect(() => {
    reset({
      name: query.name || '',
      intake: query.intake ? dayjs(query.intake) : null,
    });
  }, [query, reset]);

  const formatFilterValue = (key, value) => {
    if (key === 'intake') {
      return dayjs(value).isValid() ? dayjs(value).format('MMM YYYY') : value;
    }

    return value;
  };

  const activeFilters = Object.entries(query).filter(
    ([key, value]) => filterLabels[key] && value
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        scroll="body">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Typography variant="h6">Filter Courses</Typography>
              <IconButton onClick={onClose} aria-label="Close filter dialog">
                <MdClose />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <RHFTextField name="name" label="Course Name" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFDatePicker
                  name="intake"
                  label="Intake"
                  views={['month', 'year']}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={onClose} type="default" size="medium">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              loading={formState.isSubmitting}>
              Apply filters
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <div className="subframe-search-section">
        <div className="subframe-search">
          <Button type="default" size="middle" onClick={onOpen}>
            + Add Filter
          </Button>
          <Button
            type="text"
            size="middle"
            className="clear-filters"
            onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            p: 2,
            borderBottom: '1px solid #e5e7eb',
          }}>
          {activeFilters.map(([key, value]) => (
            <Chip
              key={key}
              size="small"
              variant="outlined"
              color="info"
              label={`${filterLabels[key]}: ${formatFilterValue(key, value)}`}
              onDelete={() => onRemoveFilter(key)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default CourseFilter;
