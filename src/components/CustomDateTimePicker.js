import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import CustomText from "./CustomText";
import { COLORS } from "../utils/COLORS";
import moment from "moment";
import fonts from "../assets/fonts";
import Icons from "./Icons";

const CustomDateTimePicker = ({
  mode = "date",
  value, // No default value here, let it remain undefined if not passed
  onChange,
  label,
  placeholder = "Select date/time", // Set default placeholder
  maximumDate,
  minimumDate,
  showIcon,
  width,
  error,
}) => {
  const [open, setOpen] = useState(false);

  // Only format the value if it's present, otherwise show placeholder
  const formattedValue = value
    ? mode === "date"
      ? moment(value).format("DD/MM/YYYY")
      : moment(value).format("HH:mm A")
    : placeholder;
  const isError =
    error !== undefined && error !== null && error !== true && error !== "";
  return (
    <>
      {label && (
        <CustomText
          label={label}
          marginBottom={5}
          fontSize={14}
          color={"#717579"}
          textTransform={"uppercase"}
        />
      )}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[
          styles.dateTimePickerContainer,
          {
            marginBottom: isError ? 5 : 15,

            borderColor: COLORS.gray1,
          },
        ]}
      >
        <View>
          <CustomText
            label={formattedValue}
            fontSize={14}
            color={COLORS.white}
            marginTop={2}
          />
        </View>

        {showIcon && (
          <View>
            <Icons
              family={"MaterialCommunityIcons"}
              name={
                mode === "date" ? "calendar-range" : "clock-time-five-outline"
              }
              color={COLORS.primaryColor}
              size={18}
            />
          </View>
        )}
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        mode={mode}
        date={value || new Date()} // If no value, set default to current date
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        onConfirm={(selectedValue) => {
          setOpen(false);
          onChange(selectedValue);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
  dateTimePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    marginBottom: 18,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray1,
  },
});
