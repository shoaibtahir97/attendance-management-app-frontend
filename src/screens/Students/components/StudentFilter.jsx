import { yupResolver } from '@hookform/resolvers/yup';
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
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../../components/HookForm';
import { useGetGroupsListQuery } from '../../../redux/slices/apiSlices/groupApiSlice';

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Dropped', value: 'dropped' },
  { label: 'Withdrawn', value: 'withdrawn' },
  { label: 'Graduated', value: 'graduated' },
];

const filterSchema = Yup.object().shape({
  name: Yup.string().trim(),
  studentId: Yup.string().trim(),
  group: Yup.string().trim().nullable(),
  status: Yup.string().trim().nullable(),
});

const filterLabels = {
  name: 'Name',
  studentId: 'Student ID',
  group: 'Group',
  status: 'Status',
};

const StudentFilter = (props) => {
  const { open, query, onClose, onSubmit, onRemoveFilter, clearFilters } =
    props;
  const { data: groupsList, isLoading: isLoadingGroups } =
    useGetGroupsListQuery();

  const methods = useForm({
    resolver: yupResolver(filterSchema),
    defaultValues: {
      name: query.name || '',
      studentId: query.studentId || '',
      group: query.group || '',
      status: query.status || '',
    },
  });

  const { handleSubmit, reset, formState } = methods;

  const formatFilterValue = (key, value) => {
    if (key === 'status') {
      return (
        statusOptions.find((option) => option.value === value)?.label || value
      );
    }
    if (key === 'group') {
      return groupsList?.find((group) => group.value === value)?.label || value;
    }
    return value;
  };

  const filterChips = (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        p: 2,
        borderBottom: `1px solid #e5e7eb`,
      }}>
      {Object.entries(query)
        .filter(([key, value]) => filterLabels[key] && value)
        .map(([key, value]) => (
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
  );

  useEffect(() => {
    reset({
      name: query.name || '',
      studentId: query.studentId || '',
      group: query.group || '',
      status: query.status || '',
    });
  }, [query, reset]);

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
              <Typography variant="h6">Filter Students</Typography>
              <IconButton onClick={onClose} aria-label="Close filter dialog">
                <MdClose />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <RHFTextField name="name" label="Name" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField
                  name="studentId"
                  label="Student ID"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFAutocomplete
                  name="group"
                  size="small"
                  label="Group"
                  options={groupsList}
                  loading={isLoadingGroups}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFAutocomplete
                  name="status"
                  size="small"
                  label="Status"
                  options={statusOptions}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button
              onClick={onClose}
              htmlType="reset"
              type="default"
              size="medium">
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
          <Button type="default" size="middle" onClick={onClose}>
            + Add Filter
          </Button>
          <Button
            type="text"
            size="middle"
            htmlType="reset"
            className="clear-filters"
            onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      </div>
      {Object.entries(query).filter(
        ([key, value]) => filterLabels[key] && value
      ).length > 0 && filterChips}
    </>
  );
};

export default StudentFilter;
