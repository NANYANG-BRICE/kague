import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ResetPassword() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    info: '',
  });
  const [errors, setErrors] = useState({
    info: '',
  });

  // Fonction de validation de l'information
  const validateInfo = (info) => {
    if (!info) {
      return 'Info is required';
    }
    if (info.length < 9) {
      return 'Info must be at least 9 characters long';
    }
    return '';
  };

  // Fonction de gestion de la saisie de champ
  const handleInputChange = (value) => {
    const error = validateInfo(value);
    setForm({ ...form, info: value });
    setErrors({ ...errors, info: error });
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = () => {
    const error = validateInfo(form.info);
    if (error) {
      // Afficher le message d'erreur si le champ n'est pas valide
      setErrors({ ...errors, info: error });
    } else {
      // Soumettre le formulaire ou effectuer d'autres actions
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backBtn}>
            <FeatherIcon color="#FD6B69" name="arrow-left" size={24} />
          </TouchableOpacity>

          <Text style={styles.title}>Forgot Password?</Text>

          <Text style={styles.subtitle}>
            Enter your registered phone number or email address to receive the password reset instructions.
          </Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address -- or -- Phone number. </Text>

              <TextInput
                onChangeText={handleInputChange}
                placeholder="e.g. johndoe"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.info} />
              {!!errors.info && <Text style={styles.errorText}>{errors.info}</Text>}
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Reset Password <FeatherIcon color="#FFFFFF" name="refresh-cw" size={18} /></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => { navigation.navigate('Login') }}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Remember password?{' '}
            <Text style={{ textDecorationLine: 'underline', color: '#FE724E' }}>Sign In</Text>
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
});
