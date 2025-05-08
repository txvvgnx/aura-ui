import { LoaderCircle } from 'lucide-react-native';
import { FC, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type Props = {
  size?: number;
  color?: string;
};

const CircleLoader: FC<Props> = ({ size = 48, color = '#000' }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{ transform: [{ rotate }], justifyContent: 'center', alignItems: 'center' }}>
      <LoaderCircle size={size} color={color} strokeWidth={1} />
    </Animated.View>
  );
};

export default CircleLoader;
