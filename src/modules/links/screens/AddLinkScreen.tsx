import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { RootStackParamList } from "../../../core/navigation/RootStack";
import { useLinks } from "../context/LinkContext";

type Props = NativeStackScreenProps<RootStackParamList, "AddLink">;


export const AddLinkScreen: React.FC<Props> = ({ navigation }) => {
    const { addLink } = useLinks();
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const handleSave = () => {
        addLink(title, url);
        navigation.goBack();
    };

    const disabled = !url.trim();

    return (
        <KeyboardAvoidingView
            style={styles.safe}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.label}>Título (opcional)</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Ej: Documentación React Native"
                    placeholderTextColor="#6B7280"
                />

                <Text style={styles.label}>URL</Text>
                <TextInput
                    style={styles.input}
                    value={url}
                    onChangeText={setUrl}
                    placeholder="https://..."
                    placeholderTextColor="#6B7280"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                />

                <Pressable
                    style={[styles.button, disabled && styles.buttonDisabled]}
                    onPress={handleSave}
                    disabled={disabled}
                >
                    <Text style={styles.buttonText}>Guardar enlace</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#020617",
    },
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        color: "#E5E7EB",
        fontSize: 14,
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: "#020617",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#1F2937",
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: "#F9FAFB",
        fontSize: 14,
    },
    button: {
        marginTop: 24,
        backgroundColor: "#22C55E",
        paddingVertical: 12,
        borderRadius: 999,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#4B5563",
    },
    buttonText: {
        color: "#F9FAFB",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default AddLinkScreen;
