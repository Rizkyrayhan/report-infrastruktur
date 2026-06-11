import { useState } from 'react';

export function useSubmitReport() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const submit = async (data: any) => {
    setIsSubmitting(true);
    // Simulasi API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const fakeId = 'REP-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setSuccessId(fakeId);
    setIsSubmitting(false);
    return fakeId;
  };

  return { submit, isSubmitting, successId };
}
