import React from 'react';
import { View, Dimensions, StatusBar } from 'react-native';


const handleQRCode = (result) => {
  alert(JSON.stringify(result.data));
};

const ExchangeAuth = () => (
  <View>
    <StatusBar hidden />
{/* <BarCodeScanner
      onBarCodeRead={handleQRCode}
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
    />*/}
  </View>
);

export default ExchangeAuth;
