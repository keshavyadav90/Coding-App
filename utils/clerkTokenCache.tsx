import * as SecureStore from "expo-secure-store"
import { TokenCache } from "@clerk/clerk-expo"


export const TokenCaches : TokenCache = {

    async getToken(key :string) {
        return SecureStore.getItemAsync(key)
    },

    async saveToken(key: string,value: string) {
        return SecureStore.setItemAsync(key, value);
    },




    // async removeToken(key: string):Promise<void> {
    //     return SecureStore.deleteItemAsync(key)
    // },


}