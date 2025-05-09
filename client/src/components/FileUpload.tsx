import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onFileChange(null);
      setPreviewUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
      if (fileInputRef.current) {
        // Create a DataTransfer object and add the file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
      onFileChange(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileChange(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Upload Image (Optional)</label>
      <Card 
        className="border-2 border-dashed border-gray-300 rounded-md" 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="p-6 text-center">
          <input 
            type="file" 
            id="fileInput" 
            className="hidden" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {!previewUrl ? (
            <label htmlFor="fileInput" className="cursor-pointer block">
              <span className="material-icons text-gray-400 text-5xl mb-2 block">cloud_upload</span>
              <span className="text-gray-600">Click to upload or drag an image here</span>
              <p className="text-xs text-gray-500 mt-2">Upload an image of your scrap for a more accurate estimate</p>
            </label>
          ) : (
            <div className="mt-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-40 max-w-full mx-auto rounded-md" 
              />
              <div className="mt-2 flex justify-center">
                <button 
                  type="button"
                  onClick={clearImage}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center"
                >
                  <span className="material-icons text-sm mr-1">delete</span>
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUpload;
