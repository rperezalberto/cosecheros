import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { UserIterface } from '../interfaces/userInterfaces';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';


export default function App() {


  const { userData, lastName } = useSelector((state: RootState) => state.userData);


  const renderItems = ({ item }: { item: UserIterface }) => {
    return (

      <Link href={{ pathname: "/detail", params: { id: item.id } }} asChild>
        <Pressable>
          <View className='flex-row items-center pb-5'>
            <Image className='w-20 h-20 rounded-full' source={{ uri: item.img }} />
            <View className='flex-col pl-3'>
              <Text className='text-3xl'>{item.name}</Text>
              <Text className='text-gray-600'>{item.email}</Text>
              <Text>{item.id}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  };

  return (

    <View className='flex-1 bg-white pl-2'>
      <Text className='mt-10 text-2xl font-bold pb-5'>Listado de {lastName}</Text>
      <FlatList
        data={userData}
        renderItem={renderItems}
        keyExtractor={(item) => item.id.toString()}
      />

      <Pressable style={{ position: 'absolute', bottom: 40, right: 10 }}>
        <Link href={"addUser"} >
          <View style={style.btn}>
            <FontAwesome6 name="add" size={24} color="white" />
          </View>

        </Link>
      </Pressable>
      <StatusBar style="auto" />
    </View>

  );
}

const style = StyleSheet.create({
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
  }
}
);