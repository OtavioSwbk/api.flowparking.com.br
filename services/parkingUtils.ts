
export const OPERATING_HOURS = {
  WEEKDAY: { start: 8, end: 18 },
  SATURDAY: { start: 8, end: 12 },
};

export function isOperatingTime(date: Date): boolean {
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const time = hour + minutes / 60;

  if (day === 0) return false; // Domingo
  if (day === 6) { // Sábado
    return time >= OPERATING_HOURS.SATURDAY.start && time < OPERATING_HOURS.SATURDAY.end;
  }
  // Segunda a Sexta
  return time >= OPERATING_HOURS.WEEKDAY.start && time < OPERATING_HOURS.WEEKDAY.end;
}

export function getNextOperatingStart(date: Date): Date {
  const next = new Date(date);
  next.setSeconds(0, 0);
  
  // Avança para o próximo dia
  next.setDate(next.getDate() + 1);
  next.setHours(8, 0, 0, 0);

  // Se cair no domingo, pula para segunda
  if (next.getDay() === 0) {
    next.setDate(next.getDate() + 1);
  }
  
  return next;
}

export function calculateParkingEndTime(startDate: Date, totalMinutes: number): Date {
  let current = new Date(startDate);
  let remaining = totalMinutes;

  // Se começou antes das 8h do dia atual, ajusta para 8h
  if (current.getHours() < 8 && current.getDay() !== 0) {
    current.setHours(8, 0, 0, 0);
  }

  while (remaining > 0) {
    const day = current.getDay();
    
    // Se for domingo, pula para segunda 8h
    if (day === 0) {
      current = getNextOperatingStart(current);
      continue;
    }

    const isSaturday = day === 6;
    const endHour = isSaturday ? OPERATING_HOURS.SATURDAY.end : OPERATING_HOURS.WEEKDAY.end;
    
    const endOfOpToday = new Date(current);
    endOfOpToday.setHours(endHour, 0, 0, 0);

    // Se já passou do horário de hoje, pula para o próximo início
    if (current >= endOfOpToday) {
      current = getNextOperatingStart(current);
      continue;
    }

    const minutesAvailableToday = (endOfOpToday.getTime() - current.getTime()) / 60000;

    if (remaining <= minutesAvailableToday) {
      current = new Date(current.getTime() + remaining * 60000);
      remaining = 0;
    } else {
      remaining -= minutesAvailableToday;
      current = getNextOperatingStart(current);
    }
  }
  return current;
}

export function getRemainingWorkingMinutes(endTime: Date): number {
  let now = new Date();
  const target = new Date(endTime);
  let minutes = 0;

  if (now >= target) return 0;

  // Loop para somar apenas os minutos em que a área azul está ativa
  let current = new Date(now);
  while (current < target) {
    if (isOperatingTime(current)) {
      minutes++;
    }
    current = new Date(current.getTime() + 60000); // Adiciona 1 minuto
    
    // Otimização para pular grandes blocos inativos
    if (!isOperatingTime(current)) {
      const nextStart = getNextOperatingStart(current);
      if (nextStart < target) {
        current = nextStart;
      } else {
        break; 
      }
    }
  }
  return minutes;
}
