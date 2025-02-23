import * as THREE from 'three';

export const moveAvatar = (avatar, direction) => {
  switch (direction) {
    case 'left':
      avatar.position.x -= 0.5;
      break;
    case 'right':
      avatar.position.x += 0.5;
      break;
    case 'jump':
      const jumpUp = new THREE.TWEEN.Tween(avatar.position)
        .to({ y: avatar.position.y + 1 }, 300)
        .easing(THREE.TWEEN.Easing.Quadratic.Out);
      const jumpDown = new THREE.TWEEN.Tween(avatar.position)
        .to({ y: 0 }, 300)
        .easing(THREE.TWEEN.Easing.Quadratic.In);
      jumpUp.chain(jumpDown);
      jumpUp.start();
      break;
  }
};
