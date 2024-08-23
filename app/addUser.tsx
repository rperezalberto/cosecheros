import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import DropDownPicker from 'react-native-dropdown-picker';

import DateTimePicker from '@react-native-community/datetimepicker';


const addUser = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [items, setItems] = useState([
        { label: 'Java', value: 'java' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Python', value: 'python' },
    ]);

    const showDatepicker = () => {
        setShow(true);
    };



    return (
        <ScrollView className='flex-1 bg-white p-5'>

            <View>
                <View style={styles.containerAddImg}>
                    <FontAwesome6 name="image" size={50} color="black" />
                    <Text className='pt-5' style={styles.title}>Add image</Text>
                    <Text style={styles.subtitle}>(up to 12 Mb)</Text>
                </View>

                <View className='pt-5'>
                    <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Name:</Text>
                    <TextInput style={styles.input} />
                    <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Birthdate:</Text>
                    <TextInput style={styles.input} />


                    <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Province:</Text>
                    <View>
                        <DropDownPicker style={styles.input}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Select a language"
                        />
                    </View>
                </View>


                <Text style={[styles.title, { alignSelf: 'flex-start', paddingVertical: 5, marginTop: 10 }]}>Birthdate:</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        value={date.toLocaleDateString()}
                        onFocus={showDatepicker}
                        placeholder="Select date"
                    />
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                        // onChange={onChange}
                        />
                    )}
                </View>
            </View>
            <Pressable style={styles.btn}>
                <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>Send</Text>
            </Pressable>
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
