import {useIsFocused} from '@react-navigation/native';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ImageFast from './ImageFast';

import {COLORS} from '../utils/COLORS';

const {width, height} = Dimensions.get('window');

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      barStyle="dark-content"
      backgroundColor={COLORS.white}
      {...props}
    />
  ) : null;
};

const ScreenWrapper = ({
  children,
  statusBarColor = COLORS.white,
  translucent = false,
  scrollEnabled = false,
  backgroundImage,
  backgroundColor = COLORS.white,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  refreshControl,
  paddingBottom,
  nestedScrollEnabled,
  paddingHorizontal,
}) => {
  const content = () => {
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: paddingBottom,
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          },
        ]}>
        <FocusAwareStatusBar
          barStyle={'dark-content'}
          backgroundColor={statusBarColor}
          translucent={translucent}
        />
        {!translucent && (
          <SafeAreaView
            style={(styles.container, {backgroundColor: statusBarColor})}
          />
        )}
        {headerUnScrollable()}

        {scrollEnabled ? (
          <KeyboardAwareScrollView
            nestedScrollEnabled={nestedScrollEnabled}
            refreshControl={refreshControl}
            style={[
              styles.container,
              {backgroundColor, paddingHorizontal: paddingHorizontal || 25},
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View style={{paddingHorizontal: paddingHorizontal || 25, flex: 1}}>
            {children}
          </View>
        )}
        {footerUnScrollable()}
      </View>
    );
  };
  return backgroundImage ? (
    <View style={{width, height, zIndex: 999}}>
      {content()}
      <ImageFast
        source={backgroundImage}
        style={{width, height, position: 'absolute', zIndex: -1}}
        resizeMode="cover"
      />
    </View>
  ) : (
    content()
  );
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
