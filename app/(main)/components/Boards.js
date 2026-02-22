import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { mcuTypes } from '../miscFunc/mcuTypes';

import { setValueToDatabase, updateValuesToDatabase } from '../miscFunc/firebaseFunctions';


export default function Boards({ boardData, uid, sendSelectedBoard }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [boardName, setBoardName] = useState(boardData.deviceName || '');
    const [deviceType, setDeviceType] = useState(boardData.deviceType || null);

    const deviceCode = boardData.deviceCode;

    // Auto-open modal if deviceType is missing (Legacy logic)
    useEffect(() => {
        if (!boardData.deviceType) setShowModal(true);
        setDeviceType(boardData.deviceType);
    }, [boardData]);

    const onFeedSelect = (devCode, devFeed) => {
        sendSelectedBoard(devCode, devFeed);
        setIsOpen(false);
    };

    const handleSaveName = () => {
        if (!deviceType || deviceType === "Select MCU") {
            Alert.alert("Error", "Please Select Device Type");
            return;
        }

        const data = { deviceName: boardName, deviceCode, deviceType };
        updateValuesToDatabase(`${uid}/${deviceCode}`, data);
        setShowModal(false);
    };

    const deleteBoard = () => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setValueToDatabase(`${uid}/${deviceCode}`, null);
                    setShowModal(false);
                }
            }
        ]);
    };

    if (typeof boardData !== 'object') return null;

    return (
        <View style={styles.outerContainer}>
            {/* Main Toggle Row */}
            <View style={styles.dropdownContainer}>
                <Pressable
                    onPress={() => setIsOpen(!isOpen)}
                    style={[styles.toggleButton, !boardData.deviceType && styles.bgWarning, isOpen && styles.bgActive]}
                >
                    <MaterialCommunityIcons name="lightning-bolt-circle" size={20} color="#ebf1eb" />
                    <Text style={styles.toggleText}>{boardName || deviceCode}</Text>
                </Pressable>

                <Pressable style={styles.settingsIcon} onPress={() => { setShowModal(true); setIsOpen(false); }}>
                    <Ionicons name="settings-outline" size={20} color="#00fff2" />
                </Pressable>
            </View>

            {/* Dropdown Content */}
            {isOpen && boardData.devFeeds && (
                <View style={styles.menu}>
                    {Object.keys(boardData.devFeeds).map(devFeed => {
                        const isSelected = boardData.devFeeds[devFeed].isSelected;
                        return (
                            <Pressable
                                key={devFeed}
                                style={[styles.menuItem, isSelected && styles.bgPrimary]}
                                onPress={() => onFeedSelect(deviceCode, devFeed)}
                            >
                                <Text style={[styles.menuItemText, isSelected && styles.textWhite]}>{devFeed}</Text>
                                <View style={styles.badge}><Text style={styles.badgeText}>{boardData.devFeeds[devFeed].value}</Text></View>
                            </Pressable>
                        );
                    })}
                </View>
            )}

            {/* Modal Implementation */}
            <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBody}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Edit Board ~ {deviceCode}</Text>
                            <Pressable onPress={() => setShowModal(false)}><Feather name="x" size={24} /></Pressable>
                        </View>

                        <ScrollView style={{ padding: 20 }}>
                            <Text style={styles.label}>Board Name</Text>
                            <TextInput style={styles.input} value={boardName} onChangeText={setBoardName} placeholder="Enter Name" />

                            <Text style={[styles.label, (deviceType === "Select MCU" || !boardData.deviceType) && styles.textDanger]}>
                                Select Microcontroller
                            </Text>
                            <View style={[styles.pickerWrapper, !deviceType && styles.borderDanger]}>
                                <Picker selectedValue={deviceType || boardData.deviceType} onValueChange={setDeviceType}>
                                    <Picker.Item label="Select MCU" value="Select MCU" />
                                    {Object.keys(mcuTypes).map(key => (
                                        <Picker.Item key={key} label={mcuTypes[key].name} value={key} />
                                    ))}
                                </Picker>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <Pressable style={[styles.btn, styles.btnDanger]} onPress={deleteBoard}>
                                <Text style={styles.btnText}>Delete</Text>
                            </Pressable>
                            <Pressable style={[styles.btn, styles.btnPrimary]} onPress={handleSaveName}>
                                <Text style={styles.btnText}>Save Changes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: { marginBottom: 15, width: '200px' },
    dropdownContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    toggleButton: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#2c3e50', borderRadius: 8 },
    toggleText: { color: '#ebf1eb', marginLeft: 10, fontWeight: '600' },
    bgActive: { backgroundColor: '#153b68' },
    bgWarning: { backgroundColor: '#f39c12' },
    settingsIcon: { padding: 10 },
    menu: { backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginTop: -2, borderWidth: 1, borderColor: '#ddd' },
    menuItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
    bgPrimary: { backgroundColor: '#007bff' },
    menuItemText: { color: '#333' },
    textWhite: { color: '#fff' },
    badge: { backgroundColor: '#343a40', paddingHorizontal: 8, borderRadius: 10 },
    badgeText: { color: '#fff', fontSize: 12 },
    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
    modalBody: { width: '90%', backgroundColor: 'white', borderRadius: 12, overflow: 'hidden' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    modalTitle: { fontSize: 16, fontWeight: 'bold' },
    label: { fontWeight: 'bold', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 15 },
    pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 20 },
    modalFooter: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderTopWidth: 1, borderTopColor: '#eee' },
    btn: { padding: 10, borderRadius: 6, minWidth: 100, alignItems: 'center' },
    btnPrimary: { backgroundColor: '#007bff' },
    btnDanger: { backgroundColor: '#dc3545' },
    btnText: { color: 'white', fontWeight: 'bold' },
    textDanger: { color: 'red' },
    borderDanger: { borderColor: 'red' }
});
