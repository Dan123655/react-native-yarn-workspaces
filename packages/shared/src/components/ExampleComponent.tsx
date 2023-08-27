import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import LogoSrc from "../images/logo.png";

type ExampleComponentProps = {
    mapoticApp: string;
};
  
export function ExampleComponent({ mapoticApp }: ExampleComponentProps): JSX.Element {
    const [value, setValue] = useState("     ");
    const { getItem, setItem } = useAsyncStorage("@counter");

    const readItemFromStorage = async () => {
        const item = await getItem();
        setValue(item || "");
    };

    const writeItemToStorage = async (newValue: string) => {
        await setItem(newValue);
        setValue(newValue);
    };

    useEffect(() => {
        readItemFromStorage();
    }, []);

    return (
        <View style={styles.root}>
             <Image style={styles.logo} source={LogoSrc} />
            <Text
                style={styles.text}
            >{`This buttn is visible and functional in all monorepo apps. You are running "${mapoticApp}"`}</Text>
            <View style={styles.row}>
                <Text style={styles.text}>Current value: </Text>
                <Text style={styles.value}>{value} </Text>
            </View>
            <Button
                onPress={() =>
                    writeItemToStorage(Math.random().toString(36).substr(2, 5))
                }
                title="Update value"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 28,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    text: {
        maxWidth: 420,
        marginBottom: 12,
        fontSize: 22,
        fontWeight: "400",
        textAlign: "center",
    },
    value: {
        marginBottom: 12,
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center"
    },
});