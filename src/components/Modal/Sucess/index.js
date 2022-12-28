import React, { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useRoute } from '@react-navigation/native'
import colors from '../../../services/colors';


export default function Success() {

    const route = useRoute()


    const [visible, setVisible] = useState(false)
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        setVisible(route.params?.modal)
        setMensagem(route.params?.mensagem)
    }, [route])

    return (
        <Modal
            animationType="fade"
            visible={visible}
            transparent

        >
            <View style={styles.container}>

                <View style={styles.modal}>

                    <Text style={styles.txt_mensagem}>{mensagem}</Text>

                    <TouchableOpacity
                        style={styles.obaa}
                        onPress={() => {
                            setVisible(!visible)
                            setMensagem('')
                        }}
                    >
                        <Text style={styles.txt_obaa}>Obaa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000090'
    },
    modal: {
        maxWidth: '85%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 20
    },
    obaa: {
        backgroundColor: colors.two,
        padding: 5,
        borderRadius: 15,
        width: '25%',
        marginTop: 20
    },
    txt_mensagem: {
        fontSize: 16
    },
    txt_obaa: {
        paddingHorizontal: 10,
        color: '#fff'
    }
})