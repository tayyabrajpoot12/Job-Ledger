import UserAvatar from 'react-native-user-avatar';
import {COLORS} from '../utils/COLORS';

const NoImage = ({name, size, borderRadius}) => {
  return (
    <UserAvatar
      size={size || 40}
      name={name}
      bgColor={COLORS.white}
      borderRadius={borderRadius}
      textColor={'#000'}
    />
  );
};

export default NoImage;
