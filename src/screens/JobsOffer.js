import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const items = [
  {
    icon: 'twitch',
    color: '#9146ff',
    label: 'iOS Developer',
    company: 'Twitch',
    location: 'San Diego, CA',
    type: 'Full-Time',
    salary: 175000,
    date: '1 day ago',
  },
  {
    icon: 'slack',
    color: '#e5ac2c',
    label: 'Director of Marketing',
    company: 'Slack',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    salary: 325000,
    date: '1 month ago',
  },
  {
    icon: 'linkedin',
    color: '#0d65c2',
    label: 'Customer Support',
    company: 'Linkedin',
    location: 'Seattle, WA',
    type: 'Part-Time',
    salary: 76000,
    date: '3 days ago',
  },
  {
    icon: 'twitter',
    color: '#1ca2f1',
    label: 'CEO',
    company: 'Twitter',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    salary: 1250000,
    date: '2 day ago',
  },
];

export default function JobsOffer() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: '#F4EFF3' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backBtn}>
          <FeatherIcon color="#FD6B69" name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Suggested Jobs</Text>

        {items.map(
          (
            { icon, color, label, company, location, type, salary, date },
            index,
          ) => {
            return (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={[styles.card, { backgroundColor: '#FFF', borderRadius: 15, marginBottom: 10, marginTop: 10, padding: 15 }]}>
                    <View style={styles.cardTop}>
                      <View
                        style={[styles.cardLogo, { backgroundColor: color }]}>
                        <FeatherIcon
                          color="#fff"
                          name={icon}
                          size={24} />
                      </View>

                      <View style={styles.cardBody}>
                        <View>
                          <Text style={styles.cardTitle}>{label}</Text>

                          <Text style={styles.cardCompany}>{company}</Text>
                        </View>

                        <Text style={styles.cardSalary}>
                          ${salary.toLocaleString('en-US')}
                          /yr
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cardFooter}>
                      <View style={styles.cardFooterItem}>
                        <FeatherIcon
                          color="#464646"
                          name="map-pin"
                          size={14} />

                        <Text style={styles.cardFooterItemText}>
                          {location}
                        </Text>
                      </View>

                      <View style={styles.cardFooterItem}>
                        <FeatherIcon
                          color="#464646"
                          name="briefcase"
                          size={14} />

                        <Text style={styles.cardFooterItemText}>{type}</Text>
                      </View>

                      <View
                        style={[styles.cardFooterItem, { marginLeft: 'auto' }]}>
                        <FeatherIcon
                          color="#464646"
                          name="clock"
                          size={14} />

                        <Text style={styles.cardFooterItemText}>{date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          },
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    paddingVertical: 14,
  },
  cardWrapper: {
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  cardLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#272727',
    marginBottom: 4,
  },
  cardCompany: {
    fontSize: 14,
    fontWeight: '500',
    color: '#818181',
  },
  cardSalary: {
    fontSize: 15,
    fontWeight: '700',
    color: '#959796',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    marginTop: 8,
    marginHorizontal: -8,
  },
  cardFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  cardFooterItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#464646',
    marginLeft: 4,
  },
});