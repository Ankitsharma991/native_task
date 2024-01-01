import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const EditModal = ({ isVisible, onCancel, onOk, initialData }) => {
    const [name, setName] = useState(initialData.name);
    const [email, setEmail] = useState(initialData.email);
    const [role, setRole] = useState(initialData.role);

    const handleOk = () => {
        onOk({ name, email, role });
        setName('');
        setEmail('');
        setRole('');
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Edit User Details</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Role"
                        value={role}
                        onChangeText={(text) => setRole(text)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.okButton} onPress={handleOk}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    cancelButton: {
        padding: 10,
        backgroundColor: '#DC3545',
        borderRadius: 5,
    },
    okButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    modalContent: {
        width: '100%',
        padding: 20,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: '#000',
        textDecorationStyle: 'solid',
    },
});

export default EditModal;
