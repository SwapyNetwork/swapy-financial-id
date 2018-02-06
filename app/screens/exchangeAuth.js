import React from 'react';
import { View, Dimensions, StatusBar } from 'react-native';

import { BarCodeScanner } from 'expo';

handleQRCode = (result) => {
  alert(JSON.stringify(result.data));
};

const ExchangeAuth = () => {
  return (
     <View>
      <StatusBar hidden={true}></StatusBar>
      <BarCodeScanner 
        onBarCodeRead={this.handleQRCode}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}/>
    </View>
  )
};

export default ExchangeAuth;
