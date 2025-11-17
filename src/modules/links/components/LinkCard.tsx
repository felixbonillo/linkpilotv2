import React from "react";
import {
    Linking,
    Pressable,
    Share,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { LinkItem } from "../types/link.types";

type Props = {
    item: LinkItem;
    onDelete?: () => void;
};

export const LinkCard: React.FC<Props> = ({ item, onDelete }) => {
    const handleOpen = () => {
        Linking.openURL(item.url).catch(() => {
            console.warn("No se pudo abrir la URL", item.url);
        });
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${item.title} - ${item.url}`,
            });
        } catch (error) {
            console.warn("Error al compartir enlace", error);
        }
    };

    return (
        <Pressable style={styles.card} onPress={handleOpen}>
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={styles.url} numberOfLines={1}>
                        {item.url}
                    </Text>
                    <Text style={styles.date}>
                        {new Date(item.createdAt).toLocaleString()}
                    </Text>
                </View>

                <View style={styles.actionsColumn}>
                    <Pressable style={styles.iconButton} onPress={handleShare}>
                        <Text style={styles.iconText}>↗</Text>
                    </Pressable>

                    {onDelete && (
                        <Pressable style={styles.iconButton} onPress={onDelete}>
                            <Text style={styles.iconText}>🗑</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#020617",
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#1F2937",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    title: {
        color: "#F9FAFB",
        fontSize: 16,
        fontWeight: "600",
    },
    url: {
        color: "#93C5FD",
        fontSize: 13,
    },
    date: {
        color: "#6B7280",
        fontSize: 11,
        marginTop: 4,
    },
    actionsColumn: {
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        marginLeft: 4,
    },
    iconButton: {
        padding: 6,
    },
    iconText: {
        fontSize: 16,
        color: "#E5E7EB",
    },
});
