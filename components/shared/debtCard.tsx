import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native"
import TextS from "./TextS";
import Svg, { Path } from "react-native-svg";



const DebtCard = ({ debt }: any) => {

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-GB').format(amount);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <AntDesign name="exclamationcircleo" size={24} color="#FF896D" />
                <TextS style={{ fontWeight: 'bold', fontSize: 16, color: '#FF896D', marginLeft: 8, }}>Qarzdorlik mavjud</TextS>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 13 }}>
                <TextS style={{ fontSize: 25, fontWeight: 'bold', color: '#002930' }}>{formatMoney(debt)} uzs</TextS>
                <TextS style={{ fontSize: 16, color: '#002930', fontWeight: '500', marginLeft: 10 }}>qarzdorlik mavjud</TextS>
            </View>

            <View style={{ width: '90%', borderWidth: 1.7, borderColor: '#848A9C', borderStyle: 'dashed', }} />

            <TextS style={{ textAlign: 'center', color: '#848A9C', fontSize: 12, fontWeight: '400', marginTop: 8, width: '70%' }}>Qarzdorlik to‘liq yopilmaguncha ilovadan foydalanish imkoniyati cheklangan</TextS>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 160,
        borderRadius: 14,
        backgroundColor: '#fff',
        padding: 12,
        alignItems: 'center'
    },
    titleBox: {
        backgroundColor: '#FFF4F4',
        borderWidth: 2,
        borderColor: '#FF896D',
        width: '100%',
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default DebtCard;