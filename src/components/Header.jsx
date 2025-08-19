import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <ImageBackground
            source={require('../assets/BG.png')}
            style={styles.imageBackground}
            resizeMode="stretch"
        >
            <View style={styles.headerRow}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
                <Text style={styles.title}>Movie Filx</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: 120, // reduced height for less space
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40, // one uniform margin instead of per-element
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        color: '#D6C7FF',
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10,
    },
});

export default Header;
