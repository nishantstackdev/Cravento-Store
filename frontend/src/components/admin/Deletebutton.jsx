import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { notify } from '../../helper/helper';

export default function DeleteButton({ apiFunction, id, itemName, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePurge = async () => {
    const confirmDelete = window.confirm(
      `ARE YOU SURE YOU WANT TO DELETE "${itemName.toUpperCase()}"?`
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true); //
      
      
      const response = await apiFunction(id);
      
      if (response.success) {
        notify(response.message || "Record purged successfully.", true);
        
        
        if (onSuccess) onSuccess(id);
      }
    } catch (error) {
      console.error("Purge system failure:", error);
      const errorMsg = error?.message || "Internal network pipe error during deletion.";
      notify(errorMsg, false);
    } finally {
      setIsDeleting(false); 
    }
  };

  return (
    <button
      onClick={handlePurge}
      disabled={isDeleting}
      title={`Delete ${itemName}`}
      className={`p-2 text-rose-500 hover:text-rose-600 border border-rose-50 dark:border-rose-900/30 hover:bg-rose-50/50 dark:hover:bg-rose-950/50 rounded-xl transition-all shadow-sm ${
        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isDeleting ? (
        
        <div className="w-3.5 h-3.5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
}