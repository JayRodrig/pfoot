import React, { useState } from 'react';

import { CheckBox } from 'react-native-elements';

const TeamCell = ({ icon, title }) => {
  const [checked, setChecked] = useState(false);

  const handleOnPress = () => setChecked(!checked);

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
