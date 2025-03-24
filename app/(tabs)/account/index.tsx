import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import UserCard from '@/components/shared/userCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextS from '@/components/shared/TextS'
import { Image } from 'expo-image'
import { Avater, Logo } from '@/constants/images'
import { AntDesign, FontAwesome5, Fontisto, Ionicons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateUserId, useUser, removeUser, setUser } from '@/hooks/useUser'
import { useToken } from '@/hooks/useAuth'
import { HomeType } from '@/types/type'
import { useFocusEffect } from '@react-navigation/native'
import { BASE_URL, getChilds, getUserInfo } from '@/api/api'

const childs = [
  {
    name: 'Abdumalik Maxammadsobitov',
    id: '2029ba5c-1ecc-46fe-9a91-842a1771dc1a',
    image: Avater
  },
  {
    name: 'Kamoliddin Komilov',
    id: '38bcbdf6-af51-43d3-b042-99388893dc60',
    image: Avater
  },
  {
    name: 'Moxirjon Komilov',
    id: '94fd71ff-77e9-4916-9d27-88ab161ae743',
    image: Avater
  }
]

interface Student {
  attachmentId: string | null;
  fullName: string;
  studentId: string;
}

type Students = Student[];


export default function Index() {
  const { top, bottom } = useSafeAreaInsets()

  const router = useRouter()
  const { user, setUserState } = useUser(); // 👈 Теперь есть setUserState
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedChild, setSelectedChild] = useState<string | undefined>(user?.id)



  const handleSelectChild = async (child: string) => {
    setSelectedChild(child)
    await updateUserId(child, setUserState); // 👈 Передаём setUserState

  }

  const handleConfirmSelection = () => {
    setModalVisible(false)
  }

  const handlePHistory = () => {
    router.push('/screens/PaymentHistory')
  }

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('auth_token')
      await removeUser(setUserState)
      console.log('User logged out')
      router.replace('/Auth/CheckPhone')
    } catch (e) {
      console.log({ e })
    }
  }



  const { token } = useToken();
  const [data, setData] = useState<HomeType>();
  const [childsData, setChilds] = useState<Students>()

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        console.log("User ID found:", user.id);
        fetchData(user.id);  // Вызываем fetchData напрямую с user.id
        GetChild()
      }
    }, [user?.id]) // Теперь зависимость корректная
  );
  const fetchData = async (id: any) => {
    if (token && id) {
      try {

        const response = await getUserInfo(token, id);
        setData(response.data);
        await setUser('Full name', 'Group', setUserState);
      } catch (error) {
        console.log(error);
      }
    }
  };


  const GetChild = async () => {
    try {
      const response = await getChilds(token, user?.phoneNumber);
      setChilds(response.data);
      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <TextS style={{ color: '#002930', fontSize: 24, fontWeight: 'bold' }}>Akkaunt</TextS>

        <Image
          source={{ uri: Logo }}
          style={{ width: 147, height: 51 }}
          contentFit="cover"
          priority="high"
          cachePolicy="memory-disk"
        />
      </View>
      <UserCard name={data ? data?.student.fullName : 'fullname'} group={data ? data?.group : 'Group'} photoId={data ? data.student.photoId : ''} />

      <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={handlePHistory}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.iconW}>
            <Octicons name="history" size={24} color="#00CDDB" />
          </View>
          <TextS style={styles.buttonText}>Tranzaksiyalar tarixi</TextS>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={24} color="#848A9C" style={{ marginRight: 10 }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => router.navigate('/screens/MyProducts')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.iconW}>
            <Ionicons name="gift-outline" size={24} color="#00CDDB" />
          </View>
          <TextS style={styles.buttonText}>Mening sovgalarim</TextS>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={24} color="#848A9C" style={{ marginRight: 10 }} />
      </TouchableOpacity>

      {/* Button to open modal */}
      {childsData && childsData.length > 1 ? (
        <TouchableOpacity style={[styles.button,]} activeOpacity={.8} onPress={() => setModalVisible(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.iconW}>
              <FontAwesome5 name="exchange-alt" size={24} color="#00CDDB" />
            </View>
            <TextS style={styles.buttonText}>Farzandni o‘zgartirish</TextS>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color="#848A9C" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ) : (null)}

      {/* Modal for selecting child */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)} />
        <View style={styles.modalContent}>
          <TextS style={styles.modalTitle}>Farzandni tanlang</TextS>

          {/* Child Selection List */}
          {childsData && childsData.map((child) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={child.studentId}
              style={[
                styles.modalOption,
                selectedChild === child.studentId && styles.selectedOption // Добавляем красную рамку при выборе
              ]}
              onPress={() => handleSelectChild(child.studentId)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{
                  uri: `${BASE_URL}/api/attachment/v1/attachment/download?id=${child.attachmentId}&view=open`
                }} style={styles.childAvatar} />
                <TextS style={styles.optionText}>{child.fullName}</TextS>
              </View>

              <Fontisto name="radio-btn-active" size={24}
                style={[
                  styles.radioButton,
                  selectedChild === child.studentId && styles.selectedRadioButton // Добавляем красный кружок при выборе
                ]}
                color="black" />
            </TouchableOpacity>
          ))}

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.confirmButton, !selectedChild && styles.disabledButton]}
            disabled={!selectedChild}
            onPress={handleConfirmSelection}
          >
            <AntDesign name="checkcircleo" size={24} color="#fff" />
            <TextS style={styles.confirmButtonText}>Tanlash</TextS>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* <TouchableOpacity style={styles.button} onPress={GetChild}>
        <TextS>{user?.phoneNumber}</TextS>
      </TouchableOpacity> */}


      {/* Logout Button */}
      <TouchableOpacity style={[styles.button, { marginTop: 'auto' }]} activeOpacity={.8} onPress={handleLogOut}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.iconW, { backgroundColor: '#FFEDED' }]}>
            <SimpleLineIcons name="logout" size={24} color="#FB4B47" />
          </View>
          <TextS style={styles.buttonText}>Tizimdan chiqish</TextS>
        </View>
      </TouchableOpacity>

      {/* <TextS style={{ marginTop: 10, color: '#848A9C' }}>{user?.id}</TextS> */}

      {/* <TextS>Developed by tmBekzod</TextS> */}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    alignItems: 'center'
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginTop: 16,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonText: {
    fontSize: 18,
    color: '#002930',
    fontWeight: '800',
    marginLeft: 18
  },
  iconW: {
    width: 49,
    height: 49,
    backgroundColor: '#E6FCFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002930',
    marginBottom: 10
  },
  modalOption: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    justifyContent: 'space-between',
    marginBottom: 2
  },
  radioButton: {
    color: '#A7A7A7'
  },
  selectedRadioButton: {
    color: '#00CDDB'
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: '#00CDDB',
    backgroundColor: '#fff',

  },
  optionText: {
    fontSize: 18,
    color: '#002930',
    fontWeight: 'bold'
  },
  confirmButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#00414C',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10
  },
  disabledButton: {
    backgroundColor: '#D3D3D3'
  }
})
