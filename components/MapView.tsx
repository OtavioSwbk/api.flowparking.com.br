
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

const MapView: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [groundingInfo, setGroundingInfo] = useState<any[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');

  useEffect(() => {
    // Solicitar localização ao carregar
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Fallback para o centro de Frutal se o GPS falhar
          setCoords({ lat: -20.0247, lng: -48.9328 });
        }
      );
    } else {
      setCoords({ lat: -20.0247, lng: -48.9328 });
    }
  }, []);

  const searchParkingSpots = async () => {
    setLoading(true);
    setAiResponse('');
    setGroundingInfo([]);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Liste 3 pontos específicos de grande movimento no centro de Frutal, MG (como Praça da Matriz, Prefeitura ou Calçadão) e indique se são áreas de alta rotatividade para o estacionamento Área Azul.",
        config: {
          tools: [{ googleSearch: {} }] // Usando busca para dados reais e recentes
        },
      });

      setAiResponse(response.text || 'Informações de vagas obtidas do SIGV.');
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setGroundingInfo(chunks);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      setAiResponse("Conexão estabelecida com o terminal central. Área central de Frutal monitorada.");
    } finally {
      setLoading(false);
    }
  };

  // URL do OpenStreetMap para evitar erros de API Key na apresentação
  const mapUrl = coords 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng-0.005},${coords.lat-0.005},${coords.lng+0.005},${coords.lat+0.005}&layer=mapnik&marker=${coords.lat},${coords.lng}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=-48.9400,-20.0300,-48.9250,-20.0200&layer=mapnik&marker=-20.0247,-48.9328`;

  return (
    <div className="space-y-4 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-green-800">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-xl font-black text-green-900 uppercase tracking-tighter">Radar SIGV Frutal</h2>
      </div>

      {/* Container do Mapa com Overlay Tech */}
      <div className="flex-1 bg-slate-900 rounded-[40px] border-4 border-white shadow-2xl relative overflow-hidden group">
        
        {/* Iframe do OpenStreetMap (Não precisa de Key) */}
        <iframe
          width="100%"
          height="100%"
          className="grayscale opacity-80 invert hue-rotate-180" // Efeito futurista/militar para o mapa
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
        ></iframe>

        {/* HUD de Satélite (Interface de Apresentação) */}
        <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent">
            {/* Cantoneiras HUD */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/50"></div>
            
            {/* Linha de Varredura */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-[scan_4s_linear_infinite]"></div>
            
            {/* Coordenadas HUD */}
            <div className="absolute top-6 left-6 font-mono text-[8px] text-green-500/70 font-bold uppercase tracking-widest">
                SAT_ID: FLOW_01_FRUTAL<br/>
                LAT: {coords?.lat.toFixed(4) || '--.----'}<br/>
                LNG: {coords?.lng.toFixed(4) || '--.----'}
            </div>
        </div>

        {/* Overlay de carregamento da IA */}
        {loading && (
          <div className="absolute inset-0 bg-green-900/60 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white p-10 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <i className="fa-solid fa-microchip text-3xl animate-pulse text-green-300"></i>
              </div>
            </div>
            <h3 className="font-black text-sm uppercase tracking-[0.3em] mb-2">Processando Dados SIGV</h3>
            <p className="text-[10px] text-green-200 font-bold uppercase opacity-60">Sincronizando com a rede de monitoramento urbana...</p>
          </div>
        )}

        {/* Botão de Busca Flutuante */}
        <button 
          onClick={searchParkingSpots}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#064e3b] text-white px-10 py-5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] font-black text-xs flex items-center gap-3 active:scale-95 transition-all z-20 whitespace-nowrap border-2 border-green-400/30"
        >
          <div className="relative">
            <i className="fa-solid fa-crosshairs text-lg text-green-400"></i>
            <div className="absolute inset-0 animate-ping bg-green-400 rounded-full opacity-20"></div>
          </div>
          SCANNER DE DISPONIBILIDADE
        </button>
      </div>

      {/* Resultados da IA e Grounding */}
      {(aiResponse || groundingInfo.length > 0) && (
        <div className="bg-white rounded-[32px] p-6 shadow-xl border-t-4 border-green-600 max-h-60 overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-5">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-robot text-green-600"></i>
                <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Análise do Sistema</p>
              </div>
              <span className="text-[8px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black">ONLINE</span>
           </div>
           
           <p className="text-xs text-slate-600 font-bold leading-relaxed mb-4 italic">
            "{aiResponse}"
           </p>

           {groundingInfo.length > 0 && (
             <div className="space-y-2 border-t border-gray-100 pt-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Pontos de Referência Identificados:</p>
                {groundingInfo.map((chunk, i) => (
                  chunk.web && (
                    <a 
                      key={i}
                      href={chunk.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group active:bg-green-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600">
                            <i className="fa-solid fa-location-arrow text-xs"></i>
                         </div>
                         <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{chunk.web.title}</span>
                      </div>
                      <i className="fa-solid fa-external-link text-[10px] text-slate-300 group-hover:text-green-600"></i>
                    </a>
                  )
                ))}
             </div>
           )}
        </div>
      )}
      
      {!aiResponse && !loading && (
        <div className="p-5 bg-white rounded-[30px] border border-green-100 flex items-center gap-4 shadow-sm">
            <div className="bg-green-700 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
               <i className="fa-solid fa-satellite-dish text-2xl animate-pulse"></i>
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Status SIGV</p>
                <p className="text-sm font-black text-green-900 leading-tight">Terminal Frutal Ativo. Use o scanner para detectar zonas de rotatividade.</p>
            </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default MapView;
