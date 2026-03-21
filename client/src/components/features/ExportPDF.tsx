import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface ExportPDFProps {
  title: string;
  data: any[];
  fileName?: string;
}

export const ExportPDF: React.FC<ExportPDFProps> = ({
  title,
  data,
  fileName = 'export',
}) => {
  const { showToast } = useToast();

  const handleExport = () => {
    try {
      // Créer le contenu HTML pour le PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                color: #333;
              }
              h1 {
                color: #0066cc;
                border-bottom: 2px solid #0066cc;
                padding-bottom: 10px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th {
                background-color: #0066cc;
                color: white;
                padding: 10px;
                text-align: left;
              }
              td {
                padding: 10px;
                border-bottom: 1px solid #ddd;
              }
              tr:hover {
                background-color: #f5f5f5;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                color: #999;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
            <table>
              <thead>
                <tr>
                  ${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${data.map(row => `
                  <tr>
                    ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="footer">
              <p>BiblioTech - Gestion de Bibliothèque</p>
            </div>
          </body>
        </html>
      `;

      // Créer un blob et télécharger
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showToast('Fichier exporté avec succès', 'success');
    } catch (error) {
      showToast('Erreur lors de l\'export', 'error');
    }
  };

  return (
    <motion.button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download className="w-4 h-4" />
      Exporter
    </motion.button>
  );
};
