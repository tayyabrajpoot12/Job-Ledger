import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../../components/Header';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {get} from '../../../Services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';
import TaskCard from './molecules/TaskCard';

const EmployeeTasks = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {token} = useSelector(state => state.authConfigs);

  const handleRefresh = () => {
    setLoading(true);
    fetchProjects();
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const url = `getMyProjects/${token}`;

      const res = await get(url);
      if (res.data?.result) {
        setData(res.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, 'in dashboard data');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={[COLORS.primaryColor]}
          />
        }
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

export default EmployeeTasks;
