import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { UserIterface } from '../interfaces/userInterfaces';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, storageCon } from '../firebase/firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { setUserData } from '../features/userSlice';
import { getDownloadURL, ref } from "firebase/storage";

export default function App() {
  const { userData } = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 1000;

  useEffect(() => {
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
                console.log(`Reintentando obtener la URL... (${retries + 1}/${MAX_RETRIES})`);
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
      <Link href={{ pathname: "/detail", params: { id: item.id } }} asChild>
        <Pressable>
          <View className='flex-row items-center pb-5'>
            <Image
              style={styles.image} // Usando StyleSheet para el estilo
              source={item.img ? { uri: item.img } : require("../assets/sheldon.png")}
            />
            <View className='flex-col pl-3'>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.id}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Cosecheros</Text>
      <FlatList
        data={userData}
        renderItem={renderItems}
        keyExtractor={(item) => item.id.toString()}
      />

      <Pressable style={styles.addButton}>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 8,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 24,
  },
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
