import { StyleSheet, Text, View } from "react-native"
import TextS from "./TextS";

const TopCards = ({ att, coin }: any) => {
    return (
        <View style={styles.container}>
            <View style={[styles.card]}>
                <TextS style={{ fontSize: 40, color: '#6FDD00', fontWeight: 'bold' }}>{att}%</TextS>
                <TextS style={{ fontSize: 18, fontWeight: '600' }}>Davomad</TextS>
                <TextS style={{ fontSize: 12, color: '#848A9C', fontWeight: '400' }}>O‘rtacha nisbat</TextS>
            </View>
            <View style={[styles.card]}>
                <TextS style={{ fontSize: 40, color: '#F98900', fontWeight: 'bold' }}>{coin}</TextS>
                <TextS style={{ fontSize: 18, fontWeight: '600' }}>Coin</TextS>
                <TextS style={{ fontSize: 12, color: '#848A9C', fontWeight: '400' }}>To‘plangan bal</TextS>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingHorizontal: 10,

    }
})
export default TopCards;