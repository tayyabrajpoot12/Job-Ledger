import Toast from 'react-native-simple-toast';
export const ToastMessage = message => {
  if (typeof message !== 'string') {
    return;
  }
  Toast.show(message);
};
