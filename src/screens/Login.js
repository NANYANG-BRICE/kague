import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';



export default function Login() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const refRBSheet = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (email) => {
    setForm({ ...form, email });
    validateEmail(email);
  };

  const handlePasswordChange = (password) => {
    setForm({ ...form, password });
    validatePassword(password);
  };

  const validateEmail = (email) => {
    if (!email) {
      setErrors(prevState => ({ ...prevState, email: 'Email is required' }));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prevState => ({ ...prevState, email: 'Invalid email format' }));
      return false;
    }
    setErrors(prevState => ({ ...prevState, email: '' }));
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setErrors(prevState => ({ ...prevState, password: 'Password is required' }));
      return false;
    }
    if (password.length < 8 || password.length > 20) {
      setErrors(prevState => ({ ...prevState, password: 'Password must be between 8 and 20 characters long' }));
      return false;
    }
    setErrors(prevState => ({ ...prevState, password: '' }));
    return true;
  };

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(form.email);
    const isPasswordValid = validatePassword(form.password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    else{
      navigation.navigate("Dashboard");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { }} style={styles.backBtn}>
            <FeatherIcon color="#FD6B69" name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            We emailed a code to{' '}
            <Text style={{ color: '#222' }}>john@example.com</Text>, please
            enter the code to continue.
          </Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                onChangeText={handleEmailChange}
                placeholder="e.g. johndoe"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
              {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={handlePasswordChange}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
              {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <Text style={styles.formLink}>
              <TouchableOpacity onPress={() => { navigation.navigate('forgot') }}>
                <Text style={{ color: '#FE724E' }}> Forgot password?</Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>
                    Login <FeatherIcon color="#FFFFFF" name="log-in" size={18} />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => { navigation.navigate('Register') }}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{ textDecorationLine: 'underline', color: '#FE724E' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>

        {/* RBSheet */}
        <RBSheet
          ref={refRBSheet}
          customStyles={{ container: styles.sheet }}
          height={240}
          openDuration={250}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Operation in progress</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.bodyText}>
              Please wait a few moments.....
            </Text>

            {/* Affichage du loading */}
            {isLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#FD6B68" />
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
              }}>
              <View style={styles.btnT}>
                <Text style={styles.btnText}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.bodyGap} />
          </View>
        </RBSheet>

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
    // marginTop: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#889797',
    marginBottom: 30,
  },
  /** Form */
  form: {
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formLink: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '400',
    color: '#FD6B68',
    textAlign: 'right',
    textDecorationLine: 'underline'
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
    letterSpacing: 0.15,
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
  errorText: {
    color: 'red',
    marginTop: 4,
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
  /** RBSheet */
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    borderBottomWidth: 1,
    borderColor: '#efefef',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  /** Body */
  body: {
    padding: 24,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#0e0e0e',
    marginBottom: 24,
    textAlign: 'center',
  },
  bodyGap: {
    marginBottom: 12,
  },
  /** Button */
  btnT: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#ff3c2f',
    borderColor: '#ff3c2f',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#dddce0',
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000',
  },
});
