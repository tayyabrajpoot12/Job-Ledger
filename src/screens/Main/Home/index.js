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
  color: (opacity = 1) => '#fff',
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

const Home = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [homeTaskData, setHomeTaskData] = useState([]);

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
    if (!token) {
      return;
    }

    const requestAndFetchData = async () => {
      setLoading(true);
      try {
        const dashboardUrl = `getMyDashboard/${token}`;
        const taskUrl = `getMyProjects/${token}`;

        const [res, taskResponse] = await Promise.all([
          get(dashboardUrl),
          get(taskUrl),
        ]);

        if (res.data?.result) {
          setStats(res.data?.data?.projectStats);
        }
        if (taskResponse.data?.result) {
          setHomeTaskData(taskResponse.data?.data);
        }
      } catch (error) {
        console.log(error, 'Error in dashboard or location permission');
      } finally {
        setLoading(false);
      }
    };

    requestAndFetchData();
  }, [token]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <HomeHeader />}
      paddingHorizontal={0.1}
      scrollEnabled>
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
        showsHorizontalScrollIndicator={false}
        data={loading ? [1, 2, 3] : homeTaskData}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => (
          <HomeTaskCard
            item={item}
            loading={loading}
            onPress={() => navigation.navigate('TaskDetails', {task: item})}
          />
        )}
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
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
});
