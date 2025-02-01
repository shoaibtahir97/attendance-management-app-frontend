import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../components/HookForm';

const GroupReportV2 = () => {
  const { data: groupsList } = useGetGroupsListQuery();

  const methods = useForm({});

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(getGroupReports)}>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 mt-2 ">
            <RHFAutocomplete
              label="Group"
              name="group"
              sx={{ width: '100%' }}
              size="small"
              options={groupsList}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className=" d-flex justify-content-end">
            <Button
              loading={loadingGetGroupAttendanceReport}
              htmlType="submit"
              type="primary">
              Generate Report
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default GroupReportV2;
