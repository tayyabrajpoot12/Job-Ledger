import React from 'react';
import {View} from 'react-native';
import fonts from '../../../../assets/fonts';
import CustomText from '../../../../components/CustomText';
import {COLORS} from '../../../../utils/COLORS';
import {styles} from '../styles';
import CustomButton from '../../../../components/CustomButton';

const formatTimer = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getTotalHoursAndSalary = (records, hourlyRate) => {
  if (records.length === 0) {
    return {totalHours: 0, totalSalary: 0};
  }

  const firstRecord = records[0];
  if (firstRecord.timeOut === '--') {
    return {
      totalHours: '...',
      totalSalary: '...',
    };
  }

  const greenRecords = records.filter(item => item.punchStatus === 'green');

  const totalHours = greenRecords.reduce(
    (sum, curr) => sum + curr.totalHours,
    0,
  );
  const totalSalary = totalHours * hourlyRate;

  return {
    totalHours: totalHours.toFixed(2),
    totalSalary: `$${totalSalary.toFixed(2)}`,
  };
};

const TaskSummary = ({
  isRunning,
  timer,
  timeSummary,
  active,
  loading,
  handlePunchInOut,
  salary,
}) => {
  const {totalHours, totalSalary} = getTotalHoursAndSalary(timeSummary, 50);

  return (
    <View>
      {(isRunning || timer > 0) && (
        <View style={styles.timerContainer}>
          <CustomText
            label="Current Session"
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
            alignSelf={'center'}
          />
          <CustomText
            marginTop={5}
            fontSize={17}
            alignSelf={'center'}
            color={COLORS.green}
            label={formatTimer(timer)}
            fontFamily={fonts.semiBold}
          />
        </View>
      )}

      {active === 1 ? (
        <CustomButton
          height={45}
          marginTop={20}
          borderRadius={30}
          title={'Punch In'}
          loading={loading}
          onPress={() => handlePunchInOut('punch_in')}
        />
      ) : (
        <CustomButton
          height={45}
          marginTop={20}
          borderRadius={30}
          title={'Punch Out'}
          loading={loading}
          onPress={() => handlePunchInOut('punch_out')}
        />
      )}

      <CustomText
        marginTop={15}
        label="Time Summary"
        fontFamily={fonts.medium}
        color={COLORS.primaryColor}
      />

      <View style={styles.descBG}>
        <View style={styles.width25}>
          <CustomText label="Date" fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.width25}>
          <CustomText label="Time In" fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.width25}>
          <CustomText
            label="Time Out"
            fontFamily={fonts.medium}
            fontSize={12}
          />
        </View>
        <View style={styles.width25}>
          <CustomText fontSize={12} label="Status" fontFamily={fonts.medium} />
        </View>
      </View>
      <View style={{marginBottom: 10}}>
        {timeSummary?.map(entry => (
          <View key={entry?.id} style={styles.summaryRow}>
            <View style={styles.width25}>
              <CustomText
                label={entry?.date}
                fontFamily={fonts.regular}
                fontSize={11}
                color={COLORS.inputLabel}
              />
            </View>
            <View style={styles.width25}>
              <CustomText
                label={entry?.timeIn}
                fontFamily={fonts.regular}
                fontSize={11}
                color={COLORS.inputLabel}
              />
            </View>
            <View style={styles.width25}>
              <CustomText
                label={entry?.timeOut}
                fontFamily={fonts.regular}
                fontSize={11}
                color={COLORS.inputLabel}
              />
            </View>
            <View style={styles.width25}>
              <CustomText
                label={entry?.punchStatus === 'red' ? 'Outside' : 'Inside'}
                fontFamily={fonts.medium}
                fontSize={11}
                color={entry?.punchStatus === 'red' ? COLORS.red : COLORS.green}
              />
            </View>
          </View>
        ))}
      </View>

      {timeSummary?.length === 0 ? (
        <View style={styles.noDataContainer}>
          <CustomText
            fontSize={12}
            color={COLORS.gray1}
            alignSelf={'center'}
            fontFamily={fonts.medium}
            label="No time entries yet"
          />
        </View>
      ) : (
        <View style={styles.summaryBox}>
          <View style={[styles.row, {width: '50%'}]}>
            <CustomText label={'Total Hours:'} fontFamily={fonts.medium} />
            <CustomText
              marginLeft={10}
              numberOfLines={1}
              label={totalHours}
              fontFamily={fonts.semiBold}
              color={COLORS.primaryColor}
            />
          </View>
          <View style={[styles.row, {width: '50%'}]}>
            <CustomText label={'Total Salary:'} fontFamily={fonts.medium} />
            <CustomText
              marginLeft={10}
              numberOfLines={1}
              label={totalSalary}
              fontFamily={fonts.semiBold}
              color={COLORS.primaryColor}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default TaskSummary;
