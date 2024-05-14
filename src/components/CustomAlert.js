import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function CustomAlert({ iconColor, iconName, title, message, onClose }) {
  return (
    <View style={styles.alert}>
      <View
        style={[
          styles.alertIcon,
          { backgroundColor: iconColor, borderColor: iconColor },
        ]}>
        <FeatherIcon
          color="#fff"
          name={iconName}
          size={30} />
      </View>

      <View style={styles.alertBody}>
        <Text style={styles.alertTitle}>{title}</Text>

        <Text style={styles.alertMessage}>
          {message}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onClose}>
        <View style={styles.alertClose}>
          <FeatherIcon color="#9a9a9a" name="x" size={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Alert */
  alert: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 24,
    overflow: 'hidden',
  },
  alertIcon: {
    padding: 16,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e1e1e',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9c9c9c',
  },
  alertClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
