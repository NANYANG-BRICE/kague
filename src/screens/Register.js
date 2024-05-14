import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'react-native-image-picker';

export default function Register() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    fileUpload: '',
    photo: '',
  });
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    fileUpload: '',
    photo: '',
  });

  const validateFullname = (fullname) => {
    let errorMessage = '';
    if (!fullname) {
      errorMessage = 'Fullname is required';
    } else if (fullname.length < 9 || fullname.length > 30) {
      errorMessage = 'Fullname must be between 9 and 30 characters long';
    }
    setErrors((prevErrors) => ({ ...prevErrors, fullname: errorMessage }));
  };

  const validateEmail = (email) => {
    let errorMessage = '';
    if (!email) {
      errorMessage = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage = 'Invalid email format';
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
  };

  const validatePassword = (password) => {
    let errorMessage = '';
    if (!password) {
      errorMessage = 'Password is required';
    } else if (password.length < 8 || password.length > 25) {
      errorMessage = 'Password must be between 8 and 25 characters long';
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: errorMessage }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    let errorMessage = '';
    if (!phoneNumber) {
      errorMessage = 'Phone number is required';
    } else if (!/^\d+$/.test(phoneNumber)) {
      errorMessage = 'Phone number must contain only digits';
    } else if (phoneNumber.length !== 12) {
      errorMessage = 'Phone number must be 12 digits long';
    }
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: errorMessage }));
  };

  const validateFileUpload = (fileUpload) => {
    let errorMessage = '';
    if (!fileUpload) {
      errorMessage = 'File upload is required';
    } else if (fileUpload.size > 3 * 1024 * 1024) { // 3MB max size
      errorMessage = 'File size must be less than 3MB';
    } else if (!/\.(pdf)$/i.test(fileUpload.name)) { // accept only pdf files
      errorMessage = 'File must be in PDF format';
    }
    setErrors((prevErrors) => ({ ...prevErrors, fileUpload: errorMessage }));
  };

  const validatePhoto = (photo) => {
    let errorMessage = '';
    if (!photo) {
      errorMessage = 'Photo is required';
    } else if (photo.size > 5 * 1024 * 1024) { // 5MB max size
      errorMessage = 'Photo size must be less than 5MB';
    } else if (!/\.(png|jpg|jpeg)$/i.test(photo.name)) { // accept only png, jpg, jpeg files
      errorMessage = 'Photo must be in PNG, JPG, or JPEG format';
    }
    setErrors((prevErrors) => ({ ...prevErrors, photo: errorMessage }));
  };

  const handleInputChange = (name, value) => {
    switch (name) {
      case 'fullname':
        validateFullname(value);
        break;
      case 'email':
        validateEmail(value);
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'phoneNumber':
        validatePhoneNumber(value);
        break;
      case 'fileUpload':
        validateFileUpload(value);
        break;
      case 'photo':
        validatePhoto(value);
        break;
      default:
        break;
    }
    setForm({ ...form, [name]: value });
  };

  const handlePhotoUpload = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', maxWidth: 300, maxHeight: 300, quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const photo = response.assets[0];
        handleInputChange('photo', { name: photo.fileName, size: photo.fileSize });
        setForm({ ...form, photo: photo.uri });
      }
    });
  };

  const handleSubmit = () => {
    validateFullname(form.fullname);
    validateEmail(form.email);
    validatePassword(form.password);
    validatePhoneNumber(form.phoneNumber);
    validateFileUpload(form.fileUpload);
    validatePhoto(form.photo);

    if (
      Object.values(errors).every((error) => error === '') &&
      Object.values(form).every((value) => value !== '')
    ) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Invalid Form', 'Please correct the highlighted errors');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => { navigation.goBack() }}
            style={styles.backBtn}>
            <FeatherIcon
              color="#FD6B69"
              name="arrow-left"
              size={24} />
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Fullname</Text>
              <TextInput
                onChangeText={(value) => handleInputChange('fullname', value)}
                placeholder="e.g. Brice Nanyang"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.fullname} />
              {!!errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                onChangeText={(value) => handleInputChange('phoneNumber', value)}
                placeholder="e.g. 237657807309"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.phoneNumber} />
              {!!errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="e.g. bricenanyang@jobs.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
              {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
              {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Curriculum Vitae</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>--- Click to select CV from your phone --- </Text>
              </TouchableOpacity>
              {!!errors.fileUpload && <Text style={styles.errorText}>{errors.fileUpload}</Text>}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Profile Photo</Text>
              <TouchableOpacity style={styles.button} onPress={handlePhotoUpload}>
                <Text style={styles.buttonText}>--- Select photo from your phone --- </Text>
              </TouchableOpacity>
              {!!errors.photo && <Text style={styles.errorText}>{errors.photo}</Text>}
              {form.photo ? <Image source={{ uri: form.photo }} style={styles.imagePreview} /> : null}
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>
                    Sign up <FeatherIcon color="#FFFFFF" name="save" size={18} />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdada',
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 36,
  },
  /** Form */
  form: {
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    color: '#9fa5af',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 6,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#24262e',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2, // Augmentation de l'épaisseur de la bordure
    borderColor: '#FD6B68', // Couleur de la bordure
    borderStyle: 'dashed', // Bordure en traits interrompus
  },
  buttonText: {
    color: '#6b7280',
    fontSize: 16,
    textAlign: 'center',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: '#FD6B68',
    borderColor: '#FD6B68',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
