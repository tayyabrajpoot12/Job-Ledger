import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import fonts from '../../../../assets/fonts';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import {COLORS} from '../../../../utils/COLORS';
import {styles} from '../styles';

const TaskDetailer = ({task}) => {
  const color =
    task?.status === 'active'
      ? COLORS.green
      : task?.status === 'on-hold'
      ? COLORS.yellow
      : task?.status === 'completed'
      ? COLORS.primaryColor
      : COLORS.purple;

  const bg =
    task?.status === 'active'
      ? COLORS.lightGreen
      : task?.status === 'on-hold'
      ? COLORS.lightYellow
      : task?.status === 'completed'
      ? COLORS.lightBlue
      : COLORS.lightPurple;

  return (
    <View>
      <View style={styles.row1}>
        <CustomText
          label={task?.name}
          fontFamily={fonts.semiBold}
          fontSize={16}
          marginTop={10}
        />
        <View style={[styles.status, {backgroundColor: bg}]}>
          <CustomText
            color={color}
            fontSize={12}
            alignSelf={'center'}
            fontFamily={fonts.medium}
            textTransform={'capitalize'}
            label={' ' + task?.status + ' '}
          />
        </View>
      </View>
      <CustomText
        label="Description"
        fontFamily={fonts.medium}
        marginTop={5}
        color={COLORS.primaryColor}
      />
      <CustomText
        label={task?.description}
        color={COLORS.inputLabel}
        fontSize={12}
      />
      {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{width: '33%'}}>
          <CustomText
            label="Total Budget"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <View style={styles.row}>
            <Icons name={'dollar-sign'} family={'Feather'} top={-1} size={16} />
            <CustomText
              label={task?.budget}
              fontFamily={fonts.semiBold}
              fontSize={16}
            />
          </View>
        </View>
        <View style={{width: '33%'}}>
          <CustomText
            label="My Earning"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <View style={styles.row}>
            <Icons name={'dollar-sign'} family={'Feather'} top={-1} size={16} />
            <CustomText
              label={task?.laborBudget}
              fontFamily={fonts.semiBold}
              fontSize={16}
            />
          </View>
        </View>
        <View style={{width: '33%'}}>
          <CustomText
            label="Material Cost"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <View style={styles.row}>
            <Icons name={'dollar-sign'} family={'Feather'} top={-1} size={16} />
            <CustomText
              label={task?.materialCosts}
              fontFamily={fonts.semiBold}
              fontSize={16}
            />
          </View>
        </View>
      </View> */}
      <CustomText
        marginTop={10}
        label="Project Location"
        fontFamily={fonts.medium}
        color={COLORS.primaryColor}
      />
      <View style={styles.row}>
        <Icons name={'location'} />
        <CustomText
          fontSize={13}
          marginLeft={5}
          color={COLORS.gray1}
          label={task?.location?.address}
        />
      </View>
      {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{width: '50%'}}>
          <CustomText
            label="Start Date"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <CustomText
            fontSize={13}
            color={COLORS.black}
            fontFamily={fonts.medium}
            label={`${moment(task?.startDate).format('ddd DD MMM YYYY')}`}
          />
        </View>

        <View style={{width: '50%'}}>
          <CustomText
            label="End Date"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
          <CustomText
            fontSize={13}
            color={COLORS.black}
            fontFamily={fonts.medium}
            label={`${moment(task?.endDate).format('ddd DD MMM YYYY')}`}
          />
        </View>
      </View> */}
    </View>
  );
};

export default TaskDetailer;
