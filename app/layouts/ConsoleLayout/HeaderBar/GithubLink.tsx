import { IconGithubLogo } from '@douyinfe/semi-icons';
import IconButton from './IconButton';

export default function GithubLink() {
  return (
    <a
      href="https://github.com/fengxinming/react-semi-console"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconButton icon={<IconGithubLogo />} tooltip="GitHub" />
    </a>
  );
}
