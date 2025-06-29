import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {get} from '../../../Services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';
import TaskCard from '../../../components/TaskCard';
import CustomText from '../../../components/CustomText';
import fonts from '../../../assets/fonts';

const EmployeeTasks = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const {token} = useSelector(state => state.authConfigs);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProjects();
  };

  const fetchProjects = useCallback(async () => {
    try {
      const url = `getMyProjects/${token}?status=active`;

      const res = await get(url);

      if (res.data?.result) {
        setData(res.data?.data);
      }
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log(error.response.data, 'in task data');
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
    }, [fetchProjects]),
  );

  const renderTask = ({item}) => (
    <TaskCard
      item={item}
      onPress={() => navigation.navigate('TaskDetails', {task: item})}
    />
  );

  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={'My Projects'} />}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.red]}
          />
        }
        ListEmptyComponent={
          <CustomText
            fontSize={18}
            marginTop={'50%'}
            alignSelf={'center'}
            fontFamily={fonts.medium}
            label={'No Active Project Found'}
          />
        }
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

export default EmployeeTasks;
