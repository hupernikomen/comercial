import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../services/colors';

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={25} color={colors.dark} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})