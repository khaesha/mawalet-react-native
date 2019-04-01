import { Platform } from "react-native";

export default {
    containerStyle: {
        backgroundColor: '#3d6dcc',
        marginTop: Platform.OS === "ios" ? 0 : -30
    }
}
