import React, { useState } from 'react';

interface CloudflareImageGeneratorProps {}

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

const CloudflareImageGenerator: React.FC<CloudflareImageGeneratorProps> = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('يرجى إدخال وصف للصورة');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/cloudflare-image-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'فشل في إنشاء الصورة');
      }

      const data = await response.json();
      
      if (!data.imageUrl) {
        throw new Error('لم يتم إرجاع رابط الصورة');
      }

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: data.imageUrl,
        prompt: prompt.trim(),
        timestamp: new Date(),
      };

      setGeneratedImages(prev => [newImage, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'حدث خطأ غير متوقع في إنشاء الصورة'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (imageUrl: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setGeneratedImages([]);
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          مولد الصور بالذكاء الاصطناعي
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          أنشئ صوراً مذهلة باستخدام نموذج Flux من Cloudflare AI. وصف ما تريده بالتفصيل واحصل على نتيجة مذهلة!
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          وصف الصورة المطلوبة
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثال: منظر طبيعي خلاب بجبال ضخمة وبحيرة صافية في المساء، طابع خيالي"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={3}
          disabled={isGenerating}
        />
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim()}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isGenerating || !prompt.trim()
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري إنشاء الصورة...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>إنشاء الصورة</span>
            </div>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              الصور المُنشأة ({generatedImages.length})
            </h3>
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
            >
              مسح الكل
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedImages.map((image) => (
              <div key={image.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={`Generated: ${image.prompt}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                    {image.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {image.timestamp.toLocaleTimeString('ar-SA')}
                    </span>
                    <button
                      onClick={() => downloadImage(image.url, image.prompt)}
                      className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      تحميل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">نصائح لنتائج أفضل:</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• كن مفصلاً في وصف ما تريده (الألوان، الأسلوب، الإضاءة)</li>
          <li>• حدد الفئة (صورة شخصية، منظر طبيعي، رسم رقمي، إلخ)</li>
          <li>• استخدم كلمات وصفية قوية مثل "واقعي"، "مستقبلي"، "كلاسيكي"</li>
          <li>• ذكر الأسلوب المفضل: "oil painting"، "digital art"، "photography"</li>
        </ul>
      </div>
    </div>
  );
};

export default CloudflareImageGenerator;