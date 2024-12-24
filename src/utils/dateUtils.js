export const isUpcomingOrOverdue = (nextServiceDate) => {
  if (!nextServiceDate) return false; // Tarih yoksa false döndür

  const currentDate = new Date(); // Bugünün tarihi
  const nextDate = new Date(nextServiceDate); // Gelen `nextServiceDate`

  // Tarih geçerli mi?
  if (isNaN(nextDate)) {
    console.error('Invalid date format:', nextServiceDate);
    return false; // Hatalı bir tarih varsa false döndür
  }

  // 15 gün sonrası
  const fifteenDaysFromNow = new Date();
  fifteenDaysFromNow.setDate(currentDate.getDate() + 30);

  // Kurallar:
  // 1. nextServiceDate geçmişte ise
  // 2. nextServiceDate önümüzdeki 15 gün içindeyse
  return nextDate <= currentDate || nextDate <= fifteenDaysFromNow;
};
