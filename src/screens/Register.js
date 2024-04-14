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

export default function Register() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    fileUpload: '',
  });
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    fileUpload: '',
  });

  // Fonction de validation du fullname
  const validateFullname = (fullname) => {
    let errorMessage = '';
    if (!fullname) {
      errorMessage = 'Fullname is required';
    } else if (fullname.length < 9 || fullname.length > 30) {
      errorMessage = 'Fullname must be between 9 and 30 characters long';
    }
    setErrors((prevErrors) => ({ ...prevErrors, fullname: errorMessage }));
  };

  // Fonction de validation de l'email
  const validateEmail = (email) => {
    let errorMessage = '';
    if (!email) {
      errorMessage = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage = 'Invalid email format';
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
  };

  // Fonction de validation du mot de passe
  const validatePassword = (password) => {
    let errorMessage = '';
    if (!password) {
      errorMessage = 'Password is required';
    } else if (password.length < 8 || password.length > 25) {
      errorMessage = 'Password must be between 8 and 25 characters long';
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: errorMessage }));
  };

  // Fonction de validation du numéro de téléphone
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      setErrors((prevState) => ({ ...prevState, phoneNumber: 'Phone number is required' }));
      return false;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      setErrors((prevState) => ({ ...prevState, phoneNumber: 'Phone number must contain only digits' }));
      return false;
    }
    if (phoneNumber.length !== 12) {
      setErrors((prevState) => ({ ...prevState, phoneNumber: 'Phone number must be 12 digits long' }));
      return false;
    }
    setErrors((prevState) => ({ ...prevState, phoneNumber: '' }));
    return true;
  };


  // Fonction de validation du fichier upload
  const validateFileUpload = (fileUpload) => {
    let errorMessage = '';
    if (!fileUpload) {
      errorMessage = 'File upload is required';
    }
    // Ajoutez d'autres validations si nécessaire, par exemple, la taille du fichier et le type de fichier
    setErrors((prevErrors) => ({ ...prevErrors, fileUpload: errorMessage }));
  };

  // Fonction de gestion de la saisie de champ
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
      default:
        break;
    }
    setForm({ ...form, [name]: value });
  };

  /// Fonction de gestion de la soumission du formulaire
  const handleSubmit = () => {
    // Validation de tous les champs
    validateFullname(form.fullname);
    validateEmail(form.email);
    validatePassword(form.password);
    validatePhoneNumber(form.phoneNumber);
    validateFileUpload(form.fileUpload);

    // Vérification s'il y a des erreurs
    if (
      Object.values(errors).every((error) => error === '') &&
      Object.values(form).every((value) => value !== '')
    ) {
      // Soumettre le formulaire ou effectuer d'autres actions
      // Par exemple, envoyer les données au serveur
      navigation.navigate('Login');
    } else {
      // Afficher un message d'erreur
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
                <Text style={styles.buttonText}>--- Click to select cv into your phone --- </Text>
              </TouchableOpacity>
              {!!errors.fileUpload && <Text style={styles.errorText}>{errors.fileUpload}</Text>}
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

            <Text style={styles.formFooter}>
              By clicking "Sign up", you agree to our
              <Text style={{ color: '#45464E', fontWeight: '600' }}>
                {' '}
                Terms & Conditions{' '}
              </Text>
              and
              <Text style={{ color: '#45464E', fontWeight: '600' }}>
                {' '}
                Privacy Policy
              </Text>
              .
            </Text>
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
    marginTop: 16,
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
});
