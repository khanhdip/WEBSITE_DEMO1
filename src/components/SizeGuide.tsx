import React, { useState } from 'react';
import { HelpCircle, Sparkles, Scale, HeartHandshake, Check } from 'lucide-react';

export default function SizeGuide() {
  const [height, setHeight] = useState<number>(168);
  const [weight, setWeight] = useState<number>(58);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'regular' | 'oversized'>('regular');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [advice, setAdvice] = useState<string>('');

  const handleCalculate = () => {
    // Basic calculation heuristics based on height and weight
    let baseSizeScore = 0; // 0=S, 1=M, 2=L, 3=XL, 4=XXL

    // Height score
    if (height < 160) baseSizeScore += 0;
    else if (height < 168) baseSizeScore += 1;
    else if (height < 175) baseSizeScore += 2;
    else if (height < 182) baseSizeScore += 3;
    else baseSizeScore += 4;

    // Weight score
    let weightScore = 0;
    if (weight < 50) weightScore = 0;
    else if (weight < 60) weightScore = 1;
    else if (weight < 70) weightScore = 2;
    else if (weight < 82) weightScore = 3;
    else weightScore = 4;

    // Average the scores
    let finalScore = Math.round((baseSizeScore + weightScore) / 2);

    // Apply fit preference offsets
    if (fitPreference === 'fitted') {
      finalScore = Math.max(0, finalScore - 1);
    } else if (fitPreference === 'oversized') {
      finalScore = Math.min(4, finalScore + 1);
    }

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const sizeResult = sizes[finalScore] || 'M';

    setCalculatedSize(sizeResult);

    // Dynamic confidence percent calculation
    const isMarginal = (height % 5 === 0) || (weight % 10 === 0);
    const calculatedConfidence = isMarginal ? 85 : 95;
    setConfidence(calculatedConfidence);

    // Customized style tips
    let calculatedAdvice = '';
    if (fitPreference === 'oversized') {
      calculatedAdvice = `Vì bạn thích phong cách rộng rãi (oversized), size ${sizeResult} sẽ cho độ rộng nách áo rũ nhẹ dưới bả vai khoảng 3-4cm cực chất. Phù hợp mix cùng quần cargo túi hộp và mũ beanie để ra dáng streetwear bụi bặm!`;
    } else if (fitPreference === 'fitted') {
      calculatedAdvice = `Lựa chọn ôm vừa dáng (fitted) size ${sizeResult} giúp tôn chiều cao của bạn, vai áo vừa khít khung vai. Rất thích hợp sơ vin gọn gàng với quần baggy jeans hoặc quần đùi năng động.`;
    } else {
      calculatedAdvice = `Form vừa vặn (regular) size ${sizeResult} là tỷ lệ vàng của cơ thể bạn, áo sẽ dài qua thắt lưng khoảng 5cm, cử động vùng vai nách hoàn toàn thoải mái cho các hoạt động đi học, đi chơi cả ngày dài.`;
    }
    setAdvice(calculatedAdvice);
  };

  return (
    <div id="size-guide-container" className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Title & Badge */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 rounded-full mb-3 border border-neutral-200">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          Giải pháp AI rà soát số đo
        </div>
        <h2 className="font-sans font-black text-2xl sm:text-3xl text-neutral-900 uppercase tracking-tight">Tính Size Thông Minh</h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">Không còn nỗi lo đặt nhầm size áo quần! Nhập chiều cao, cân nặng và sở thích mặc áo quần của bạn, hệ thống thông minh của chúng tôi sẽ tính toán chuẩn xác kích thước đề xuất.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Inputs - Span 6 */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="flex items-center gap-2 font-sans font-black text-xs uppercase tracking-wider text-neutral-400 font-mono">
            <Scale className="w-4 h-4 text-neutral-700" />
            <span>Thông Số Cơ Thể</span>
          </h3>

          {/* Height slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold font-mono text-neutral-600">
              <span className="font-sans">Chiều cao</span>
              <span className="text-neutral-900 text-sm font-black">{height} cm</span>
            </div>
            <input
              type="range"
              min="150"
              max="195"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-neutral-900"
            />
          </div>

          {/* Weight slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold font-mono text-neutral-600">
              <span className="font-sans">Cân nặng</span>
              <span className="text-neutral-900 text-sm font-black">{weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-neutral-900"
            />
          </div>

          {/* Fit preference */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono">Gu mặc áo quần</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'fitted', label: 'Ôm sát dáng' },
                { id: 'regular', label: 'Vừa vặn suông' },
                { id: 'oversized', label: 'Rộng rãi cá tính' }
              ].map((fit) => (
                <button
                  key={fit.id}
                  onClick={() => setFitPreference(fit.id as any)}
                  className={`py-3.5 px-2 text-[10px] sm:text-xs font-bold rounded-2xl border transition-all text-center cursor-pointer leading-tight ${
                    fitPreference === fit.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                      : 'bg-neutral-50/50 text-neutral-600 border-neutral-200 hover:border-neutral-900'
                  }`}
                >
                  {fit.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl text-xs font-bold shadow-lg shadow-neutral-900/10 transition-all cursor-pointer flex items-center justify-center gap-1.5 transform active:scale-95"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tính Toán Size Đề Xuất</span>
          </button>
        </div>

        {/* Right Side: Calculation outputs & Static table - Span 6 */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Output card */}
          {calculatedSize ? (
            <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 animate-fadeIn border border-neutral-800">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">KẾT QUẢ PHÂN TÍCH</span>
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400 font-sans font-medium">Kích cỡ khuyên dùng</span>
                  <span className="text-5xl font-mono font-black tracking-tighter text-white mt-1">{calculatedSize}</span>
                </div>
                <div className="bg-white/10 px-3 py-2 rounded-2xl border border-white/5 text-right shrink-0">
                  <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">ĐỘ TIN CẬY</span>
                  <span className="font-mono text-sm font-black text-emerald-400 mt-0.5 block">{confidence}%</span>
                </div>
              </div>

              <div className="flex gap-2 items-start text-xs text-neutral-300 leading-relaxed font-sans">
                <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>{advice}</p>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-100 rounded-3xl p-8 text-center text-neutral-400 border border-neutral-200/50 flex flex-col items-center justify-center min-h-[180px]">
              <HelpCircle className="w-10 h-10 text-neutral-300 mb-2.5" />
              <p className="text-xs font-semibold max-w-xs leading-relaxed">Hãy nhập số đo bên trái và ấn nút tính size để nhận được đề xuất tối ưu.</p>
            </div>
          )}

          {/* Measurement specs table */}
          <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4 select-none">BẢNG SỐ ĐO TIÊU CHUẨN (VIỆT NAM)</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium font-sans">
                <thead>
                  <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 font-mono uppercase">
                    <th className="pb-2">SIZE</th>
                    <th className="pb-2">CHIỀU CAO (CM)</th>
                    <th className="pb-2">CÂN NẶNG (KG)</th>
                    <th className="pb-2">RỘNG NGỰC (CM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50 text-neutral-700">
                  {[
                    { sz: 'S', h: '150 - 160', w: '40 - 50', b: '94' },
                    { sz: 'M', h: '160 - 168', w: '50 - 60', b: '100' },
                    { sz: 'L', h: '168 - 175', w: '60 - 70', b: '106' },
                    { sz: 'XL', h: '175 - 182', w: '70 - 82', b: '112' },
                    { sz: 'XXL', h: '182 - 195', w: '82 - 100', b: '118' }
                  ].map((row) => (
                    <tr key={row.sz} className={calculatedSize === row.sz ? 'bg-neutral-50 text-neutral-900 font-bold' : ''}>
                      <td className="py-2.5 font-mono font-bold flex items-center gap-1">
                        {calculatedSize === row.sz && <span className="h-1.5 w-1.5 bg-neutral-900 rounded-full" />}
                        <span>{row.sz}</span>
                      </td>
                      <td className="py-2.5 font-mono text-neutral-500">{row.h}</td>
                      <td className="py-2.5 font-mono text-neutral-500">{row.w}</td>
                      <td className="py-2.5 font-mono text-neutral-500">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
