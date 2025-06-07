import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import fonts from '../../../../assets/fonts';
import {Images} from '../../../../assets/images';
import CustomText from '../../../../components/CustomText';
import {className} from '../../../../global-styles';
import {COLORS} from '../../../../utils/COLORS';

const UserCard = () => {
  const {userData} = useSelector(state => state.users);

  return (
    <Pressable style={[styles.container]}>
      <View style={[className('mr-4')]}>
        {userData?.image ? (
          <Image
            source={{uri: userData?.image}}
            style={className('h-14 w-14 rounded-12')}
          />
        ) : (
          <Image
            source={Images.user}
            style={className('h-14 w-14 rounded-12')}
          />
        )}
      </View>
      <View>
        <CustomText
          fontSize={14.19}
          numberOfLines={1}
          fontFamily={fonts.medium}
          label={userData?.firstName + ' ' + userData?.lastName || 'Guest User'}
        />
        <CustomText
          label={userData?.email || 'kenzi.lawson@example.com'}
          fontSize={13}
          color={COLORS.gray4}
          numberOfLines={1}
        />
      </View>
    </Pressable>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    padding: 12,
    borderRadius: 10,
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
});
