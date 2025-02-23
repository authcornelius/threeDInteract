import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  fullscreen: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute', // Ensure it covers the entire screen
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    padding: 20,
  },
  avatarControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
  },
});
