import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { CartItem, Product } from "@/types";
import {randomUUID} from 'expo-crypto' 
import React from 'react';

export type selectedType = { 
    topicItem: number[],
    sortByItem?: number,
    startDate?: string,
    endDate?: string, 
}

type searchPostContextType = {
    selectedItem: selectedType,
    setSelectedItem: any
}

const searchPostContext = createContext<searchPostContextType>({
    selectedItem: {
        topicItem: [],
        sortByItem: 0,
        startDate: "",
        endDate: "", 
    },
    setSelectedItem: () => {}
})

const SearchPostProvider = ({children}: PropsWithChildren<{}>) => {
    const [selectedItem, setSelectedItem] = useState<selectedType>({
        topicItem: [],
        sortByItem: 0,
        startDate: "",
        endDate: "", 
    })

    return (
        <searchPostContext.Provider value={{
            selectedItem, setSelectedItem
        }}>
            {children}
        </searchPostContext.Provider>
    )
}

export default SearchPostProvider;
export const useSearchPostContext = () => useContext(searchPostContext);