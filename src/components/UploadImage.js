/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {openCamera, openPicker} from 'react-native-image-crop-picker';

import CustomModal from './CustomModal';
import CustomText from './CustomText';
import Icons from './Icons';

import fonts from '../assets/fonts';
import {Images} from '../assets/images';
import {COLORS} from '../utils/COLORS';
import CustomButton from './CustomButton';

const UploadImage = props => {
  const [image, setImage] = useState('');
  const [imageModal, setImageModal] = useState(false);

  const takePhotoFromCamera = () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 1,
        cropping: true,
        ...props.options,
      };
      setImageModal(false);
      setTimeout(async () => {
        const result = await openCamera(options);

        if (result) {
          setImage(result);
          props.handleChange(result);
        }
      }, 500);
    } catch (error) {
      console.log('takePhotoFromCamera error', error);
    }
  };

  const takePhotoFromLibrary = async () => {
    try {
      const options = {
        mediaType: 'photo',
        cropping: true,
        quality: 0.8,
        multiple: props.multiple,
        maxFiles: 4,
        ...props.options,
      };
      setImageModal(false);
      setTimeout(async () => {
        const result = await openPicker(options);
        if (result) {
          setImage(result);
          props.handleChange(result);
        }
      }, 1000);
    } catch (error) {
      console.log('takePhotoFromLibrary error', error);
    }
  };
  const ModalIcons = ({source, title, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.row}>
        <Image source={source} style={styles.icon} />
        <CustomText label={title} alignSelf={'center'} marginTop={5} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={!props.renderButton && styles.container}>
      {!props.renderButton ? (
        <>
          <View style={props.imageContainer}>
            <Image
              source={
                image
                  ? {uri: image.uri}
                  : props.image
                  ? {uri: props.image}
                  : props.placeholder || {
                      uri: 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png',
                    }
              }
              style={styles.image}
            />
          </View>
          {!props.disabled && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.iconStyle, props.iconStyle]}
              onPress={() => setImageModal(true)}>
              <Icons
                family="Entypo"
                name="camera"
                color={props.iconColor || 'black'}
                size={17}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        props.renderButton(() => setImageModal(true))
      )}
      <CustomModal
        isChange
        isVisible={imageModal}
        transparent={true}
        onDisable={() => setImageModal(false)}
        backgroundColor="transparent">
        <View style={[styles.mainContainer]}>
          <View style={styles.titleBox}>
            <CustomText
              fontSize={16}
              alignSelf="center"
              label={props?.title || 'Choose your pic'}
              fontFamily={fonts.semiBold}
            />
          </View>
          <View style={{}}>
            <ModalIcons
              title="Photo from gallery"
              source={Images.gallery}
              onPress={takePhotoFromLibrary}
            />
            <ModalIcons
              title={props?.desc || 'Take a selfie'}
              source={Images.camera}
              onPress={takePhotoFromCamera}
            />
            <CustomButton
              width="80%"
              height={45}
              marginTop={20}
              title={'Cancel'}
              onPress={() => setImageModal(false)}
              customStyle={[{borderRadius: 30}]}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconStyle: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 0,
    padding: 5,
  },
  container: {
    alignSelf: 'center',
  },
  modalContainer: {
    height: '30%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginTop: 10,
    paddingBottom: 10,
  },
  emptyView: {
    width: 60,
    height: 6,
    borderRadius: 100,
    backgroundColor: COLORS.emptyView,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  icon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
    tintColor: '#000',
    marginRight: 10,
  },
  titleBox: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLORS.lightGray,
  },
});
