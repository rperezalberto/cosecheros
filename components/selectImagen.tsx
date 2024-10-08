import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { addImg } from '../features/userSlice';


interface SelectImagenProps {
    isVisible: boolean;
    toggleModal: () => void;
}

const SelectImagen: React.FC<SelectImagenProps> = ({ isVisible, toggleModal }) => {



    const dispatch = useDispatch();

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            dispatch(addImg(result.assets[0].uri)); // Almacena la URI de la imagen
            toggleModal(); // Cierra el modal después de seleccionar
        }
    };

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            dispatch(addImg(result.assets[0].uri)); // Almacena la URI de la imagen
            toggleModal(); // Cierra el modal después de seleccionar
        }
    };

    const pickerImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            dispatch(addImg(result.assets[0].uri));
            toggleModal();
        }
    };


    return (
        <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
            <View style={styles.modalView}>
                <Text style={styles.title}>Opciones</Text>
                <TouchableOpacity style={[styles.button, styles.blackButton]} onPress={openCamera}>
                    <Text style={styles.blackText}>Tomar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.blackButton]} onPress={openGallery}>
                    <Text style={styles.blackText}>Elegir de la Galería</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.redButton]} onPress={toggleModal}>
                    <Text style={styles.redText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

export default SelectImagen;

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    blackButton: {
        borderColor: 'black',
        borderWidth: 1,
    },
    blackText: {
        color: 'black',
        fontWeight: 'bold',
    },
    redButton: {
        borderColor: 'red',
        borderWidth: 1,
    },
    redText: {
        color: 'red',
        fontWeight: 'bold',
    },
});

