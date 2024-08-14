import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import style from './style';
const DataScreen = () => {
  const { product } = useLocalSearchParams<{ product: string }>();
  const [nutritionData, setNutritionData] = useState<Array<{ name: string; weight: string }>>([]);
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedProduct = JSON.parse(product);
      if (parsedProduct && typeof parsedProduct === 'object' && parsedProduct.nutriments) {
        const energyData = Object.entries(parsedProduct.nutriments)
          .filter(([key, value]) => key.toLowerCase().includes('energy') && value !== '')
          .map(([key, value]) => ({
            name: key.replace(/_/g, ' ').replace(/100g/g, '(per 100g)'),
            weight: `${value} ${parsedProduct.nutriments[`${key}_unit`] || 'g'}`,
          }));

        const otherData = Object.entries(parsedProduct.nutriments)
          .filter(([key, value]) => !key.toLowerCase().includes('energy') && !key.includes('_unit') && !key.includes('_value') && value !== '')
          .map(([key, value]) => ({
            name: key.replace(/_/g, ' ').replace(/100g/g, '(per 100g)'),
            weight: `${value} ${parsedProduct.nutriments[`${key}_unit`] || 'g'}`,
          }));

        const nutrimentsList = [...energyData, ...otherData];

        setNutritionData(nutrimentsList);
        setProductName(parsedProduct.product_name || 'Unknown Product');
        setProductImage(parsedProduct.image_url || null);
      } else {
        setProductName('Unknown Product');
      }
    } catch (error) {
      console.error('Error parsing product data:', error);
      setProductName('Error: Unable to parse product data');
    }
  }, [product]);

  const renderItem = useCallback(({ item }: { item: { name: string; weight: string } }) => (
    <View style={style.Card}>
      <View style={style.ImageView}>
        {/* <Image source={require('../Images/Completeiamge.png')} style={style.imagestyle} /> */}
        <Text style={style.nametext}>
          {item.name}

        </Text>
      </View>
      <View style={style.WeightView}>
        <Text style={style.nametext}>
          {item.weight}

        </Text>
      </View>
    </View>
  ), []);

  const memoizedData = useMemo(() => nutritionData, [nutritionData]);

  return (
    <View style={style.container}>
      <View style={style.backimageView}>
        <View style={style.TopView}></View>
        {productImage && (
          <Image source={{ uri: productImage }} style={style.Headeriamge} />
        )}
      </View>
      <View style={style.bottomCointainer}>
        <Text style={style.Minitext}>
          {productName}

        </Text>
        <View style={style.GrayView}>
          <Text style={style.NutrationText}>
            NUTRITION FACTS
            </Text>
        </View>
        <View style={style.FlatView}>
          {memoizedData.length > 0 ? (
            <FlatList
              data={memoizedData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>
              No nutrition data available

            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default DataScreen;
