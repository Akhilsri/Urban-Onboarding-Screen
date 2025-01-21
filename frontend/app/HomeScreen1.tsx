import React, { useState, useRef } from 'react';
import { SafeAreaView,View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';

const HomeScreen1 = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  const images = [
    require('../assets/images/image1.png'),
    require('../assets/images/image3.png'),
    require('../assets/images/image2.png'),
  ];

  const titles = [
    { title1: 'We Provide Professional', title2: 'Home Services at a very', title3: 'friendly price' },
    { title1: 'Easy Service Booking &', title2: 'Scheduling' },
    { title1: 'Get Beauty parlor at your', title2: 'home & other Personal', title3: 'Grooming needs' },
  ];

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      navigation.navigate('LoginScreen');
    } else {
      Animated.timing(translateX, {
        toValue: -(currentIndex + 1) * screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.carousel,
          { transform: [{ translateX }] },
        ]}
      >
        {images.map((img, index) => (
          <View style={styles.slide} key={index}>
            <View style={styles.imageContainer}>
              <Image source={img} style={styles.image} />
            </View>
            <Text style={styles.title}>{titles[index].title1}</Text>
            <Text style={styles.title}>{titles[index].title2}</Text>
            <Text style={styles.title}>{titles[index].title3}</Text>
          </View>
        ))}
      </Animated.View>

      {/* Dots for pagination */}
      <View style={styles.pagination}>
        {images.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                isActive && styles.activeDot,
              ]}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  skipButton: {
    backgroundColor: '#E6EAFF',
    borderRadius: 10,
    padding: 12,
  },
  skipButtonText: {
    color: '#283891',
    fontWeight: 'bold',
  },
  carousel: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 1,
  },
  slide: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  imageContainer: {
    width: 310,
    height: 310,
    borderRadius: 150,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 60,
    borderWidth: 20,
    borderColor: '#F2F4FF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    marginTop : 15,
    marginBottom : 15
  },
  activeDot: {
    backgroundColor: '#283891',
  },
  button: {
    backgroundColor: '#232891',
    padding: 15,
    marginTop : 10,
    borderRadius: 20,
    width: 55,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen1;
