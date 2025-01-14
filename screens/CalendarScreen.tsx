import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, PanResponder, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');

  const getCalendarDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const endDay = new Date(year, month + 1, 0).getDate();
    const lastMonthEndDays = new Date(year, month, 0).getDate();

    // 날짜 배열 생성
    const dates = [
      ...Array.from({ length: firstDay }, (_, i) => ({ day: new Date(year, month - 1, lastMonthEndDays - firstDay + i + 1), isCurrentMonth: false })),
      ...Array.from({ length: endDay }, (_, i) => ({ day: new Date(year, month, i + 1), isCurrentMonth: true })),
      ...Array.from({ length: 7 - ((endDay + firstDay) % 7) }, (_, i) => ({ day: new Date(year, month + 1, i + 1), isCurrentMonth: false })),
    ];

    // 배열을 7일씩 묶어서 반환
    return dates.reduce<{ day: Date; isCurrentMonth: boolean }[][]>((weeks, date, i) => {
      if (i % 7 === 0) weeks.push([]);
      weeks[weeks.length - 1].push(date);
      return weeks;
    }, []);
  };

  const getWeekDates = () => {
    const startOfWeek = currentDate;
    const startDay = startOfWeek.getDate() - startOfWeek.getDay();
    const weekDates = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.setDate(startDay + i)));
    return weekDates;
  };

  const onClickPrev = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const onClickNext = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const onSelectDate = (date: Date) => {
    setSelectDate(date);
  };

  const onSwipeUp = () => {
    setViewMode('monthly');
  };
  const onSwipeDown = () => {
    setViewMode('weekly');
  };
  const onSwipeLeft = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  const onSwipeRight = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e: GestureResponderEvent, gestureState: { dy: number; dx: number }) => {
      if (gestureState.dy > 50) onSwipeUp();
      if (gestureState.dy < -50) onSwipeDown();
      if (gestureState.dx > 50) onSwipeLeft();
      if (gestureState.dx < -50) onSwipeRight();
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name={'arrow-back-ios'} style={styles.arrow} onPress={onClickPrev} />
        <Text style={styles.month}>
          {currentDate.toLocaleString('en-US', { month: 'long' })} {currentDate.getFullYear()}
        </Text>
        <Icon name={'arrow-forward-ios'} style={styles.arrow} onPress={onClickNext} />
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
      {viewMode === 'monthly' && (
        <View>
          {getCalendarDates().map((week, weekIndex) => (
            <View key={weekIndex} style={styles.week}>
              {week.map((date, dayIndex) => {
                const { day: calendarDate, isCurrentMonth } = date;
                const isSelected =
                  selectDate &&
                  selectDate.getDate() === calendarDate.getDate() &&
                  selectDate.getMonth() === calendarDate.getMonth() &&
                  selectDate.getFullYear() === calendarDate.getFullYear();

                return (
                  <View key={dayIndex} style={styles.dayContainer}>
                    <Text
                      style={[styles.day, !isCurrentMonth && styles.dayDisabled, isSelected && styles.daySelected]}
                      onPress={() => isCurrentMonth && onSelectDate(calendarDate)}
                    >
                      {calendarDate.getDate()}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      )}
      {viewMode === 'weekly' && (
        <View style={styles.weekContainer}>
          {getWeekDates().map((date, index) => {
            const isSelected = selectDate.getDate() === date.getDate() && selectDate.getMonth() === date.getMonth();
            return (
              <View key={index} style={styles.dayContainer}>
                <Text style={[styles.day, isSelected && styles.daySelected]} onPress={() => onSelectDate(date)}>
                  {date.getDate()}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
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
  daySelected: {
    borderWidth: 1,
    borderColor: '#329eff',
    borderRadius: '50%',
    fontWeight: 'bold',
    color: '#000',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default CalendarScreen;
