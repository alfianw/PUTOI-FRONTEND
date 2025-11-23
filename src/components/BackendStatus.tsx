import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/health`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );

      if (response.ok) {
        setStatus('online');
        // Don't show alert if backend is online
        setShowAlert(false);
      } else {
        setStatus('offline');
        setShowAlert(true);
      }
    } catch (error) {
      setStatus('offline');
      setShowAlert(true);
    }
  };

  if (!showAlert || status === 'online') {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 ml-2">
          <strong>Backend belum tersedia.</strong> Untuk mengaktifkan fitur autentikasi dan database, 
          deploy Edge Functions dengan menjalankan: <code className="bg-blue-100 px-2 py-1 rounded text-sm">supabase functions deploy server</code>
        </AlertDescription>
      </Alert>
    </div>
  );
}
