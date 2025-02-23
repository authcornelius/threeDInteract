import React, { useState } from 'react';
import { View } from 'react-native';
import Scene from './components/Scene';
import Controls from './components/Controls';
import { moveAvatar } from './components/avatarAnimations';
import { styles } from './styles';

export default function App() {
  const [avatars, setAvatars] = useState({ avatar1: null, avatar2: null });


  const handleMove = (direction, avatarNumber) => {
    const avatar = avatarNumber === 1 ? avatars.avatar1 : avatars.avatar2;
    if (avatar) {
      moveAvatar(avatar, direction);
    }
  };

  return (
    <View style={styles.container}>
      <Scene onAvatarsLoaded={setAvatars} />
      <Controls onMove={handleMove} />
    </View>
  );
}
