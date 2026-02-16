import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, View } from "react-native";

type TeamBadgeProps = {
  imageUrl?: string | null;
};

export function TeamBadge({ imageUrl }: TeamBadgeProps) {
  const [isLoaded, setIsLoaded] = useState(!imageUrl);
  const [hasError, setHasError] = useState(false);
  const pulseOpacity = useRef(new Animated.Value(1)).current;

  const shouldBlink = !!imageUrl && !isLoaded && !hasError;

  useEffect(() => {
    setIsLoaded(!imageUrl);
    setHasError(false);
  }, [imageUrl]);

  useEffect(() => {
    if (!shouldBlink) {
      pulseOpacity.setValue(1);
      return;
    }

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseOpacity, {
          toValue: 0.35,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [pulseOpacity, shouldBlink]);

  return (
    <View className="relative size-[60px] items-center justify-center">
      {(!imageUrl || !isLoaded || hasError) && (
        <Animated.View
          className="size-[60px] rounded-full bg-[#C4C4C4]"
          style={{ opacity: shouldBlink ? pulseOpacity : 1 }}
        />
      )}

      {!!imageUrl && !hasError && (
        <Image
          className="absolute size-[60px]"
          src={imageUrl}
          resizeMode="contain"
          onLoadEnd={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(false);
          }}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </View>
  );
}
