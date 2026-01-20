import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize as rf } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';


interface data {
    id: number,
    question: string,
    hint1: string,
    hint2: string,
    example1_input: string,
    example1_output: string,
    example2_input: string,
    example2_output: string,
    level: string,
    discription: string,

}


const Discription = () => {

    const { item } = useLocalSearchParams<{ item: string }>();
    const router = useRouter();

    const parsedItem: data | null = item ? JSON.parse(item) : null;

    if (!parsedItem) return null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={rf(3.5)} color="#fff" />
                </TouchableOpacity>
                <View >
                    <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>Problem Details</Text>
                </View>

            </View>
            <View style={{ borderWidth: 0.5, marginTop: 20, borderColor: "gray" }} />

            <FlatList
                data={[parsedItem]}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item: data }) => (
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{data.question}</Text>
                            <Text style={{ color: '#2bee79', fontSize: 20, fontWeight: "800" }}>{data.level}</Text>
                        </View>
                        <View style={{ borderWidth: 0.2, marginTop: 10, borderColor: "gray" }} />


                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>Description</Text>
                            <Text style={{ fontSize: 16, fontWeight: "700", color: "white" }}> {data.discription}</Text>
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10, color: "white" }}>Example 1 :</Text>
                            <View style={{ borderWidth: 1, padding: 15, borderRadius: 10, borderColor: "white" }}>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}> Input : {data.example1_input}</Text>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}> Output : {data.example1_output}</Text>
                            </View>

                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10, color: "white" }}>Example 2 :</Text>
                            <View style={{ borderWidth: 1, padding: 15, borderRadius: 10, borderColor: "white" }}>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}> Input : {data.example2_input}</Text>
                                <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}> Output : {data.example2_output}</Text>
                            </View>

                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10, color: "white" }}>Hints</Text>
                            <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, borderColor: "white" }}>
                                <Text style={{ fontSize: 16, fontWeight: "600", color: "white", marginBottom: 10 }}>Hint 1 </Text>
                                <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>{data.hint1}</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, borderColor: "white", marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "600", color: "white", marginBottom: 10 }}>Hint 2 </Text>
                                <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>{data.hint2}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={styles.buttonContainer} >
                <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/codEditor", params: { parsedItem: item } })}>
                    <Text style={{ color: "black", fontWeight: "900", fontSize: 20 }}>Submit</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView >
    )
}



export default Discription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#102217'
    },
    button: {

        borderRadius: 20,
        height: 50,
        width: "80%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#2bee79',
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
        backgroundColor: '#102217'

    }
})