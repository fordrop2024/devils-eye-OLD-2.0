import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Download, Copy, Check, FileText } from 'lucide-react';

export const ScriptStudioView: React.FC = () => {
  const { activeMovie, setCurrentScreen } = useApp();
  const [headerTab, setHeaderTab] = useState<'Generate Script' | 'Script Editor' | 'Voice Settings'>('Generate Script');
  const [language, setLanguage] = useState<'Hindi' | 'English' | 'Hinglish'>('Hindi');
  const [duration, setDuration] = useState<'10 min' | '15 min' | '20 min' | '25 min' | '30 min'>('15 min');
  const [scriptStyle, setScriptStyle] = useState('Professional YouTube');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = ['Hindi', 'English', 'Hinglish'] as const;
  const durations = ['10 min', '15 min', '20 min', '25 min', '30 min'] as const;

  const scriptBlocks = [
    {
      timecode: '[00:00 - 00:45] - Hook',
      textHindi:
        'क्या आपने कभी सोचा है कि अगर आपका सपना हकीकत बन जाए, या हकीकत ही सिर्फ एक सपना हो? क्रिस्टोफर नोलन की इंसेप्शन इसी सवाल से शुरू होती है। डोम कॉब, एक ऐसा चोर जो सोते हुए लोगों के दिमाग में घुसकर उनके सबसे गहरे राज चुराता है।',
      textEnglish:
        'Have you ever wondered what happens if your dreams become reality—or if waking life is just an illusion? Christopher Nolan\'s Inception begins with this haunting paradox. Dom Cobb is an extractor who enters subconscious dreams to steal corporate secrets.',
    },
    {
      timecode: '[00:45 - 02:30] - Central Question',
      textHindi:
        'लेकिन क्या किसी के दिमाग में नया विचार रोपना मुमकिन है? इसे कहते हैं ‘इंसेप्शन’। जब एक जापानी बिजनेसमैन सैतो कॉब को यह असंभव काम देता है, तो दांव पर सिर्फ पैसा नहीं, बल्कि कॉब की अपनी आज़ादी और उसके बच्चों से मिलने का मौका होता है।',
      textEnglish:
        'Can an idea be implanted so deeply that someone believes they originated it? This is \'Inception\'. When billionaire Saito offers Cobb a clean slate in America in exchange for this impossible heist, Cobb takes the gamble of his life.',
    },
    {
      timecode: '[02:30 - 05:15] - Characters',
      textHindi:
        'इस मिशन के लिए कॉब बनाता है एक बेमिसाल टीम: आर्थर जो बारीकियों का मास्टर है, एरियाडने जो सपनों के पेचीदा रास्ते डिजाइन करती है, और ईम्स जो किसी का भी रूप ले सकता है। लेकिन कॉब का सबसे बड़ा दुश्मन कोई बाहरी इंसान नहीं, बल्कि उसकी मृत पत्नी मैल की यादें हैं।',
      textEnglish:
        'Cobb gathers an elite strike team: Arthur the point-man, Ariadne the dream architect, and Eames the master forger. Yet the greatest threat is not Fischer\'s armed subconscious—it is the phantom projection of Cobb\'s deceased wife, Mal.',
    },
    {
      timecode: '[05:15 - 08:40] - Rising Tension',
      textHindi:
        'सपने के अंदर सपना... और उसके अंदर एक और सपना! बारिश से भीगती सड़क पर वैन का गिरना, ज़ीरो ग्रेविटी होटल का रोमांचक कॉरिडोर फाइट, और बर्फ के पहाड़ों पर अंतिम हमला। हर एक स्तर पर समय बीस गुना धीमा हो जाता है, और एक गलती का मतलब हमेशा के लिए लिम्बो में भटकना!',
      textEnglish:
        'A dream within a dream within a dream! As Yusuf drives the falling van in rain-soaked streets, Arthur navigates a zero-gravity hotel corridor brawl, while Cobb dives into Limbo to trigger the synchronized musical kick.',
    },
  ];

  const handleGenerateScript = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  const handleCopy = () => {
    const fullText = scriptBlocks
      .map((b) => `${b.timecode}\n${language === 'English' ? b.textEnglish : b.textHindi}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="script-studio-view" className="space-y-6 max-w-7xl mx-auto select-none pb-12">
      {/* Header with 3 Buttons (Match Panel 7 Exactly) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-xl font-bold font-tech text-white uppercase tracking-wider">
            Script Studio
          </h1>
          <p className="text-xs text-gray-400 font-mono-tech mt-0.5">
            Cinematic Narration Engine • Multilingual YouTube Script Synthesizer
          </p>
        </div>

        {/* 3 Header Buttons */}
        <div className="flex items-center gap-2">
          {(['Generate Script', 'Script Editor', 'Voice Settings'] as const).map((tab) => (
            <button
              key={tab}
              id={`script-header-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setHeaderTab(tab);
                if (tab === 'Voice Settings') setCurrentScreen('voice');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-tech tracking-wider uppercase transition cursor-pointer border ${
                headerTab === tab
                  ? 'bg-[#00E5FF] text-black border-[#00E5FF] font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                  : 'bg-[#050505] border-[#1a1a1a] text-gray-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split (Match Panel 7 Exactly) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===============================================================
            LEFT PANEL: LANGUAGE, DURATION, SCRIPT STYLE & ACTION BUTTON
            =============================================================== */}
        <div className="lg:col-span-4 bg-[#050505] border border-[#1a1a1a] rounded-xl p-6 space-y-6 shadow-2xl">
          {/* Section: Language */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold font-tech uppercase text-gray-300 block tracking-wider">
              Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  id={`lang-btn-${lang.toLowerCase()}`}
                  onClick={() => setLanguage(lang)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono-tech transition cursor-pointer border ${
                    language === lang
                      ? 'bg-[#00E5FF] text-black font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                      : 'bg-[#000000] border-[#1a1a1a] text-gray-400 hover:text-white hover:border-slate-800'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Duration */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold font-tech uppercase text-gray-300 block tracking-wider">
              Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {durations.map((dur) => (
                <button
                  key={dur}
                  id={`dur-btn-${dur.replace(/\s+/g, '-')}`}
                  onClick={() => setDuration(dur)}
                  className={`py-2 px-2 rounded-lg text-xs font-mono-tech transition cursor-pointer border ${
                    duration === dur
                      ? 'bg-red-950/40 border-red-500 text-[#FF0033] font-bold shadow-[0_0_8px_rgba(255,0,51,0.3)]'
                      : 'bg-[#000000] border-[#1a1a1a] text-gray-400 hover:text-white hover:border-slate-800'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Script Style */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold font-tech uppercase text-gray-300 block tracking-wider">
              Script Style
            </label>
            <select
              id="script-style-select"
              value={scriptStyle}
              onChange={(e) => setScriptStyle(e.target.value)}
              className="w-full bg-[#000000] border border-[#1a1a1a] rounded-lg py-2.5 px-3 text-xs font-mono-tech text-white outline-none focus:border-[#00E5FF] cursor-pointer"
            >
              <option value="Professional YouTube">Professional YouTube</option>
              <option value="Dramatic Trailer Hook">Dramatic Trailer Hook</option>
              <option value="Philosophical Deep Dive">Philosophical Deep Dive</option>
              <option value="Fast Paced Recap">Fast Paced Recap</option>
            </select>
          </div>

          {/* Red Action Button: [ Generate Script ] */}
          <button
            id="generate-script-action-btn"
            onClick={handleGenerateScript}
            disabled={isGenerating}
            className="w-full bg-[#FF0033] hover:bg-red-600 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(255,0,51,0.6)] font-tech tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            <Sparkles size={15} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? 'Synthesizing Beats...' : 'Generate Script'}</span>
          </button>
        </div>

        {/* ===============================================================
            RIGHT PANEL: TELEPROMPTER VIEW WITH CYAN TIMECODE BLOCKS
            =============================================================== */}
        <div className="lg:col-span-8 bg-[#050505] border border-[#1a1a1a] rounded-xl p-6 space-y-5 shadow-2xl">
          {/* Header of Generated Script */}
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
            <div>
              <h2 className="text-sm font-bold font-tech text-white uppercase tracking-wider">
                Generated Script
              </h2>
              <p className="text-xs font-mono-tech text-gray-400 mt-0.5">
                {activeMovie.title} - {duration} ({language})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="copy-script-btn"
                onClick={handleCopy}
                className="p-1.5 px-3 rounded bg-black border border-[#1a1a1a] hover:border-slate-700 text-xs font-mono-tech text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                id="download-script-btn"
                onClick={() => alert(`Downloaded script for ${activeMovie.title} in ${language}.`)}
                className="p-1.5 px-3 rounded bg-black border border-[#1a1a1a] hover:border-[#00E5FF] text-xs font-mono-tech text-[#00E5FF] flex items-center gap-1.5 cursor-pointer transition"
              >
                <Download size={13} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Teleprompter Scroll Container with Cyan Timecode Blocks */}
          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
            {scriptBlocks.map((block, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#000000] border border-[#1a1a1a] hover:border-slate-800 transition space-y-2"
              >
                {/* Cyan Timecode Banner */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech font-bold text-[#00E5FF] tracking-wide">
                    {block.timecode}
                  </span>
                  <span className="text-[10px] font-mono-tech text-gray-500 uppercase">
                    Beat {idx + 1}
                  </span>
                </div>

                {/* Script Narration Text */}
                <p className="text-xs sm:text-sm font-mono-tech text-gray-200 leading-relaxed">
                  {language === 'English' ? block.textEnglish : block.textHindi}
                </p>
              </div>
            ))}
          </div>

          {/* Voice Lab CTA footer */}
          <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono-tech">
            <span className="text-gray-500">Script synchronized with movie timeline</span>
            <button
              onClick={() => setCurrentScreen('voice')}
              className="text-[#00E5FF] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Send to TTS & Audio Lab →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
