import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../features/userSlice';
import uuid from 'react-native-uuid';
import { UserIterface } from '../interfaces/userInterfaces';
import { RootState } from '../redux/store';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectImagen from '../components/selectImagen';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storageCon } from '../firebase/firebaseConfig';
import { LoadImg } from '../utils/utils';
import { useRouter } from 'expo-router';



const addUser = () => {
    const idUser = uuid.v4().toString();
    const [show, setShow] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [selectedProvince, setSelectedProvince] = useState("");
    const [isModalVisible, setModalVisible] = useState(false); // Nuevo estado para el modal

    const router = useRouter();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || birthdate;
        setShow(false);
        setBirthdate(currentDate);
    };



    const uploadImgPost = async (imageUri: string) => {
        setIsImage(true);
        console.log("Entre " + isImage);
        try {
            console.log("Iniciando la carga de imagen...");

            const isImage = await LoadImg(imageUri);
            console.log("Imagen cargada como Blob");

            const refDocument = ref(storageCon, 'images/' + idUser + ".png");

            await uploadBytes(refDocument, isImage);
            console.log("Imagen subida correctamente");
            setIsImage(false);
            console.log("Sali " + isImage);

        } catch (error) {
            console.log("Error al subir la imagen");
            console.log(error);
        }
    };

    const { isLoading, img } = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch();

    console.log("img " + img);
    return (
        <ScrollView className='flex-1 bg-white p-5'>

            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <>
                    <TouchableOpacity onPress={toggleModal}>
                        <View style={[styles.containerAddImg, {
                            borderColor: img.trim() == "" ? '#D3DAE2' : "#1FCC79",
                        }]}>
                            <FontAwesome6 name="image" size={50} color="black" />
                            <Text className='pt-5' style={styles.title}>Add image</Text>
                            <Text style={styles.subtitle}>(up to 12 Mb)</Text>
                        </View>
                    </TouchableOpacity>

                    <View className='pt-5'>
                        <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Name:</Text>
                        <TextInput style={styles.input} onChangeText={(text) => setName(text)} />
                        <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Birthdate:</Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                value={birthdate.toLocaleDateString()}
                                onFocus={showDatepicker}
                                placeholder="Select date"
                            />
                            {show && (
                                <DateTimePicker
                                    value={birthdate}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>

                        <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Province:</Text>
                        <View>
                            <Picker
                                style={styles.input}
                                selectedValue={selectedProvince}
                                onValueChange={(itemValue) => setSelectedProvince(itemValue)}
                            >
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>
                    </View>

                    <Pressable style={styles.btn} onPress={() => {
                        uploadImgPost(img);
                        const newUser: UserIterface = {
                            id: idUser,
                            name: name,
                            birthdate: birthdate.toISOString(),
                            province: selectedProvince,
                            img: idUser + ".png",
                        };
                        if (!isImage) {
                            dispatch(add(newUser));
                            setName("");
                            setBirthdate(new Date());
                            router.push('/');
                        }

                    }}>
                        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>Send</Text>
                    </Pressable>

                    <SelectImagen
                        isVisible={isModalVisible}
                        toggleModal={toggleModal}
                    />
                </>
            )}
        </ScrollView>
    );
}

export default addUser;

const styles = StyleSheet.create({
    containerAddImg: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#445B76',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#B0B6BE',
        textAlign: 'center',
        marginTop: 5,
    },
    input: {
        borderWidth: .8,
        borderColor: '#B0B6BE',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    btn: {
        alignItems: 'center',
        marginVertical: 30,
        paddingVertical: 20,
        backgroundColor: '#1FCC79',
        borderRadius: 10,
    }
});
