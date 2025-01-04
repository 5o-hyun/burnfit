import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CalendarScreen = () => {
  const [today, setToday] = useState<Date>(new Date());
  const [selectDate, setSelectDate] = useState<Date | null>(new Date());

  const getCalendarDates = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const endDay = new Date(year, month + 1, 0).getDate();
    const lastMonthEndDays = new Date(year, month, 0).getDate();

    // 날짜 배열 생성
    const dates = [
      ...Array.from({ length: firstDay }, (_, i) => ({ day: lastMonthEndDays - firstDay + i + 1, isCurrentMonth: false })),
      ...Array.from({ length: endDay }, (_, i) => ({ day: i + 1, isCurrentMonth: true })),
      ...Array.from({ length: 7 - ((endDay + firstDay) % 7) }, (_, i) => ({ day: i + 1, isCurrentMonth: false })),
    ];

    // 배열을 7일씩 묶어서 반환
    return dates.reduce<{ day: number; isCurrentMonth: boolean }[][]>((weeks, date, i) => {
      if (i % 7 === 0) weeks.push([]);
      weeks[weeks.length - 1].push(date);
      return weeks;
    }, []);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name={'arrow-back-ios'} style={styles.arrow} />
        <Text style={styles.month}>
          {today.toLocaleString('en-US', { month: 'long' })} {today.getFullYear()}
        </Text>
        <Icon name={'arrow-forward-ios'} style={styles.arrow} />
      </View>

      {/* Week */}
      <View style={styles.weekContainer}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={[styles.weekday, day === 'Sun' && styles.sunday, day === 'Sat' && styles.saturday]}>
            {day}
          </Text>
        ))}
      </View>

      {/* Day */}
      <View>
        {getCalendarDates().map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((date, dayIndex) => {
              const { day, isCurrentMonth } = date;
              return (
                <View key={dayIndex} style={styles.dayContainer}>
                  <Text style={[styles.day, !isCurrentMonth && styles.dayDisabled, selectDate?.getDate() === day && styles.daySelected]}>{day}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrow: { fontSize: 18, color: '#329eff' },
  month: { fontSize: 18, fontWeight: 'bold' },
  weekContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  weekday: { flex: 1, textAlign: 'center', color: '#666' },
  sunday: { color: 'red' },
  saturday: { color: '#329eff' },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    flex: 1,
    aspectRatio: 1 / 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    color: '#666',
  },
  dayDisabled: {
    color: '#bbb',
  },
  daySelected: { borderWidth: 1, borderColor: '#329eff', borderRadius: '50%', fontWeight: 'bold', color: '#000', paddingHorizontal: 10, paddingVertical: 5 },
});

export default CalendarScreen;
