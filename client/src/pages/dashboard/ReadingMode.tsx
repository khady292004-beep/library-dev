import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Moon, Sun, BookOpen } from 'lucide-react';
import { Link } from 'wouter';

interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  isDarkMode: boolean;
  fontFamily: 'serif' | 'sans-serif' | 'mono';
}

const mockBookContent = `
# Le Seigneur des Anneaux - Chapitre 1

En un coin de ce monde, dans le Comté, vivait un hobbit du nom de Frodon Sacquet. Le Comté était une région tranquille et verdoyante, peuplée de créatures petites et paisibles appelées hobbits. Frodon était un hobbit ordinaire, du moins en apparence, mais il était destiné à accomplir une quête extraordinaire.

Un jour, son vieil ami Gandalf le magicien lui rendit visite avec des nouvelles étonnantes. Il lui parla d'un anneau ancien, un anneau d'une grande puissance, qui avait été perdu pendant des siècles. Cet anneau, découvrit Frodon, avait appartenu à son oncle Bilbo, et était maintenant en sa possession.

Gandalf expliqua à Frodon que cet anneau n'était pas ordinaire. C'était l'Anneau Unique, créé par le Seigneur des Ténèbres lui-même pour dominer tous les autres anneaux et contrôler le monde. Il fallait le détruire, et seul Frodon pouvait accomplir cette tâche.

Bien que terrifié par cette responsabilité, Frodon accepta. Il savait que le sort du monde dépendait de sa décision. Avec l'aide de ses amis, notamment Sam, Merry et Pippin, il se prépara pour le long voyage qui l'attendait.

La route serait longue et périlleuse, remplie de dangers et d'embûches. Mais Frodon était déterminé. Il prit l'Anneau et se mit en route, ignorant que son voyage changerait à jamais le cours de l'histoire du monde.
`;

export default function ReadingMode() {
  const [settings, setSettings] = useState<ReadingSettings>({
    fontSize: 16,
    lineHeight: 1.6,
    isDarkMode: true,
    fontFamily: 'serif',
  });

  const fontFamilyMap = {
    serif: 'font-serif',
    'sans-serif': 'font-sans',
    mono: 'font-mono',
  };

  const handleFontSizeChange = (delta: number) => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(12, Math.min(32, prev.fontSize + delta)),
    }));
  };

  const handleLineHeightChange = (delta: number) => {
    setSettings(prev => ({
      ...prev,
      lineHeight: Math.max(1.2, Math.min(2.2, prev.lineHeight + delta)),
    }));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        settings.isDarkMode
          ? 'bg-slate-900 text-slate-100'
          : 'bg-amber-50 text-slate-900'
      }`}
    >
      {/* Header Controls */}
      <div
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          settings.isDarkMode
            ? 'border-slate-700 bg-slate-800/95'
            : 'border-amber-200 bg-amber-100/95'
        } backdrop-blur supports-[backdrop-filter]:bg-slate-800/60`}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Title */}
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5" />
            <h1 className="text-lg font-bold">Mode lecture</h1>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Font Size */}
            <div className="flex items-center gap-2 bg-slate-700 dark:bg-slate-700 px-3 py-2 rounded-lg">
              <button
                onClick={() => handleFontSizeChange(-2)}
                className="p-1 hover:bg-slate-600 rounded transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold w-8 text-center">
                {settings.fontSize}
              </span>
              <button
                onClick={() => handleFontSizeChange(2)}
                className="p-1 hover:bg-slate-600 rounded transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setSettings(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))}
              className={`p-2 rounded-lg transition-colors ${
                settings.isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600'
                  : 'bg-amber-200 hover:bg-amber-300'
              }`}
            >
              {settings.isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Close */}
            <Link href="/dashboard">
              <a className={`p-2 rounded-lg transition-colors ${
                settings.isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600'
                  : 'bg-amber-200 hover:bg-amber-300'
              }`}>
                <X className="w-5 h-5" />
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${fontFamilyMap[settings.fontFamily]} leading-relaxed`}
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
          }}
        >
          {mockBookContent.split('\n\n').map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="mb-6"
            >
              {paragraph.startsWith('#') ? (
                <h2 className="text-2xl font-bold mb-4">
                  {paragraph.replace(/^#+\s/, '')}
                </h2>
              ) : (
                <p className="text-justify">{paragraph}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Controls */}
        <div
          className={`mt-12 p-6 rounded-lg border transition-colors duration-300 ${
            settings.isDarkMode
              ? 'border-slate-700 bg-slate-800'
              : 'border-amber-200 bg-amber-100'
          }`}
        >
          <h3 className="font-bold mb-4">Paramètres de lecture</h3>

          {/* Font Family */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Police de caractères
            </label>
            <div className="flex gap-2">
              {(['serif', 'sans-serif', 'mono'] as const).map((font) => (
                <button
                  key={font}
                  onClick={() => setSettings(prev => ({ ...prev, fontFamily: font }))}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    settings.fontFamily === font
                      ? 'bg-blue-600 text-white'
                      : settings.isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-amber-200 hover:bg-amber-300'
                  }`}
                >
                  {font === 'serif' ? 'Serif' : font === 'sans-serif' ? 'Sans-serif' : 'Monospace'}
                </button>
              ))}
            </div>
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Hauteur de ligne : {settings.lineHeight.toFixed(1)}
            </label>
            <input
              type="range"
              min="1.2"
              max="2.2"
              step="0.1"
              value={settings.lineHeight}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                lineHeight: parseFloat(e.target.value),
              }))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
