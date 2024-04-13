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


export default function Register() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    fileUpload: '',
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {navigation.goBack()}}
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
                onChangeText={fullname => setForm({ ...form, fullname })}
                placeholder="e.g. Brice Nanyang"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.fullname} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Phone Number</Text>

              <TextInput
                onChangeText={phoneNumber => setForm({ ...form, phoneNumber })}
                placeholder="e.g. 237657807309"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.phoneNumber} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="e.g. bricenanyang@jobs.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Curriculum Vitae</Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>--- Click to select cv into your phone --- </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign up</Text>
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
    paddingVertical: 16,
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