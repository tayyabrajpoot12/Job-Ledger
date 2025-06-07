import React from 'react';
import 'react-native-get-random-values';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';
import CustomText from './CustomText';
import Icons from './Icons';
import constants from '../utils/constants';

const LocationModal = ({visible, setVisible, setData, addressData}) => {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}>
      <View style={styles.container}>
        <View style={styles.top}>
          <CustomText label={'Search Location'} />
          <TouchableOpacity onPress={() => hideModal()}>
            <Icons
              size={20}
              name="closecircleo"
              color={COLORS.black}
              family={'AntDesign'}
            />
          </TouchableOpacity>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Search here..."
          enablePoweredByContainer={false}
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          styles={{
            container: {
              height: 10,
              flex: 1,
              zIndex: 2,
              width: '90%',
              alignSelf: 'center',
              borderBottomColor: '#d4d4d4',
              borderBottomWidth: 1,
              marginTop: 10,
            },
            textInput: {
              borderBottomColor: '#d4d4d4',
              borderBottomWidth: 0.5,
              color: 'black',
              fontFamily: fonts.regular,
              fontSize: 15,
              paddingHorizontal: 0,
            },
            description: {
              fontSize: 14,
              fontFamily: fonts.regular,
              color: COLORS.black,
            },
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setData({
              ...addressData,
              address: data.description,
              lat: details?.geometry?.location.lat,
              lng: details?.geometry?.location.lng,
            });
            hideModal();
          }}
          query={{
            key: constants.GOOGLE_API_KEY,
            language: 'en',
          }}
          isRowScrollable={true}
          keyboardShouldPersistTaps="always"
          // listViewDisplayed="auto"
          keepResultsAfterBlur={true}
          minLength={1}
          numberOfLines={1}
          onTimeout={() =>
            console.warn('google places autocomplete: request timeout')
          }
          predefinedPlaces={[]}
          predefinedPlacesAlwaysVisible={false}
          suppressDefaultStyles={false}
          textInputHide={false}
          textInputProps={{}}
          timeout={20000}
        />
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderRadius: 10,
    height: '90%',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 15,
  },
});
