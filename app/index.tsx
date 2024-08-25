import React, { useEffect } from 'react';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { UserIterface } from '../interfaces/userInterfaces';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, storageCon } from '../firebase/firebaseConfig';
import { setUserData, deleteItem, loadUserDataFromAsyncStorage } from '../features/userSlice';
import { getDownloadURL, ref } from "firebase/storage";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function App() {
  const { userData } = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 1000;

  useEffect(() => {
    loadUserDataFromAsyncStorage(dispatch);

    const unsub = onSnapshot(collection(db, "users"), async (snapshot) => {
      const usersData = await Promise.all(snapshot.docs.map(async (doc) => {
        const data = doc.data() as UserIterface;

        if (data.img) {
          const imageRef = ref(storageCon, `images/${data.img}`);

          const fetchImageUrlWithRetries = async (retries = 0) => {
            try {
              return await getDownloadURL(imageRef);
            } catch (error: any) {
              if (error.code === 'storage/object-not-found' && retries < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return fetchImageUrlWithRetries(retries + 1);
              } else {
                console.error("Error al obtener la URL de la imagen:", error);
                return null;
              }
            }
          };

          data.img = await fetchImageUrlWithRetries();
        }

        return {
          ...data,
          id: doc.id,
        };
      }));

      dispatch(setUserData(usersData));
    });

    return () => unsub();
  }, [dispatch]);

  const renderItems = ({ item }: { item: UserIterface }) => {
    return (
      <View>
        <View className='flex-1 flex-row items-center'>
          <Link href={{ pathname: "/detail", params: { user: JSON.stringify(item) } }} asChild>
            <Pressable accessibilityLabel={`Cosechero ${item.name}`}>
              <View className='flex-row items-center pb-5'>
                <Image
                  className='w-20 h-20 rounded-lg'
                  source={item.img ? { uri: item.img } : require("../assets/sheldon.png")}
                  accessibilityLabel={`Imagen de ${item.name}`}
                />
                <View className='flex-col pl-3'>
                  <Text className='text-black text-2xl font-bold'>{item.name}</Text>
                  <Text>{item.province}</Text>
                  <Text>{item.id}</Text>
                </View>
              </View>
            </Pressable>
          </Link>
          <Pressable className='pl-5' onPress={() => dispatch(deleteItem(item.id))}>
            <MaterialIcons name="delete" size={26} color="red" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View className='flex-1 bg-white p-2'>
      <Text className='text-black text-2xl font-bold p-10 pl-1'>Listado de Cosecheros</Text>
      <FlatList
        data={userData}
        renderItem={renderItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No hay datos disponibles</Text>
          </View>

        )}
      />

      <Pressable style={styles.addButton} accessibilityLabel="Agregar nuevo cosechero">
        <Link href={"addUser"}>
          <View style={styles.btn}>
            <FontAwesome6 name="add" size={24} color="white" />
          </View>
        </Link>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
  btn: {
    width: 60,
    height: 60,
    backgroundColor: '#1FCC79',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
