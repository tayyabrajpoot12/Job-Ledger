import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import fonts from '../../../assets/fonts';
import CustomText from '../../../components/CustomText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {get} from '../../../Services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';
import HomeHeader from './molecules/Header';
import HomeTaskCard from './molecules/HomeTaskCard';

const chartConfig = {
  backgroundColor: COLORS.primaryColor,
  backgroundGradientFrom: COLORS.placeHolder,
  backgroundGradientTo: COLORS.primaryColor,
  color: (opacity = 1) => `#fff`,
  useShadowColorFromDataset: true,
  fillShadowGradientFromOpacity: 0,
  fillShadowGradientToOpacity: 1,
  propsForVerticalLabels: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  propsForHorizontalLabels: {
    fontSize: 10,
    fontWeight: 'bold',
  },
};

const screenWidth = Dimensions.get('window').width;

const earningData = [
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100,
];

const homeTaskData = [
  {
    _id: 1,
    name: 'Client Onboarding',
    status: 'Active',
    budget: 450,
    address: '123 Business Rd, Toronto, ON',
  },
  {
    _id: 2,
    name: 'Marketing Campaign Setup',
    status: 'On Hold',
    budget: 800,
    address: '456 Media St, Montreal, QC',
  },
  {
    _id: 3,
    name: 'Product Demo Preparation',
    status: 'Planing',
    budget: 300,
    address: '789 Tech Ave, Vancouver, BC',
  },
  {
    _id: 4,
    name: 'Quarterly Report Draft',
    status: 'Active',
    budget: 200,
    address: '321 Finance Blvd, Calgary, AB',
  },
  {
    _id: 5,
    name: 'Team Training Session',
    status: 'On Hold',
    budget: 600,
    address: '654 HR Ln, Edmonton, AB',
  },
  {
    _id: 6,
    name: 'System Upgrade Testing',
    status: 'Planing',
    budget: 1000,
    address: '987 IT Park, Ottawa, ON',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const data = [
    {
      name: 'Total Projects',
      value: stats?.total,
    },
    {
      name: 'Active Projects',
      value: stats?.active,
    },
    {
      name: 'Pending Projects',
      value: stats?.pending,
    },
    {
      name: 'Completed Projects',
      value: stats?.completed,
    },
  ];

  const {token} = useSelector(state => state.authConfigs);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const url = `getMyDashboard/${token}`;

        const res = await get(url);
        if (res.data?.result) {
          setStats(res.data?.data?.projectStats);
        }
        setLoading(false);
      } catch (error) {
        console.log(error, 'in dashboard data');
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <HomeHeader />}
      paddingHorizontal={0.1}>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item}) => (
            <View style={styles.box}>
              <CustomText
                fontSize={13}
                label={item.name}
                color={COLORS.gray1}
                fontFamily={fonts.medium}
              />
              <CustomText
                fontSize={15}
                label={loading ? '...' : item.value}
                fontFamily={fonts.semiBold}
                color={COLORS.primaryColor}
              />
            </View>
          )}
        />
        <CustomText
          marginTop={5}
          marginBottom={5}
          label={'My Earnings'}
          fontFamily={fonts.medium}
        />
      </View>
      <LineChart
        data={{
          datasets: [{data: earningData}],
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        }}
        bezier
        height={230}
        yAxisLabel="$"
        yAxisSuffix="k"
        withInnerLines={false}
        width={screenWidth - 40}
        chartConfig={chartConfig}
        style={{alignSelf: 'center', borderRadius: 10}}
      />
      <View style={styles.row}>
        <CustomText label={'Recent Projects'} fontFamily={fonts.medium} />
        <CustomText
          label={'See All'}
          fontFamily={fonts.medium}
          onPress={() => navigation.navigate('EmployeeTasks')}
        />
      </View>
      <FlatList
        horizontal
        data={homeTaskData}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => <HomeTaskCard item={item} />}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    width: '48%',
    marginBottom: 10,
    borderRadius: 7,
    padding: 10,
    borderColor: COLORS.lightGray,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
});
