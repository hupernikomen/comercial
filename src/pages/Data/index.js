import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Picker } from "@react-native-picker/picker";

import { useIsFocused, useRoute, useNavigation } from '@react-navigation/native';

export default function Data() {

    const { user } = useContext(AuthContext)

    const route = useRoute()
    const focus = useIsFocused()
    const navigation = useNavigation()

    const [name, setNome] = useState(route.params?.name)
    const [bio, setBio] = useState(route.params?.bio)
    const [phone, setPhone] = useState(route.params?.phone)
    const [email, setEmail] = useState('')
    const [region, setRegion] = useState('')
    const [delivery, setDelivery] = useState('') 

    const [deliverySelected, setDeliverySelected] = useState(false)// enviado na selecao picker


    useEffect(() => {
        async function handleUser() {

            const {data} = await api.get(`/user?userID=${user.id}`)

            setEmail(data.email)
            setRegion(data.region.name)
            setDelivery(data.userFormat?.delivery)
        }

        handleUser()

    }, [])


    async function Update() {
        await api.put(`/user?userID=${user.id}`, {
            name: name,
            bio: bio,
            phone: phone,
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        })

        await api.put(`/format?userID=${user.id}`, {
            delivery: delivery,
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        })

    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.form}>

                <TextInput placeholder='Nome' style={styles.input} value={name} onChangeText={setNome} />
                <TextInput placeholder='Preço' style={styles.input} value={phone} onChangeText={setPhone} />
                <TextInput autoCorrect={false} placeholder='Descrição' style={styles.input} value={bio} multiline={true} onChangeText={setBio} />

                <View style={styles.deliveryPicker}>
                    <Picker
                        style={styles.picker}
                        mode="dropdown"
                        selectedValue={delivery}
                        onValueChange={(itemValue, itemIndex) => {
                            setDelivery(itemValue);
                        }}
                    >

                        <Picker.Item
                            value={true}
                            label="Sim, faço entregas"
                            style={{ fontSize: 16 }}
                        />
                        <Picker.Item
                            value={false}
                            label="Não faço entregas"
                            style={{ fontSize: 16 }}
                        />


                    </Picker>
                </View>

                <TextInput editable={false} placeholder='Email' style={styles.input} value={email} onChangeText={setEmail} />
                <TextInput editable={false} placeholder='Região' style={styles.input} value={region} />

            </ScrollView>

            <TouchableOpacity activeOpacity={.8}
                onPress={() => {
                    Update()
                    navigation.navigate('Home')
                }
                } style={styles.btnatualiar}>
                <Text style={styles.txtbtn}>Atualizar...</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        padding: 15,
        flex: 1
    },

    input: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        fontSize: 16,
        margin: 2,
        minHeight: 50,
    },
    deliveryPicker: {
        minHeight: 50,
        margin: 2,
        backgroundColor: "#fff",
    },
    btnatualiar: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    txtbtn: {
        fontSize: 16,

    }
})