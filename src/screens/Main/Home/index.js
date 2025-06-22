import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import fonts from '../../../assets/fonts';
import CustomText from '../../../components/CustomText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {get} from '../../../Services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';

import TaskCard from '../../../components/TaskCard';
import {ToastMessage} from '../../../utils/ToastMessage';
import HomeHeader from './molecules/Header';

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const dashboardUrl = `getMyDashboard/${token}`;

      const res = await get(dashboardUrl);

      if (res.data?.result) {
        setStats(res.data?.data?.projectStats);
        setHomeTaskData(res.data?.data?.recentProjects);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastMessage(error?.response?.data?.message);
      console.log(error, 'Error in dashboard');
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

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
      </View>

      <View style={styles.row}>
        <CustomText label={'Recent Projects'} fontFamily={fonts.medium} />
        <CustomText
          label={'See All'}
          fontFamily={fonts.medium}
          onPress={() => navigation.navigate('EmployeeTasks')}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={loading ? [1, 2, 3, 4, 5, 6] : homeTaskData}
        ListEmptyComponent={
          <CustomText
            fontSize={17}
            marginTop={'30%'}
            alignSelf={'center'}
            fontFamily={fonts.semiBold}
            label={'No Recent Projects Found'}
          />
        }
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => (
          <TaskCard
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
