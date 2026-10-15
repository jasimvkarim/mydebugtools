'use client';

import { useState, useRef } from 'react';
import { 
  ArrowsRightLeftIcon,
  ClipboardIcon, 
  ArrowDownTrayIcon,
  PhotoIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function Base64Tools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversionMode, setConversionMode] = useState<'encode' | 'decode'>('encode');
  const [fileType, setFileType] = useState<'image' | 'pdf' | 'text'>('text');
  const [copySuccess, setCopySuccess] = useState(false);
  const [decodedText, setDecodedText] = useState('');
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanBase64 = (value: string): string => {
    let cleaned=value.trim().replace(/^data:[^,]*;base64,/i,'').replace(/\s/g,'');
    if(!cleaned || !/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned) || cleaned.length%4===1 || (cleaned.includes('=')&&cleaned.length%4!==0)) {
      throw new Error('This is not valid Base64. Check the input, or switch to Encode for plain text.');
    }
    if(cleaned.length%4) cleaned+='='.repeat(4-cleaned.length%4);
    return cleaned;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError('');

      if (fileType === 'image' && !file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }
      if (fileType === 'pdf' && file.type !== 'application/pdf') {
        throw new Error('Please upload a PDF file');
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const base64String = result.split(',')[1];
        setOutput(base64String);
        setInput(result);
        
        if (fileType === 'image') {
          setIsImage(true);
          setIsPdf(false);
        } else {
          setIsImage(false);
          setIsPdf(true);
        }
        setIsLoading(false);
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setIsLoading(false);
    }
  };

  const decodeBase64 = () => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!input.trim()) {
        setError('Please enter a Base64 string');
        setIsLoading(false);
        return;
      }

      const cleanedInput = cleanBase64(input);
      
      if (fileType === 'text') {
        // Decode to plain text
        try {
          const bytes = Uint8Array.from(atob(cleanedInput), c=>c.charCodeAt(0));
          const decodedString = new TextDecoder('utf-8',{fatal:true}).decode(bytes);
          setDecodedText(decodedString);
          setOutput(decodedString);
          setIsImage(false);
          setIsPdf(false);
          setError('');
          setIsLoading(false);
        } catch (err) {
          setError('Invalid Base64 string. Make sure it represents valid text data.');
          setOutput('');
          setDecodedText('');
          setIsImage(false);
          setIsPdf(false);
          setIsLoading(false);
        }
      } else if (fileType === 'image') {
        // Try to detect image type from the decoded data
        const detectImageType = (base64: string): string => {
          // Decode first few bytes to check magic numbers
          try {
            const decoded = atob(base64.substring(0, 20));
            const bytes = new Uint8Array([...decoded].map(c => c.charCodeAt(0)));
            
            // PNG: 89 50 4E 47
            if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
              return 'image/png';
            }
            // JPEG: FF D8 FF
            if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
              return 'image/jpeg';
            }
            // GIF: 47 49 46
            if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
              return 'image/gif';
            }
            // WebP: 52 49 46 46 (RIFF)
            if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
              return 'image/webp';
            }
            // SVG: <svg or <?xml
            if (decoded.includes('<svg') || decoded.includes('<?xml')) {
              return 'image/svg+xml';
            }
            // Default to PNG
            return 'image/png';
          } catch {
            return 'image/png';
          }
        };

        const mimeType = detectImageType(cleanedInput);
        const imageData = `data:${mimeType};base64,${cleanedInput}`;
        const img = new window.Image();
        
        img.onload = () => {
          setOutput(imageData);
          setIsImage(true);
          setIsPdf(false);
          setError('');
          setIsLoading(false);
        };
        
        img.onerror = () => {
          setError('Invalid image Base64 data. Make sure the Base64 string represents a valid image.');
          setOutput('');
          setIsImage(false);
          setIsPdf(false);
          setIsLoading(false);
        };
        
        img.src = imageData;
      } else {
        const pdfData = `data:application/pdf;base64,${cleanedInput}`;
        setOutput(pdfData);
        setIsPdf(true);
        setIsImage(false);
        setError('');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decode Base64');
      setOutput('');
      setIsImage(false);
      setIsPdf(false);
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      const textToCopy = output;
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError('Could not copy. Select the output text and copy it manually.');
    }
  };

  const downloadFile = () => {
    if (!output) return;
    
    const link = document.createElement('a');
    
    if (conversionMode === 'encode' || fileType === 'text') {
      const blob = new Blob([output], { type: 'text/plain' });
      link.href = URL.createObjectURL(blob);
      link.download = conversionMode === 'encode' ? 'base64-output.txt' : 'decoded-text.txt';
    } else {
      link.href = output;
      link.download = `converted-file.${isPdf ? 'pdf' : 'png'}`;
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setInput('');
    setTextInput('');
    setOutput('');
    setError('');
    setIsImage(false);
    setIsPdf(false);
    setDecodedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const switchMode = () => {
    setConversionMode(prev => {
      const nextMode = prev === 'encode' ? 'decode' : 'encode';
      setFileType('text');
      return nextMode;
    });
    clearAll();
  };

  return (
    <div className="min-h-[620px] flex flex-col bg-white">
      <div className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Base64 Converter</h1>
            <p className="text-sm text-gray-500 mt-1">
              {conversionMode === 'encode' ? 'Paste text to encode it instantly, or choose a file.' : 'Paste Base64 to get readable text or a file.'}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={switchMode}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              title="Switch conversion mode"
            >
              <ArrowsRightLeftIcon className="h-4 w-4" />
              {conversionMode === 'encode' ? 'Switch to Decode' : 'Switch to Encode'}
            </button>
            
            {output && (
              <>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  title="Copy to clipboard"
                >
                  {copySuccess ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardIcon className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
                
                <button
                  onClick={downloadFile}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  title="Download"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Download
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {error && <div role="alert" className="px-4 py-3 text-sm text-red-600 bg-red-50">{error}</div>}
      <div className="px-4 py-2 flex flex-wrap gap-4 text-sm">
        <button onClick={()=>{clearAll();setFileType('text');if(conversionMode==='encode'){setTextInput('Hello, world!');setOutput('SGVsbG8sIHdvcmxkIQ==')}else{setInput('SGVsbG8sIHdvcmxkIQ==')}}}>Try an example</button>
        <button onClick={clearAll}>Clear input</button>
        <span className="text-gray-500">Processed in your browser</span>
      </div>
      <div className="flex-1 flex flex-col md:flex-row min-w-0">
        <div className="flex-1 min-w-0 flex flex-col md:border-r border-gray-200">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-medium text-gray-700">
                {conversionMode === 'encode' ? (fileType === 'text' ? 'Text input' : 'Upload file') : 'Base64 input'}
              </h2>
              
              {conversionMode === 'encode' && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => { clearAll(); setFileType('text'); }}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      fileType === 'text'
                        ? 'bg-[#FF6C37] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <DocumentIcon className="h-3.5 w-3.5" />
                    Text
                  </button>
                  <button
                    onClick={() => { clearAll(); setFileType('image'); }}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      fileType === 'image'
                        ? 'bg-[#FF6C37] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <PhotoIcon className="h-3.5 w-3.5" />
                    Image
                  </button>
                  <button
                    onClick={() => { clearAll(); setFileType('pdf'); }}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      fileType === 'pdf'
                        ? 'bg-[#FF6C37] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <DocumentIcon className="h-3.5 w-3.5" />
                    PDF
                  </button>
                </div>
              )}
              
              {conversionMode === 'decode' && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => { clearAll(); setFileType('text'); }}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      fileType === 'text'
                        ? 'bg-[#FF6C37] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <DocumentIcon className="h-3.5 w-3.5" />
                    Text
                  </button>
                  <button
                    onClick={() => { clearAll(); setFileType('image'); }}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      fileType === 'image'
                        ? 'bg-[#FF6C37] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <PhotoIcon className="h-3.5 w-3.5" />
                    Image
                  </button>
                  <button
                    onClick={() => { clearAll(); setFileType('pdf'); }}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      fileType === 'pdf'
                        ? 'bg-[#FF6C37] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <DocumentIcon className="h-3.5 w-3.5" />
                    PDF
                  </button>
                  <button
                    onClick={decodeBase64}
                    className="px-3 py-1.5 text-xs font-medium bg-[#FF6C37] text-white rounded hover:bg-[#ff5722] transition-colors"
                  >
                    Decode
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-h-[260px] overflow-auto p-4">
            {conversionMode === 'encode' && fileType === 'text' ? (
              <textarea
                aria-label="Text to encode"
                value={textInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setTextInput(v);
                  setError('');
                  setIsImage(false);
                  setIsPdf(false);
                  try {
                    setOutput(v ? btoa(unescape(encodeURIComponent(v))) : '');
                  } catch {
                    setError('Failed to encode text');
                  }
                }}
                placeholder="Type or paste plain text here to encode it as Base64..."
                className="w-full min-h-[220px] h-full p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF6C37] focus:border-[#FF6C37] resize-none"
              />
            ) : conversionMode === 'encode' ? (
              <div className="h-full flex items-center justify-center">
                {input ? (
                  <div className="w-full h-full flex flex-col">
                    <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      {isImage ? (
                        <img 
                          src={input}
                          alt="Uploaded" 
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : isPdf ? (
                        <iframe
                          src={input}
                          title="PDF Preview"
                          className="w-full h-full rounded"
                        />
                      ) : null}
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        Change File
                      </button>
                      <button
                        onClick={clearAll}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#FF6C37] transition-colors">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-full bg-white border border-gray-200">
                        <ArrowUpTrayIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">
                          Click to upload {fileType === 'image' ? 'an image' : 'a PDF'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {fileType === 'image' ? 'PNG, JPG, GIF, SVG' : 'PDF files only'}
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={fileType === 'image' ? 'image/*' : fileType === 'text' ? 'text/*' : 'application/pdf'}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ) : (
              <textarea
                aria-label="Base64 to decode"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your Base64 encoded string here..."
                className="w-full min-h-[220px] h-full p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF6C37] focus:border-[#FF6C37] resize-none"
              />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-medium text-gray-700">
                {conversionMode === 'encode' ? 'Base64 Output' : 'Decoded Preview'}
              </h2>
              

            </div>
          </div>
          
          <div className="flex-1 min-h-[260px] overflow-auto p-4">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#FF6C37]"></div>
                  Processing...
                </div>
              </div>
            ) : output ? (
              conversionMode === 'encode' ? (
                <div className="h-full">
                  <textarea
                    aria-label="Conversion output"
                    value={output}
                    readOnly
                    className="w-full min-h-[220px] h-full p-4 font-mono text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF6C37] focus:border-[#FF6C37] resize-none"
                  />
                </div>
              ) : (
                <div className="h-full">
                  {fileType === 'text' ? (
                    <textarea
                      aria-label="Decoded text"
                      value={output}
                      readOnly
                      className="w-full min-h-[220px] h-full p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF6C37] focus:border-[#FF6C37] resize-none"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      {isImage ? (
                        <img 
                          src={output}
                          alt="Decoded" 
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : isPdf ? (
                        <iframe
                          src={output}
                          title="PDF Preview"
                          className="w-full h-full rounded"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <PhotoIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {conversionMode === 'encode' ? 'Base64 output will appear here' : 'Preview will appear here'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
