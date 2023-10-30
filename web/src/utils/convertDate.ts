import { Timestamp } from "firebase/firestore";

interface convertDate {
  timeStampDate: Timestamp;
  options: 'DATE' | 'HOURS' | 'DATE_AND_HOURS' | 'DATE_AND_HOURS_WITH_SECONDS' | 'YEARS';
}

export function convertDate({ timeStampDate, options }: convertDate) {
  const dateSecondsToMilliseconds = timeStampDate.seconds * 1000;

  const convertedDate = new Date(dateSecondsToMilliseconds).toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: options === 'DATE' || options === 'DATE_AND_HOURS' || options === 'DATE_AND_HOURS_WITH_SECONDS' ? 'numeric' : undefined,
    month: options === 'DATE' || options === 'DATE_AND_HOURS' || options === 'DATE_AND_HOURS_WITH_SECONDS' ? 'numeric' : undefined,
    day: options === 'DATE' || options === 'DATE_AND_HOURS' || options === 'DATE_AND_HOURS_WITH_SECONDS' ? 'numeric' : undefined,
    hour: options === 'HOURS' || options === 'DATE_AND_HOURS' || options === 'DATE_AND_HOURS_WITH_SECONDS' ? 'numeric' : undefined,
    minute: options === 'HOURS' || options === 'DATE_AND_HOURS' || options === 'DATE_AND_HOURS_WITH_SECONDS' ? 'numeric' : undefined,
    second: options === 'DATE_AND_HOURS_WITH_SECONDS' ? 'numeric' : undefined,
  });

  return convertedDate;
}