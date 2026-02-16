import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image as RNImage,
  View,
  type ImageResizeMode,
} from "react-native";
import { twMerge } from "tailwind-merge";

type LoadingImageProps = {
  imageUrl?: string | null;
  containerClassName?: string;
  placeholderClassName?: string;
  imageClassName?: string;
  resizeMode?: ImageResizeMode;
};

export function Image({
  imageUrl,
  containerClassName,
  placeholderClassName,
  imageClassName,
  resizeMode = "cover",
}: LoadingImageProps) {
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
    <View className={twMerge("relative", containerClassName)}>
      {(!imageUrl || !isLoaded || hasError) && (
        <Animated.View
          className={twMerge(
            "absolute top-0 right-0 bottom-0 left-0 bg-[#C4C4C4]",
            placeholderClassName,
          )}
          style={{ opacity: shouldBlink ? pulseOpacity : 1 }}
        />
      )}

      {!!imageUrl && !hasError && (
        <RNImage
          className={twMerge(
            "absolute top-0 right-0 bottom-0 left-0",
            imageClassName,
          )}
          src={imageUrl}
          resizeMode={resizeMode}
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
