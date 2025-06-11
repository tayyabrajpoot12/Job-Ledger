import React, {useState} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import ImageFast from '../../../../components/ImageFast';
import {COLORS} from '../../../../utils/COLORS';
import {styles} from '../styles';

const Slider = ({images, isImg}) => {
  const {width} = Dimensions.get('screen');

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View>
      <Animated.FlatList
        data={images}
        showsHorizontalScrollIndicator={false}
        horizontal
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={info => {
          console.error('Failed to scroll to index:', info.index);
        }}
        onMomentumScrollEnd={e => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex((x / width)?.toFixed(0));
        }}
        initialScrollIndex={currentIndex}
        pagingEnabled
        renderItem={({item}) => (
          <Animated.View style={styles.sliderItem}>
            <ImageFast
              source={isImg ? {uri: item} : item}
              style={styles.image}
            />
          </Animated.View>
        )}
      />
      <Animated.View style={styles.dotContainer}>
        {images?.map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                height: i == currentIndex ? 10 : 8,
                width: i == currentIndex ? 20 : 8,
                backgroundColor:
                  i == currentIndex ? COLORS.primaryColor : COLORS.gray1,
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default Slider;
