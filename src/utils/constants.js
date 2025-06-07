import {createNavigationContainerRef} from '@react-navigation/native';
import {post} from '../Services/ApiRequest';
import {ToastMessage} from './ToastMessage';

export const navigationRef = createNavigationContainerRef();

export const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex =
  /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const phoneRegex =
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const baseUrl = '';
const GOOGLE_API_KEY = 'AIzaSyBTbv7JH2gqwaK_vPou9SgkK4uNjGkyX-0';
const imageUrl = '';

export const uploadAndGetUrl = async (file, setLoading) => {
  try {
    setLoading?.(true);
    const formData = new FormData();

    const result = file?.path || file?.fileCopyUri;

    formData.append('image', {
      uri: result || '',
      type: 'image/png',
      name: 'photo.png',
    });

    const res = await post('upload', formData);
    console.log(res.data);
    return res?.data?.image;
  } catch (err) {
    console.log(err);
    ToastMessage('Upload Again');
  } finally {
    setLoading?.(false);
  }
};

export default {
  regEmail,
  baseUrl,
  GOOGLE_API_KEY,
  imageUrl,
};
