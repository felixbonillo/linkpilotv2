import { RootStackParamList } from "@/src/core/navigation/RootStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinkCard } from "../components/LinkCard";
import { useLinks } from "../context/LinkContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const { links, removeLink, clearLinks, isHydrated } = useLinks();

    // Mientras no esté hidratado, mostramos pantalla de carga simple
    if (!isHydrated) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={[styles.container, styles.center]}>
                    <Text style={styles.loadingText}>Cargando enlaces...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.title}>LinkPilot Mobile</Text>
                        <Text style={styles.subtitle}>
                            Guarda, organiza y comparte tus enlaces
                        </Text>
                    </View>

                    <Pressable
                        style={styles.addButton}
                        onPress={() => navigation.navigate("AddLink")}
                    >
                        <Text style={styles.addText}>+ Añadir</Text>
                    </Pressable>
                </View>

                {links.length === 0 ? (
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyTitle}>Sin enlaces todavía</Text>
                        <Text style={styles.emptyText}>
                            Empieza guardando los recursos que más usas: docs, paneles,
                            dashboards, etc.
                        </Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={links}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <LinkCard
                                    item={item}
                                    onDelete={() => removeLink(item.id)}
                                />
                            )}
                            contentContainerStyle={{ paddingBottom: 24 }}
                        />
                        <Pressable style={styles.clearButton} onPress={clearLinks}>
                            <Text style={styles.clearText}>Limpiar todos</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </SafeAreaView>
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
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#9CA3AF",
        fontSize: 14,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    title: {
        color: "#F9FAFB",
        fontSize: 20,
        fontWeight: "700",
    },
    subtitle: {
        color: "#9CA3AF",
        fontSize: 13,
        marginTop: 2,
    },
    addButton: {
        backgroundColor: "#4F46E5",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
    },
    addText: {
        color: "#F9FAFB",
        fontWeight: "600",
        fontSize: 13,
    },
    emptyBox: {
        marginTop: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#1F2937",
        padding: 16,
    },
    emptyTitle: {
        color: "#E5E7EB",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    emptyText: {
        color: "#9CA3AF",
        fontSize: 13,
    },
    clearButton: {
        alignSelf: "center",
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#4B5563",
    },
    clearText: {
        color: "#9CA3AF",
        fontSize: 12,
    },
});
