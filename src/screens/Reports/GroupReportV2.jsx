import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormProvider, RHFAutocomplete } from '../../components/HookForm';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { useLazyGetGroupReportQuery } from '../../redux/slices/apiSlices/reportApiSlice';

const GroupReportV2 = () => {
  const { data: groupList, isLoading: isLoadingGroups } =
    useGetGroupsListQuery();

  const groupReportSchema = Yup.object().shape({
    group: Yup.string().required(),
  });

  const methods = useForm({
    defaultValues: {
      group: '',
    },
    resolver: yupResolver(groupReportSchema),
  });

  const [getGroupReport] = useLazyGetGroupReportQuery();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function fetchGroupAttendanceReport(data) {
    const { group } = data;

    const blob = await getGroupReport(group).unwrap();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${groupList.find((item) => item.value === group).label}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(fetchGroupAttendanceReport)}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box>
            <RHFAutocomplete
              label="Group Name"
              name="group"
              sx={{ width: '430px' }}
              size="small"
              options={groupList}
            />
          </Box>
          <Box>
            <Button
              loading={isSubmitting}
              disabled={isLoadingGroups}
              type="primary"
              htmlType="submit"
              size="large">
              Generate Report
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </div>
  );
};

export default GroupReportV2;
