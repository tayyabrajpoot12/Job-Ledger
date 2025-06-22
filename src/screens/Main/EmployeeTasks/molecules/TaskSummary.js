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
  const redRecords = records.filter(item => item.punchStatus === 'red');

  const greenHours = greenRecords?.reduce(
    (sum, curr) => sum + curr.totalHours,
    0,
  );
  const redHours = redRecords?.reduce((sum, curr) => sum + curr.totalHours, 0);
  const totalHours = records?.reduce((sum, curr) => sum + curr.totalHours, 0);

  const totalSalary = greenHours * hourlyRate;

  return {
    redHours: redHours.toFixed(2),
    greenHours: greenHours.toFixed(2),
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
  hide = false,
}) => {
  const {totalHours, totalSalary, redHours, greenHours} =
    getTotalHoursAndSalary(timeSummary, salary);

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

      {!hide && (
        <>
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
        </>
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
        <>
          <View style={styles.summaryBox}>
            <View style={styles.row}>
              <View style={[styles.row, {width: '50%'}]}>
                <CustomText
                  fontSize={12}
                  label={'Outside Hours:'}
                  fontFamily={fonts.semiBold}
                />
                <CustomText
                  fontSize={12}
                  marginLeft={10}
                  label={redHours}
                  numberOfLines={1}
                  fontFamily={fonts.semiBold}
                  color={COLORS.primaryColor}
                />
              </View>
              <View style={[styles.row, {width: '50%'}]}>
                <CustomText
                  fontSize={12}
                  label={'Inside Hours:'}
                  fontFamily={fonts.semiBold}
                />
                <CustomText
                  fontSize={12}
                  marginLeft={10}
                  numberOfLines={1}
                  label={greenHours}
                  fontFamily={fonts.semiBold}
                  color={COLORS.primaryColor}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.row, {width: '50%'}]}>
                <CustomText
                  fontSize={12}
                  label={'Total Hours:'}
                  fontFamily={fonts.semiBold}
                />
                <CustomText
                  fontSize={12}
                  marginLeft={10}
                  numberOfLines={1}
                  label={totalHours}
                  fontFamily={fonts.semiBold}
                  color={COLORS.primaryColor}
                />
              </View>
              <View style={[styles.row, {width: '50%'}]}>
                <CustomText
                  fontSize={12}
                  label={'Total Salary:'}
                  fontFamily={fonts.semiBold}
                />
                <CustomText
                  fontSize={12}
                  marginLeft={10}
                  numberOfLines={1}
                  label={totalSalary}
                  fontFamily={fonts.semiBold}
                  color={COLORS.primaryColor}
                />
              </View>
            </View>
          </View>
          {totalHours === '0.00' && (
            <CustomText
              marginBottom={10}
              fontFamily={fonts.medium}
              label={
                'Your salary is $0.00 as all of your punch in/out are outside of the project location'
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default TaskSummary;
