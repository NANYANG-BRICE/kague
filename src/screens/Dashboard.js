import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';




export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerBadge}>
              {new Date('2022-12-12').toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                weekday: 'long',
              })}
            </Text>

            <Text style={styles.headerTitle}>
              Hi,
              Brandon!
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.avatar}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.avatarImg} />

              <View style={styles.avatarNotification} />
            </View>
          </TouchableOpacity>
        </View>


        <View style={styles.search}>
          <View style={styles.searchInput}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter tracking code"
                placeholderTextColor="#9eadba"
                style={styles.input} />

              <View style={styles.inputIcon}>
                <FeatherIcon
                  color="#9eadba"
                  name="search"
                  size={16} />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => { }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <br />
        <View style={styles.stats}>
          <TouchableOpacity onPress={() => navigation.navigate("Jobs")}>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <View style={styles.statsItemIcon}>
                  <FeatherIcon color="#fff" name="list" size={22} />
                </View>

                <View>
                  <Text style={styles.statsItemLabel}>Jobs Experiences</Text>

                  <Text style={styles.statsItemValue}>83</Text>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon
                    color="#9ca3af"
                    name="chevron-right"
                    size={22} />
                </View>
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate("JobsOffer")}>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <View style={styles.statsItemIcon}>
                  <FeatherIcon color="#fff" name="list" size={22} />
                </View>

                <View>
                  <Text style={styles.statsItemLabel}>Jobs Suggestion</Text>

                  <Text style={styles.statsItemValue}>83</Text>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon
                    color="#9ca3af"
                    name="chevron-right"
                    size={22} />
                </View>
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => console.log('Touchable pressed')}>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <View style={styles.statsItemIcon}>
                  <FeatherIcon color="#fff" name="list" size={22} />
                </View>

                <View>
                  <Text style={styles.statsItemLabel}>Active Tasks</Text>

                  <Text style={styles.statsItemValue}>83</Text>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon
                    color="#9ca3af"
                    name="chevron-right"
                    size={22} />
                </View>
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => console.log('Touchable pressed')}>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <View style={styles.statsItemIcon}>
                  <FeatherIcon color="#fff" name="list" size={22} />
                </View>

                <View>
                  <Text style={styles.statsItemLabel}>Active Tasks</Text>

                  <Text style={styles.statsItemValue}>83</Text>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon
                    color="#9ca3af"
                    name="chevron-right"
                    size={22} />
                </View>
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => console.log('Touchable pressed')}>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <View style={styles.statsItemIcon}>
                  <FeatherIcon color="#fff" name="list" size={22} />
                </View>

                <View>
                  <Text style={styles.statsItemLabel}>Active Tasks</Text>

                  <Text style={styles.statsItemValue}>83</Text>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon
                    color="#9ca3af"
                    name="chevron-right"
                    size={22} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    // padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
    marginTop: 25,
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerBadge: {
    fontSize: 15,
    fontWeight: '400',
    color: '#a3a3a3',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#121212',
  },
  /** Avatar */
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#FD6B68',
    top: 0,
    right: -2,
    width: 14,
    height: 14,
    backgroundColor: '#FD6B68',
  },

  cardAction: {
    marginLeft: 'auto',
  },


  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 24,
    padding: 0,
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

  stats: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  statsItem: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginBottom: 15,
  },
  statsItemIcon: {
    backgroundColor: '#FD6B69',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    marginRight: 8,
    borderRadius: 8,
  },
  statsItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8e8e93',
    marginBottom: 2,
  },
  statsItemValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#081730',
  },

  /** Content */
  content: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a2525',
  },
  contentLink: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2525',
  },
  contentPlaceholder: {
    borderStyle: 'dashed',
    borderWidth: 4,
    borderColor: '#e5e7eb',
    flex: 1,
    borderRadius: 8,
  },


  /** Search */
  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 12,
  },
  /** Input */
  input: {
    height: 44,
    backgroundColor: '#FFF',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#222',
    borderColor: '#222',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});