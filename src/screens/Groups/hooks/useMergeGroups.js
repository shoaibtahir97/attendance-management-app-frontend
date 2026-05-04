import useNotification from '../../../hooks/useNotification';
import { useMergeGroupsMutation } from '../../../redux/slices/apiSlices/groupApiSlice';

export const useMergeGroups = (handleReset) => {
  const [mergeGroups] = useMergeGroupsMutation();
  const { openNotification } = useNotification();

  const handleMergeGroups = async (data) => {
    await mergeGroups({
      groupIds: data.selectedGroupIds,
      name: data.name,
    })
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        handleReset();
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return { handleMergeGroups };
};
