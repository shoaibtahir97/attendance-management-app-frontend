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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import {
  FormProvider,
  RHFTextField,
} from '../../../components/HookForm';

const filterLabels = {
  code: 'Code',
  name: 'Name',
};

const SubjectFilter = (props) => {
  const { open, query, onOpen, onClose, onSubmit, onRemoveFilter, clearFilters } =
    props;

  const methods = useForm({
    defaultValues: {
      code: query.code || '',
      name: query.name || '',
    },
  });

  const { handleSubmit, reset, formState } = methods;

  useEffect(() => {
    reset({
      code: query.code || '',
      name: query.name || '',
    });
  }, [query, reset]);

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
              <Typography variant="h6">Filter Subjects</Typography>
              <IconButton onClick={onClose} aria-label="Close filter dialog">
                <MdClose />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <RHFTextField name="code" label="Code" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField name="name" label="Name" size="small" />
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
              label={`${filterLabels[key]}: ${value}`}
              onDelete={() => onRemoveFilter(key)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default SubjectFilter;
