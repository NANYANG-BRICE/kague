import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function OPT() {
  const navigation = useNavigation();
  const handleSubmitResetPassword = async () => {
    let newEmail = account && account.email && account.email.substring(1, account.email.length - 1);
    if (newEmail) {
      try {
        console.log(newEmail);
        const response = await fetch("http://localhost:3000/api/v1/users/reset", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: newEmail,
          }),
        });

        const data = await response.json(); // Convert response to JSON
        const user = data.user; // Extract user object from response
        await AsyncStorage.setItem('emailsession', JSON.stringify(user.email));
        console.log(user); // Now you have the user object
        navigation.navigate('OPT');

      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      console.log('error');
    }
  };
  
  const [form, setForm] = useState({
    code: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const session = await AsyncStorage.getItem('emailsession');
        if (session !== null) {
          const email = await AsyncStorage.getItem('emailsession');
          setAccount({ email });
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error retrieving session data:', error);
      }
    };

    getSessionData();
  }, [navigation]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.code || form.code.length !== 6) {
      newErrors.code = 'Code must be 6 characters long';
    }
    if (!form.password || form.password.length < 6 || form.password.length > 20) {
      newErrors.password = 'Password must be between 6 and 20 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const newEmail = account && account.email && account.email.substring(1, account.email.length - 1);
        console.log('Submitting data:', form, newEmail);

        const response = await fetch("http://localhost:3000/api/v1/users/reload", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: newEmail,
            opt: form.code,
            password: form.password,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }

        const { user } = await response.json();
        console.log(user); // Now you have the user 
        navigation.navigate("Login");

        // console.log(newEmail, form.code, form.password)
        // const data = await response.json(); // Convert response to JSON
        // const user = data.user; // Extract user object from response
      } catch (error) {
        Alert.alert('Internal server', 'Failed to submit data');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => { navigation.goBack()  }}
            style={styles.headerAction}>
            <FeatherIcon
              color="#FD6B69"
              name="arrow-left"
              size={24} />
          </TouchableOpacity>

          <Text style={styles.title}>Enter Code</Text>

          <Text style={styles.subtitle}>
            We emailed a code to{' '}
            <Text style={{ color: '#222' }}>{account && account.email && account.email.substring(1, account.email.length - 1)}</Text>, please
            enter the code and your new password to continue.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>OPT Verification Code</Text>
          <View style={styles.formInput}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              caretHidden={true}
              keyboardType="number-pad"
              onChangeText={(value) => handleInputChange('code', value)}
              returnKeyType="done"
              style={styles.formInputControl}
              value={form.code} />

            <View style={styles.formInputOverflow}>
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <Text key={index} style={styles.formInputChar}>
                    {form.code[index] || (
                      <Text style={styles.formInputCharEmpty}>-</Text>
                    )}
                  </Text>
                );
              })}
            </View>
          </View>
          {!!errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
          <br />

          <View style={styles.input}>
            <Text style={styles.inputLabel}>New Password</Text>
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

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  Confirm <FeatherIcon color="#FFFFFF" name="send" size={18} />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmitResetPassword}>
          <Text style={styles.formFooter}>
            Didn't get the email?{' '}
            <Text style={styles.formLink}>Resend code</Text>
          </Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#181818',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#889797',
  },
  /** Header */
  header: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdada',
    marginBottom: 16,
  },
  /** Form */
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 24,
  },
  formInput: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  formInputControl: {
    height: 60,
    color: 'transparent',
    paddingHorizontal: 16,
    zIndex: 2,
  },
  formInputOverflow: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  formInputChar: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    lineHeight: 60,
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '600',
  },
  formInputCharEmpty: {
    color: '#BBB9BC',
    fontWeight: '400',
  },
  formAction: {
    marginVertical: 0,
  },
  formFooter: {
    marginTop: 'auto',
    marginBottom: 24,
    paddingHorizontal: 24,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    color: '#9fa5af',
    textAlign: 'center',
  },
  formLink: {
    textAlign: 'right',
    fontWeight: '600',
    color: '#FD6B68',
    textDecorationLine: 'underline',
    textDecorationColor: '#FD6B68',
    textDecorationStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    // paddingHorizontal: 24,
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
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '500',
    color: '#181818',
  },
  inputControl: {
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
    color: '#DC2626',
    fontSize: 12,
  },
});
