import React from 'react';

const ReactNativeElementsStyles = () => {
  return(
    <style type="text/css">
      {`
        @font-face {
          font-family: 'MaterialIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
        }

        @font-face {
          font-family: 'FontAwesome';
          src: url(${require('react-native-vector-icons/Fonts/FontAwesome.ttf')}) format('truetype');
        }
      `}
    </style>
  )
};

export default ReactNativeElementsStyles;
