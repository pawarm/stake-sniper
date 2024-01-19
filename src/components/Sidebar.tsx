import React from 'react';
import type { SelectProps } from 'antd';
import { Layout, Select, Tag, Image, Avatar } from 'antd';
import Logo from '../../public/logo.png'
import ListSelect from './ListSelect';

const { Sider } = Layout;
type TagRender = SelectProps['tagRender'];

const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];


const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Avatar
        style={{ marginRight: 3 }}
      >
        {label}
      </Avatar>
    );
  };

const Sidebar: React.FC = () => {
  return (
      <Sider
        style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#061178' }}
      >
        <Image preview={false} src={Logo} />
        </Sider>
  );
};

export default Sidebar;