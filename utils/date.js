export const formatTime = date => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isAm = hours < 12;

  return `${isAm ? '오전' : '오후'} ${
    hours < 13 ? hours : hours - 12
  }시 ${minutes}분`;
};
