import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, X, AlertCircle } from 'lucide-react';
import { Button, Card } from '../components/UI';

export const ImportPage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    // Simulate upload
    setStatus('uploading');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Importación Masiva</h1>
        <p className="text-slate-500 mt-1">Carga datos de transacciones, nuevas terminales o actualizaciones de clientes.</p>
      </div>

      <div className="space-y-6">
        {/* Status Card if not idle */}
        {status !== 'idle' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${status === 'success' ? 'bg-green-100 text-green-600' : status === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  {status === 'success' ? <CheckCircle size={24} /> : status === 'error' ? <AlertCircle size={24} /> : <UploadCloud size={24} />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {status === 'uploading' ? 'Procesando archivo...' : status === 'success' ? 'Importación completada' : 'Error en la carga'}
                  </h3>
                  <p className="text-sm text-slate-500">{file?.name}</p>
                </div>
              </div>
              {status !== 'uploading' && (
                <Button variant="ghost" size="sm" onClick={reset} className="text-slate-400 hover:text-slate-900">
                  <X size={20} />
                </Button>
              )}
            </div>
            
            {status === 'uploading' && (
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-indigo-600 h-2.5 rounded-full animate-[progress_2s_ease-in-out_infinite] w-2/3"></div>
              </div>
            )}

            {status === 'success' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg text-sm text-green-800">
                Se han importado <strong>1,204 registros</strong> correctamente. No se encontraron duplicados.
              </div>
            )}
          </Card>
        )}

        {/* Upload Zone */}
        {status === 'idle' && (
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
              ${isDragging 
                ? 'border-indigo-500 bg-indigo-50/50' 
                : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".csv,.xlsx"
              onChange={handleInputChange}
            />
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <UploadCloud size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Arrastra tu archivo CSV/XLSX aquí</h3>
              <p className="text-slate-500 mt-2 mb-6">o haz clic para buscar en tu ordenador</p>
              <div className="flex gap-8 text-xs text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1"><FileText size={12} /> CSV</span>
                <span className="flex items-center gap-1"><FileText size={12} /> Excel</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};