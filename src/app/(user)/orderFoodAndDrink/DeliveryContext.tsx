import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { CartItem, Product } from "@/types";
import {randomUUID} from 'expo-crypto' 
import React from 'react';
 
type deliveryContextType = {
    isUpdatedInfoDelivery: boolean,
    setIsUpdatedInfoDelivery: any
}

const deliveryContext = createContext<deliveryContextType>({
    isUpdatedInfoDelivery: false,
    setIsUpdatedInfoDelivery: true,
})

const SearchPostProvider = ({children}: PropsWithChildren<{}>) => {
    const [isUpdatedInfoDelivery, setIsUpdatedInfoDelivery] = useState<boolean>(false)

    return (
        <deliveryContext.Provider value={{
            isUpdatedInfoDelivery, setIsUpdatedInfoDelivery
        }}>
            {children}
        </deliveryContext.Provider>
    )
}

export default SearchPostProvider;
export const useSearchPostContext = () => useContext(deliveryContext);