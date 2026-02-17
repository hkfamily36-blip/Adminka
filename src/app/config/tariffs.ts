// Единая конфигурация тарифов для всего приложения

export type TariffKey = 'free' | 'standard' | 'curator' | 'mentor';

export interface TariffConfig {
  key: TariffKey;
  label: string;
  level: number;
  description?: string;
}

export const TARIFFS: Record<TariffKey, TariffConfig> = {
  free: {
    key: 'free',
    label: 'Работник',
    level: 0,
    description: 'Базовый доступ для сотрудников',
  },
  standard: {
    key: 'standard',
    label: 'Самостоятельный',
    level: 1,
    description: 'Основной курс для самостоятельного обучения',
  },
  curator: {
    key: 'curator',
    label: 'С куратором',
    level: 2,
    description: 'Курс с поддержкой куратора',
  },
  mentor: {
    key: 'mentor',
    label: 'С наставником',
    level: 3,
    description: 'VIP-тариф с персональным наставником',
  },
};

// Функция для получения лейбла тарифа
export const getTariffLabel = (tariffKey: TariffKey): string => {
  return TARIFFS[tariffKey]?.label || tariffKey;
};

// Функция для проверки доступа
export const checkAccess = (userTariff: TariffKey, requiredTariff: TariffKey): boolean => {
  return TARIFFS[userTariff].level >= TARIFFS[requiredTariff].level;
};

// Массив всех тарифов для селектов и фильтров
export const TARIFF_OPTIONS = Object.values(TARIFFS);
