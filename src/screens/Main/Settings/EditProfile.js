import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';
import ImageFast from '../../../components/ImageFast';
import ScreenWrapper from '../../../components/ScreenWrapper';
import UploadImage from '../../../components/UploadImage';
import {className} from '../../../global-styles';
import {put} from '../../../Services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';
import {uploadAndGetUrl} from '../../../utils/constants';
import {ToastMessage} from '../../../utils/ToastMessage';
import LocationModal from '../../../components/LocationModal';
import {setUserData} from '../../../store/reducer/usersSlice';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const {userData} = useSelector(state => state.users);
  const {token} = useSelector(state => state.authConfigs);

  const date = userData?.startDate
    ? moment(userData?.startDate, 'YYYY-MM-DD').format('MMM Do, YYYY')
    : new Date();

  const init = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    role: userData?.role,
    email: userData?.email,
    department: userData?.department,
    joiningDate: date,
    salary: String('$' + userData?.salary),
    address: userData?.location?.address,
    lat: userData?.location?.lat,
    lng: userData?.location?.lng,
    phone: userData?.phone,
  };

  const [state, setState] = useState(init);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(userData?.image || '');
  const [imageLoading, setImageLoading] = useState(false);

  const array = [
    {
      id: 0,
      placeholder: 'First Name',
      value: state.firstName,
      onChange: text => setState({...state, firstName: text}),
    },
    {
      id: 1,
      placeholder: 'Last Name',
      value: state.lastName,
      onChange: text => setState({...state, lastName: text}),
    },

    {
      id: 2,
      placeholder: 'Phone',
      value: state.phone,
      onChange: text => setState({...state, phone: text}),
    },
    {
      id: 8,
      placeholder: 'Address',
      value: state.address,
    },
    {
      id: 3,
      placeholder: 'Email',
      value: state.email,
      onChange: text => setState({...state, email: text}),
    },
    {
      id: 4,
      placeholder: 'Department',
      value: state.department,
      onChange: text => setState({...state, department: text}),
    },
    {
      id: 5,
      placeholder: 'Role',
      value: state.role,
      onChange: text => setState({...state, role: text}),
    },
    {
      id: 6,
      placeholder: 'Salary',
      value: state.salary,
      onChange: text => setState({...state, salary: text}),
    },
    {
      id: 7,
      placeholder: '12/12/2000',
      value: state.joiningDate,
      onChange: text => setState({...state, joiningDate: text}),
    },
  ];

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const body = {
        // image: image,
        lng: state.lng,
        lat: state.lat,
        phone: state.phone,
        address: state.address,
        lastName: state.lastName,
        firstName: state.firstName,
      };

      const url = `updateMyProfile/${token}`;

      const response = await put(url, body);

      if (response.data?.result) {
        dispatch(setUserData(response.data?.data));
        navigation.reset({index: 0, routes: [{name: 'TabStack'}]});
        ToastMessage('Profile updated!');
      } else {
        ToastMessage(response.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);

      setLoading(false);
      ToastMessage(error.response?.data?.message);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={'Edit your profile'} />}>
      <UploadImage
        handleChange={async res => {
          const url = await uploadAndGetUrl(res, setImageLoading);
          setImage(url);
        }}
        renderButton={res => (
          <TouchableOpacity
            onPress={res}
            disabled={imageLoading}
            style={styles.container}>
            <ImageFast
              style={image ? styles.avatar : styles.camera}
              source={image ? {uri: image} : Images.camIcon}
            />
            {imageLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="small" color={COLORS.white} />
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      <View style={className('pt-8 flex-1')}>
        {array.map(item =>
          item?.id === 8 ? (
            <TouchableOpacity
              key={item?.id}
              style={styles.box}
              activeOpacity={0.6}
              onPress={() => setVisible(true)}>
              <CustomText label={item.value} />
            </TouchableOpacity>
          ) : (
            <CustomInput
              key={item?.id}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={item.onChange}
              editable={item?.id > 2 ? false : true}
              color={item?.id > 2 ? COLORS.gray2 : '#000'}
            />
          ),
        )}
        <CustomButton
          title="Save Changes"
          loading={loading}
          onPress={handleUpdateUser}
          customStyle={className('mb-10')}
        />
      </View>
      <LocationModal
        visible={visible}
        setData={setState}
        addressData={state}
        setVisible={setVisible}
      />
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 105,
    width: 105,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 20,
  },
  avatar: {
    height: 105,
    width: 105,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  camera: {width: 32, height: 28, tintColor: COLORS.black},

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  box: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 20,
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
