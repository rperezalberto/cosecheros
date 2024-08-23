import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../features/userSlice';

import uuid from 'react-native-uuid';
import { UserIterface } from '../interfaces/userInterfaces';
import { RootState } from '../redux/store';
import { Picker } from '@react-native-picker/picker';


const addUser = (text: string) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [show, setShow] = useState(false);


    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [selectedProvince, setSelectedProvince] = useState("");

    const [province, setProvince] = useState();
    const showDatepicker = () => {
        setShow(true);
    };

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || birthdate;
        setShow(false);
        setBirthdate(currentDate);
    };


    const { isLoading } = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch();

    return (
        <ScrollView className='flex-1 bg-white p-5'>

            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <>
                    <View>
                        <View style={styles.containerAddImg}>
                            <FontAwesome6 name="image" size={50} color="black" />
                            <Text className='pt-5' style={styles.title}>Add image</Text>
                            <Text style={styles.subtitle}>(up to 12 Mb)</Text>
                        </View>

                        <View className='pt-5'>
                            <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Name:</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setName(text)} // Utiliza onChangeText
                            />
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
                                <Picker style={styles.input}
                                    selectedValue={province}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setProvince(itemValue)
                                    }>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                            </View>
                        </View>



                    </View>
                    <Pressable style={styles.btn} onPress={() => {

                        const newUser: UserIterface = {
                            id: uuid.v4().toString(),
                            name: name,
                            birthdate: birthdate,
                            province: selectedProvince,
                            img: "https://example.com/image.jpg",
                        };

                        dispatch(add(newUser));
                    }}>
                        <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>Send</Text>
                    </Pressable>
                </>
            )}


        </ScrollView>
    )
}

export default addUser;

const styles = StyleSheet.create({
    containerAddImg: {
        borderWidth: 2,
        borderColor: '#D3DAE2',
        borderStyle: 'dashed',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',

        // borderRadius: 10,
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
    }, btn: {
        alignItems: 'center',
        marginVertical: 30,
        paddingVertical: 20,
        backgroundColor: '#1FCC79',
        borderRadius: 10,
    }
});
