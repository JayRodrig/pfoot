import React, { useState, useEffect } from 'react';

import { CheckBox } from 'react-native-elements';

const TeamCell = ({ disabled, icon, setPrediction, title, visible }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
  }, [visible])

  const handleOnPress = () => {
    if (disabled && !checked) return;
    setChecked(!checked);
    checked ? setPrediction() : setPrediction({ title })
  };

  return(
    <CheckBox
      checked={checked}
      title={title}
      onPress={handleOnPress}
      left
    />
  )
};

export default TeamCell;
