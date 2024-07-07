import VoucherScreen from "@/app/(user)/orderFoodAndDrink/VoucherScreen";
import VoucherCard from "@/components/VoucherCard";
import { useCartContext } from "@/providers.tsx/CartProvider";
import globalApi from "@/services/globalApi";
import { StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

interface Voucher {
  VOUCHER_ID: number;
  DISCOUNT_VALUE: number;
  MAX_QUANTITY: number;
  MAX_DISCOUNT_VALUE: number | null;
  VOUCHER_CODE: string;
  SHOP_ID: number;
  MIN_ORDER_TOTAL: number;
  START_DATE: string;
  EXPIRATION_DATE: string;
  REMAIN_AMOUNT: number;
  IS_DELETED: number;
}

interface VoucherData {
  currentActiveVouchers: Voucher[];
  notYetActiveVouchers: Voucher[];
  usedUpVouchers: Voucher[];
}

export default function ListVouchers({ navigation }) {
  const [vouchers, setVouchers] = useState<VoucherData | null>(null);
  const [isAllLoad, setIsAllLoad] = useState<boolean>(false);

  const { heightScreen, widthScreen, mainColor, orderStatusList, baseURL, userID, setOrderID, RD } = useCartContext();

  const fetchVouchers = async (shopId: any) => {
    try {
      const response = await globalApi.getAllVouchers(shopId);
      if (response.data !== null && response.statusCode === 200) {
        const data: VoucherData = {
          currentActiveVouchers: response.data.currentActiveVouchers,
          notYetActiveVouchers: response.data.notYetActiveVouchers,
          usedUpVouchers: response.data.usedUpVouchers
        };
        setVouchers(data);
        setIsAllLoad(true);
      } else {
        setIsAllLoad(false);
      }
    } catch (e) {
      console.error("Lỗi lấy thông tin món ăn cửa hàng", e);
      setIsAllLoad(false);
    }
  }

  const resetData = () => {
    setVouchers(null);
    setIsAllLoad(false);
    fetchVouchers(1);
  }

  useEffect(() => {
    fetchVouchers(1);
  }, []);

  const handleEdit = async (item: any) => {
    console.log(item);
    resetData();
    navigation.navigate('editVoucher', { id: item.VOUCHER_ID, resetData: resetData });
  };

  const handleDelete = async (item: any) => {
    Alert.alert('Xác nhận', 'Bạn muốn xoá khuyến mãi này? ', [
      {
        text: 'Không',
      },
      {
        text: 'Có',
        onPress: async () => {
          try {
            const response = await globalApi.deleteVoucher(item.VOUCHER_ID);
            if (response.data !== null && response.statusCode === 200) {
              console.log('Xóa thành công khuyến mãi');
              fetchVouchers(1);
            } else {
              console.log('Xóa thất bại');
            }
          } catch (e) {
            console.log('Lỗi khi xoá khuyến mãi');
          }
        }
      },
    ]);
  };
  return (
    <View>
      <ScrollView>
        {
          isAllLoad && vouchers?.currentActiveVouchers.map((voucher: Voucher) => {
            return <VoucherCard key={voucher.VOUCHER_ID} url={"discount"} item={voucher} onEdit={() => { handleEdit(voucher) }} onDelete={() => { handleDelete(voucher) }} />;
          })
        }
        {
          isAllLoad && vouchers?.notYetActiveVouchers.map((voucher: Voucher) => {
            return <VoucherCard key={voucher.VOUCHER_ID} url={"discount"} item={voucher} onEdit={() => { handleEdit(voucher) }} onDelete={() => { handleDelete(voucher) }} />;
          })
        }
        {
          isAllLoad && vouchers?.usedUpVouchers.map((voucher: Voucher) => {
            return <VoucherCard key={voucher.VOUCHER_ID} url={"discount"} item={voucher} onEdit={() => { handleEdit(voucher) }} onDelete={() => { handleDelete(voucher) }} />;
          })
        }

      </ScrollView>
    </View>
  );
}