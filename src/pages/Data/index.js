import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Switch } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { useRoute, useNavigation } from '@react-navigation/native';

import Ico from 'react-native-vector-icons/Feather'

import api from '../../services/api';
import colors from '../../services/colors';

export default function Data() {

    const { user, signOut } = useContext(AuthContext)

    const route = useRoute()
    const navigation = useNavigation()

    const [name, setNome] = useState(route.params?.name)
    const [bio, setBio] = useState(route.params?.bio)
    const [phone, setPhone] = useState(route.params?.phone)
    const [email, setEmail] = useState('')
    const [region, setRegion] = useState('')

    const [me, setMe] = useState([])


    useEffect(() => {
        async function Me() {
            const response = await api.get('/me');
            setMe(response?.data);

            setEmail(response.data?.email)
            setRegion(response.data?.region?.name)
        }

        Me();


    }, []);

    useLayoutEffect(() => {

        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.app.base,
                
            },
            headerTintColor:'#fff',
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity
                            style={styles.btns_saveexit}
                            onPress={() => {
                                Update()
                            }}>
                            <Ico style={styles.ico} name='thumbs-up' size={20} color={colors.util.white} />

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btns_saveexit}
                            onPress={signOut}>

                            <Ico style={styles.ico} name='log-out' size={20} color={colors.util.white} />
                        </TouchableOpacity>

                    </View>
                )
            }
        })
    }, [name, bio, phone, email, region])

    async function Update() {
        await api.put(`/user?userID=${user.id}`, {
            name,
            bio,
            phone,
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        })


    }

    return (
        <View style={styles.container}>

            <StatusBar backgroundColor={colors.app.base} />

            <ScrollView style={styles.form}>

                <TextInput placeholder='Nome' inlineImagePadding={50} inlineImageLeft='store'
                    numberOfLines={1} maxLength={35}
                    style={styles.input} value={name} onChangeText={setNome} />

                <TextInput placeholder='Whatsapp' inlineImagePadding={50} inlineImageLeft='whatsapp'
                    numberOfLines={1} maxLength={11}
                    style={styles.input} value={phone} onChangeText={setPhone} />

                <TextInput autoCorrect={false} placeholder='Sobre a Loja' inlineImagePadding={50} inlineImageLeft='text_account'
                    style={styles.input} value={bio} multiline={true} onChangeText={setBio} />

                <TextInput editable={false} placeholder='Email' inlineImagePadding={50} inlineImageLeft='email'
                    style={styles.input} value={email} onChangeText={setEmail} />

                <TextInput editable={false} placeholder='Região' inlineImagePadding={50} inlineImageLeft='map'
                    style={styles.input} value={region} />




            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        paddingHorizontal: 20,
        marginVertical: 10,
        flex: 1
    },
    input: {
        height: 55,
        fontSize:16,
        backgroundColor: colors.util.white,
        marginBottom: 8,
        paddingHorizontal: 15,
        borderRadius: 4,
    },

    deliveryPicker: {
        backgroundColor: colors.background_component,
        marginBottom: 5,
        borderRadius: 4,
        height: 60,
    },
    btns_saveexit: {
        width: 35,
        alignItems: 'flex-end',
        marginLeft: 15,
        height: 50,
        justifyContent:'center',
    },
})