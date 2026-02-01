
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onSave: (plate: string, nickname: string) => void;
}

const AddVehicle: React.FC<Props> = ({ onBack, onSave }) => {
  const [plate, setPlate] = useState('');
  const [nick, setNick] = useState('');

  const handleSave = () => {
    if (!plate || !nick) return;
    onSave(plate.toUpperCase(), nick);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-green-800">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-xl font-black text-green-900">Novo Veículo</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Placa (Mercosul ou Antiga)</label>
          <input 
            type="text"
            placeholder="ABC-1234"
            maxLength={8}
            value={plate}
            onChange={e => setPlate(e.target.value)}
            className="w-full bg-green-50 border-2 border-green-100 rounded-2xl py-4 px-4 text-2xl font-black tracking-[0.2em] outline-none focus:border-green-500 uppercase text-center text-slate-700"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Apelido do Carro</label>
          <input 
            type="text"
            placeholder="Ex: Meu SUV"
            value={nick}
            onChange={e => setNick(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-4 outline-none focus:border-green-500 font-medium"
          />
        </div>

        <div className="pt-2">
          <button 
            onClick={handleSave}
            disabled={!plate || !nick}
            className={`w-full py-5 rounded-2xl font-black text-white shadow-xl transition ${(!plate || !nick) ? 'bg-gray-200' : 'bg-green-600 active:scale-95 hover:bg-green-700'}`}
          >
            SALVAR NO APP
          </button>
        </div>
      </div>

      <div className="p-4 bg-green-100/50 rounded-2xl border border-green-200 flex gap-3 items-center">
        <i className="fa-solid fa-shield-check text-green-600 text-xl"></i>
        <p className="text-[10px] text-green-800 leading-tight font-bold uppercase tracking-wider">
          Seus dados estão seguros. A validação é feita via banco de dados oficial SIGV.
        </p>
      </div>
    </div>
  );
};

export default AddVehicle;
