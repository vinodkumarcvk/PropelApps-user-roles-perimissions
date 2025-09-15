import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';

interface UserAvatarProps extends AvatarProps {
  name: string;
  src?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, src, ...props }) => {
  const getInitials = (fullName: string): string => {
    const names = fullName.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };

  const stringToColor = (string: string): string => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const sx = {
    bgcolor: src ? undefined : stringToColor(name),
    ...props.sx,
  };

  return (
    <Avatar src={src} sx={sx} {...props}>
      {!src && getInitials(name)}
    </Avatar>
  );
};

export default UserAvatar;