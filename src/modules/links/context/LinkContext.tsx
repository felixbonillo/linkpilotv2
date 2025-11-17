import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { LinkItem } from "../types/link.types";

const STORAGE_KEY = "@linkpilot:links";

type LinkContextValue = {
    links: LinkItem[];
    addLink: (title: string, url: string) => void;
    removeLink: (id: string) => void;
    clearLinks: () => void;
    isHydrated: boolean; // 👈 para saber si ya cargamos del storage
};

const LinkContext = createContext<LinkContextValue | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const LinkProvider: React.FC<Props> = ({ children }) => {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // 🔄 Cargar desde AsyncStorage al iniciar
    useEffect(() => {
        const loadLinks = async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) {
                    const parsed: LinkItem[] = JSON.parse(raw);
                    setLinks(parsed);
                }
            } catch (error) {
                console.warn("Error cargando links desde AsyncStorage", error);
            } finally {
                setIsHydrated(true);
            }
        };

        loadLinks();
    }, []);

    // 💾 Guardar en AsyncStorage cada vez que cambian los links
    useEffect(() => {
        if (!isHydrated) return; // Evitamos sobreescribir mientras cargamos

        const persist = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(links));
            } catch (error) {
                console.warn("Error guardando links en AsyncStorage", error);
            }
        };

        persist();
    }, [links, isHydrated]);

    const addLink = (title: string, url: string) => {
        const trimmedUrl = url.trim();
        const trimmedTitle = title.trim();

        if (!trimmedUrl) {
            Alert.alert("URL requerida", "Debes introducir una URL");
            return;
        }

        if (!trimmedUrl.startsWith("http")) {
            Alert.alert(
                "URL inválida",
                "Por buenas prácticas, la URL debe empezar por http o https"
            );
            return;
        }

        const newLink: LinkItem = {
            id: uuid.v4().toString(),
            title: trimmedTitle || trimmedUrl,
            url: trimmedUrl,
            createdAt: Date.now(),
        };

        setLinks((prev) => [newLink, ...prev]);
    };

    const removeLink = (id: string) => {
        setLinks((prev) => prev.filter((link) => link.id !== id));
    };

    const clearLinks = () => {
        setLinks([]);
    };

    const value = useMemo(
        () => ({
            links,
            addLink,
            removeLink,
            clearLinks,
            isHydrated,
        }),
        [links, isHydrated]
    );

    return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
};

export const useLinks = (): LinkContextValue => {
    const ctx = useContext(LinkContext);
    if (!ctx) {
        throw new Error("useLinks debe usarse dentro de <LinkProvider>");
    }
    return ctx;
};
