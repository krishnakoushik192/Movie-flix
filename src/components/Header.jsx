import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Pressable, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Header = ({ props }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleLogout = async () => {
        await AsyncStorage.removeItem('isLoggedIn');
        props.navigation.navigate('Login');
    }
    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Are you sure you want to</Text>
                        <Text style={styles.modalSubtitle}>Logout?</Text>

                        <View style={styles.buttonContainer}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={handleLogout}
                                style={styles.confirmButton}
                            >
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
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
            <Pressable style={styles.searchIcon} onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="logout" size={30} color="#D6C7FF" />
            </Pressable>
            {renderModal()}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: 120, // reduced height for less space
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 'auto'
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
    searchIcon: {
        marginLeft: 'auto',
        marginTop: 60,
        paddingRight: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContainer: {
        backgroundColor: '#1A1B2E',
        borderRadius: 16,
        padding: 24,
        margin: 20,
        minWidth: 280,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#2A2B3E',
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 4,
    },
    modalSubtitle: {
        color: '#D6C7FF',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#2A2B3E',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3A3B4E',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#6C5CE7',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Header;
