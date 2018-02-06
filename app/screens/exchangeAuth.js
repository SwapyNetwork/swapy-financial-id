import React from 'react';
import { View, Dimensions } from 'react-native';

import { BarCodeScanner } from 'expo';

handleQRCode = (result) => {
  alert(JSON.stringify(result.data));
};

const ExchangeAuth = () => {
  return (
     <View>
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
