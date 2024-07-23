import React from 'react';
import { Image, StyleSheet, View, ImageProps } from 'react-native';

// Définir les props pour le composant CircularImage
type CircularImageProps = ImageProps & {
    size: number;
};


const CircularImage: React.FC<CircularImageProps> = ({ size, ...props }) => {
    const style = `w-[${size}] h-[${size}] items-center justify-center`;
    return (
        <View className={style}>
            <Image {...props} />
        </View>
    );
};

export default CircularImage;