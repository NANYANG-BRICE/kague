import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';


const stats = [
  { label: 'Location', value: 'Cameroon' },
  { label: 'Job Type', value: 'Full Time' },
  { label: 'Experience', value: 'Student' },
];
const tags = ['ios', 'android', 'web', 'ui', 'ux'];
const tagsDirectories = ['settings', 'profile', 'job suggestion', 'experience'];

export default function Dashboard() {
  const [account, setAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);



  const navigation = useNavigation();
  const handleDownload = () => {
    const fileUrl = 'URL_DU_FICHIER_A_TELECHARGER';
    Linking.openURL(fileUrl)
      .then((supported) => {
        if (!supported) {
          console.error("Impossible d'ouvrir l'URL :", fileUrl);
        }
      })
      .catch((err) => console.error('Erreur lors de l\'ouverture de l\'URL :', err));
  };

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const session = await AsyncStorage.getItem('session');
        if (session !== null) {
          const fullname = await AsyncStorage.getItem('fullname');
          const email = await AsyncStorage.getItem('email');
          const password = await AsyncStorage.getItem('password');
          const phoneNumber = await AsyncStorage.getItem('phoneNumber');
          const photo = await AsyncStorage.getItem('photo');
          setAccount({ fullname, email, password, phoneNumber, photo });
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error retrieving session data:', error);
      }
    };

    getSessionData();
  }, [navigation]);


  const logout = async () => {
    navigation.navigate('Login');
    Alert.alert('Successful Logout', 'Please login to continue your vibe.');
  };

  const handleSearch = (text) => {
    if (text.trim() === '') {
      setSearchResults([]); // Efface les résultats si la recherche est vide
    } else {
      const filteredResults = tagsDirectories.filter(tag =>
        tag.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const handleResultSelection = (result) => {
    if (result === 'settings') {
      navigation.navigate('Settings');
    } else if (result === 'profile') {
      navigation.navigate('Profile');
    }else if (result === 'job suggestion') {
      navigation.navigate('Jobs');
    }else if (result === 'experience') {
      navigation.navigate('Experience');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4EFF3' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerBadge}>
              {new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                weekday: 'long',
              })}
            </Text>

            <Text style={styles.headerTitle}>
              Hi, Ulrich!
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
                placeholder="Enter anythinks...."
                placeholderTextColor="#9eadba"
                style={styles.input}
                value={searchTerm}
                onChangeText={(text) => {
                  setSearchTerm(text);
                  handleSearch(text);
                }}
              />

              <View style={styles.inputIcon}>
                <FeatherIcon color="#9eadba" name="search" size={16} />
              </View>
            </View>
            <View style={styles.searchResultsContainer}>
              {searchResults.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => handleResultSelection(result)}
                >
                  <Text>{result}</Text>
                </TouchableOpacity>
              ))}
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

        <View style={styles.profile1}>
          <View style={styles.profileTop1}>
            <View style={styles.avatar1}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.avatarImg1} />

              <View style={styles.avatarNotification1} />
            </View>

            <View style={styles.profileBody1}>
              <Text style={styles.profileTitle1}>
                Ulrich Auriole
              </Text>

              <Text style={styles.profileSubtitle1}>
                <FeatherIcon color="#000" name="mail" size={18} /> &nbsp;
                kague.ulrich@gmail.com
              </Text>
              <Text style={styles.profileSubtitle1}>
                <FeatherIcon color="#000" name="phone-call" size={18} /> &nbsp;
                00237692134088
              </Text>
            </View>
          </View>
        </View>

        <br />


        <View style={styles.stats}>
          {stats.map(({ label, value }, index) => (
            <View
              key={index}
              style={[styles.statsItem, index === 0 && { borderLeftWidth: 0 }]}>
              <Text style={styles.statsItemText}>{label}</Text>

              <Text style={styles.statsItemValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.btnGroup}>
          <TouchableOpacity onPress={() => { logout() }}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnT}>
              <Text style={styles.btnText1}>
                Logout <FeatherIcon color="#FD6B68" name="file-text" size={14} />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownload} style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>
                Download CV <FeatherIcon color="#FFF" name="download" size={14} />
              </Text>
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

  avatar1: {
    position: 'relative',
  },
  avatarImg1: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },

  avatarNotification1: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#FD6B68',
  },

  /** Profile */
  profile1: {
    paddingVertical: 18,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 25,
  },
  profileTop1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody1: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle1: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 10,
  },
  profileSubtitle1: {
    fontSize: 15,
    fontWeight: '600',
    color: '#778599',
    marginBottom: 5,
  },
  profileDescription1: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  profileTags1: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem1: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
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


  /** Stats */
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#778599',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#121a26',
  },



  /** Button */
  btnT: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderColor: '#FD6B68',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
  },
  btnText1: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FD6B68',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#FD6B68',
    borderColor: '#FD6B68',
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
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


  searchResultsContainer: {
    position: 'relative',
    top: '100%', // Pour positionner la liste juste en dessous du champ de recherche
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    zIndex: 1, // Pour s'assurer que la liste est au-dessus des autres composants
  },
  searchResultItem: {
    padding:10,
  },
});