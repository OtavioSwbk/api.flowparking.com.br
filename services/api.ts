
import { UserState, Vehicle, ActiveParking } from '../types';

const STORAGE_KEY = 'flowparking_user_data';

// Simula um delay de rede para parecer real
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const initialData: UserState = {
  balance: 50.00,
  vehicles: [{ id: '1', plate: 'ABC-1234', nickname: 'Meu Carro' }],
  activeParking: null,
  history: [{ id: 'h1', plate: 'ABC-1234', date: new Date().toISOString(), duration: '60 min', cost: 5.50, status: 'Concluído' }]
};

export const api = {
  // Carregar dados do usuário
  getUserData: async (): Promise<UserState> => {
    await delay(800);
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialData;
  },

  // Salvar dados (Simulando o Banco)
  saveUserData: async (data: UserState): Promise<void> => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Login Simulado
  login: async (cpf: string): Promise<boolean> => {
    await delay(1200);
    // Em um app real, aqui você faria um POST para seu servidor
    return true; 
  },

  // Cadastro Simulado
  register: async (data: any): Promise<boolean> => {
    await delay(1500);
    return true;
  }
};
