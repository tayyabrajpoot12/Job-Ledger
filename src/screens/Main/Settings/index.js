import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Switch, View} from 'react-native';
import fonts from '../../../assets/fonts';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';
import Icons from '../../../components/Icons';
import ScreenWrapper from '../../../components/ScreenWrapper';

import i18n from '../../../Language/i18n';
import {setToken} from '../../../store/reducer/AuthConfig';
import {setLanguage} from '../../../store/reducer/usersSlice';
import {COLORS} from '../../../utils/COLORS';
import LogoutModal from './molecules/LogoutModal';
import UserCard from './molecules/UserCard';

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLogoutModal, setLogoutModal] = useState(false);

  const handleLogout = async () => {
    setLogoutModal(false);
    dispatch(setToken(''));
  };

  const language = useSelector(state => state.users.language);

  const toggleLanguage = () => {
    const newLang = language === 'hr' ? 'en' : 'hr';
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <ScreenWrapper
      paddingHorizontal={20}
      headerUnScrollable={() => <Header title={'Settings'} hideBackArrow />}
      scrollEnabled>
      <UserCard />
      <Pressable
        style={styles.row}
        onPress={() => navigation.navigate('EditProfile')}>
        <Icons
          size={19}
          name={'edit'}
          family={'AntDesign'}
          color={COLORS.primaryColor}
        />
        <CustomText
          fontSize={15}
          marginLeft={10}
          label={'Edit Profile'}
          fontFamily={fonts.medium}
          color={COLORS.primaryColor}
        />
      </Pressable>
      <Pressable style={[styles.row, styles.row1]}>
        <View style={styles.row2}>
          <Icons
            size={20}
            name={'globe'}
            family={'Feather'}
            color={COLORS.primaryColor}
          />
          <CustomText
            fontSize={15}
            label={'Change Language'}
            marginLeft={10}
            color={COLORS.primaryColor}
            fontFamily={fonts.medium}
          />
        </View>
        <Switch
          value={language === 'en'}
          onValueChange={toggleLanguage}
          trackColor={{false: COLORS.lightGray, true: COLORS.primaryColor}}
          thumbColor={language === 'en' ? COLORS.white : COLORS.white}
        />
      </Pressable>
      <Pressable
        style={styles.row}
        onPress={() => navigation.navigate('ChangePassword')}>
        <Icons
          size={20}
          name={'lock'}
          family={'AntDesign'}
          color={COLORS.primaryColor}
        />
        <CustomText
          fontSize={15}
          label={'Change Password'}
          marginLeft={10}
          color={COLORS.primaryColor}
          fontFamily={fonts.medium}
        />
      </Pressable>
      <Pressable style={styles.row} onPress={() => setLogoutModal(true)}>
        <Icons
          size={17}
          name={'logout'}
          family={'AntDesign'}
          color={COLORS.primaryColor}
        />
        <CustomText
          fontSize={15}
          label={'Logout'}
          marginLeft={12}
          color={COLORS.primaryColor}
          fontFamily={fonts.medium}
        />
      </Pressable>
      <LogoutModal
        onDisable={handleLogout}
        isVisible={isLogoutModal}
        StayLoggedIn={() => setLogoutModal(false)}
      />
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
