import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import fonts from '../../../../assets/fonts';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import {COLORS} from '../../../../utils/COLORS';
import {handleMap} from '../../../../utils/constants';
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
        marginTop={5}
        fontFamily={fonts.medium}
        color={COLORS.primaryColor}
      />
      <CustomText
        label={task?.description}
        color={COLORS.inputLabel}
        fontSize={12}
      />

      <CustomText
        marginTop={10}
        label="Project Location"
        fontFamily={fonts.medium}
        color={COLORS.primaryColor}
      />
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.5}
        onPress={() =>
          handleMap(
            task?.location?.lat,
            task?.location?.lng,
            task?.location?.address,
          )
        }>
        <Icons name={'location'} />
        <CustomText
          fontSize={13}
          marginLeft={5}
          color={COLORS.gray1}
          label={task?.location?.address}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetailer;
