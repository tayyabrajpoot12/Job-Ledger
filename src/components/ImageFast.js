import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageFast = ({source, style, resizeMode, isView, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={!isView}
      style={[style]}>
      <FastImage
        source={source}
        resizeMode={resizeMode}
        style={{width: '100%', height: '100%'}}
      />
    </TouchableOpacity>
  );
};

export default ImageFast;
