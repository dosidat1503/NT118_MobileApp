import Loading from "@/components/Loading";
import { useCartContext } from "@/providers.tsx/CartProvider";
import React, { useEffect, useState } from "react";
import { View, Text, Linking } from "react-native";
import { WebView } from 'react-native-webview'; 
import { getCustomTabsSupportingBrowsersAsync } from "expo-web-browser"; 
import * as WebBrowser from 'expo-web-browser';

export default function OnlinePayment() {
    const { heightScreen, widthScreen, mainColor, baseURL, userID, vnpURL } = useCartContext();
    const [paymentURL, setPaymentURL] = useState("");

    useEffect(() => { 

        // Linking.openURL(vnpURL)
        // .catch(err => {
        //     console.error("An error occurred", err); 
        // })
        
        const openInBrowser = async () => {
            await WebBrowser.openBrowserAsync('https://example.com');
        };

        openInBrowser();

    }, [])

    const onNavigationStateChange = (navState: any) => {

    } 
    


    return (
        vnpURL === "" 
        ? <Loading></Loading>
        : ""
        // <WebView
        //     source = {{ uri: vnpURL}}
        //     // onNavigationStateChange={}
        //     startInLoadingState={true}
        //     renderLoading={() => {
        //         return <Loading></Loading>
        //     }}
        //     // onReceivedSslError={(event: { preventDefault: () => void; proceed: () => void; }) => {
        //     //     event.preventDefault();
        //     //     event.proceed();
        //     // }}
        //     // onReceivedHttpError={(syntheticEvent: { nativeEvent: any; }) => {
        //     //     const { nativeEvent } = syntheticEvent;
        //     //     console.warn(
        //     //       'WebView received error status code: ',
        //     //       nativeEvent.statusCode
        //     //     );
        //     // }}
        // ></WebView>
    )
}