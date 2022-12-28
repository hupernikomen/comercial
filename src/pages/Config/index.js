import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

import colors from '../../services/colors';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import api from '../../services/api';

export default function Config() {

    const navigation = useNavigation()
    const focus = useIsFocused()

    const { user } = useContext(AuthContext)

    const [me, setMe] = useState([])
    const [delivery, setDelivery] = useState(false)

    const toggleSwitch = () => {
        setDelivery(!delivery);
    }

    useEffect(() => {
        async function Me() {
            const response = await api.get('/me');
            setMe(response?.data);
            setDelivery(response.data?.userFormat?.delivery)
        }

        Me();


    }, [focus]);


    useEffect(() => {

        async function Update() {


            await api.put(`/format?userID=${user.id}`, {
                delivery,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            })

        }
        Update()
    }, [delivery])

    return (
        <View style={styles.container}>

            <ScrollView style={styles.form}>


                <View style={{ paddingLeft: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 50 }}>
                    <Text style={{ color: '#333', fontSize: 16 }}>Entrega:</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#e1e1e1" }}
                        thumbColor={delivery ? colors.secondary : '#fff'}
                        onValueChange={toggleSwitch}
                        value={delivery}
                    />
                </View>

                <View style={{ paddingLeft: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 50 }}>
                    <Text style={{ color: '#333', fontSize: 16 }}>Loja Ativa:</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#e1e1e1" }}
                        thumbColor={{ false: "#767577", true: "#e1e1e1" }}
                        value={me.active}
                    />
                </View>


            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})