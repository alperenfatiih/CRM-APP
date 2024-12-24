import React from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ date, setDate }) => {
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View>
      <Button title="TARİH SEÇ" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;