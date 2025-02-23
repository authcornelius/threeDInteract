import React, { useState, useEffect } from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Dimensions } from 'react-native';
import { styles } from '../styles';

const { width, height } = Dimensions.get('window');

export default function Scene({ onAvatarsLoaded }) {
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(new THREE.PerspectiveCamera(75, width / height, 0.1, 1000));

  useEffect(() => {
    setupScene();
    loadAvatars();

    const handleResize = () => {
      const { width, height } = Dimensions.get('window');
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    Dimensions.addEventListener('change', handleResize);
    return () => Dimensions.removeEventListener('change', handleResize);
  }, []);

  const setupScene = () => {
    scene.background = new THREE.Color(0x2c3e50);
    camera.position.set(0, 30, 80); // Adjusted position
    camera.lookAt(0, 30, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);

    scene.add(ambientLight, directionalLight);
  };

  const downloadGLB = async (assetModule) => {
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();

    const fileUri = `${FileSystem.cacheDirectory}${asset.name}`;
    await FileSystem.copyAsync({
      from: asset.localUri,
      to: fileUri,
    });

    return fileUri;
  };

  const loadAvatars = async () => {
    try {
      const avatar1Url = await downloadGLB(require('../assets/models/WalkingGirl.glb'));
      const avatar2Url = await downloadGLB(require('../assets/models/Male.glb'));

      const loader = new GLTFLoader();

      const [avatar1, avatar2] = await Promise.all([
        new Promise((resolve, reject) => loader.load(avatar1Url, resolve, null, reject)),
        new Promise((resolve, reject) => loader.load(avatar2Url, resolve, null, reject)),
      ]);

      avatar1.scene.rotation.y = Math.PI / 7;
      avatar1.scene.scale.set(25, 45, 45);
      avatar1.scene.position.set(-15, -7, 0);

      avatar2.scene.rotation.y = Math.PI / -7;
      avatar2.scene.scale.set(25, 45, 45);
      avatar2.scene.position.set(12, -15, 0);

      scene.add(avatar1.scene);
      scene.add(avatar2.scene);

      if (onAvatarsLoaded) {
        onAvatarsLoaded({ avatar1: avatar1.scene, avatar2: avatar2.scene });
      }
    } catch (error) {
      console.error('Error loading avatars:', error);
    }
  };

  const onContextCreate = async (gl) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  return <GLView style={styles.fullscreen} onContextCreate={onContextCreate} />;
}
