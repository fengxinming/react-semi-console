import { Space } from 'antd';
import ChatPanel from './ChatPanel';
import Studio from './Studio';
import DataStatistic from './DataStatistic';
import StudioStatus from './StudioStatus';
import QuickOperation from './QuickOperation';
import StudioInformation from './StudioInformation';

export default function Monitor() {
  return (
    <div className="flex">
      <div className="basis-[300px]">
        <ChatPanel />
      </div>
      <div className="flex-1 px-[16px]">
        <Space size={16} orientation="vertical" className="w-full">
          <Studio />
          <DataStatistic />
        </Space>
      </div>
      <div className="basis-[280px]">
        <Space size={16} orientation="vertical" className="w-full">
          <StudioStatus />
          <QuickOperation />
          <StudioInformation />
        </Space>
      </div>
    </div>
  );
}
