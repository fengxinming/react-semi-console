import { GithubOutlined } from '@ant-design/icons';
import IconButton from './IconButton';

export default function GithubLink() {
  return (
    <a
      href="https://github.com/fengxinming/react-antd-console"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconButton icon={<GithubOutlined />} tooltip="GitHub" />
    </a>
  );
}
