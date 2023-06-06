import { HashtagIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { setChannelInfo } from '@/stores/channelSlice';

type Props = {
  id: number;
  channelName: string;
};

const Channel = ({ id, channelName }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const setChannel = async () => {
    dispatch(
      setChannelInfo({
        channel_id: id,
        channelName: channelName,
      })
    );
  };

  return (
    <div
      className='flex cursor-pointer items-center rounded-md p-1 font-medium hover:bg-[#3A3C43]  hover:text-white'
      onClick={setChannel}
    >
      <HashtagIcon className='mr-2 h-5' /> {channelName}
    </div>
  );
};

export default Channel;
