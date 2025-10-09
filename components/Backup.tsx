import React, { useState } from 'react';
import { DownloadIcon } from './Icons';

const Backup: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBackup = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/.netlify/functions/backup');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'فشل إنشاء النسخة الاحتياطية.');
            }
            const { filename, data } = await response.json();
            
            // Decode base64 and trigger download
            const byteCharacters = atob(data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/zip' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

        } catch (err) {
            console.error('Backup failed:', err);
            setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-red-400" style={{ color: 'var(--color-primary-focus)' }}>أخذ نسخة احتياطية</h3>
                <p className="text-gray-300 mb-4">
                    انقر على الزر أدناه لإنشاء نسخة احتياطية كاملة من محتوى موقعك. سيتم تنزيل ملف ZIP يحتوي على كل المحتوى المصدر.
                </p>
                <div className="bg-gray-900/50 p-4 rounded-md mb-6 border border-gray-600">
                    <p className="text-gray-300 font-semibold mb-3">النسخة الاحتياطية تشمل:</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
                        <li>جميع المنشورات (ملفات Markdown)</li>
                        <li>جميع التصنيفات (ملفات Markdown)</li>
                        <li>إعدادات الموقع العامة (ملف settings.json)</li>
                        <li>بيانات الملف الشخصي (ملف profile.json)</li>
                    </ul>
                </div>
                <div className="text-center">
                    <button
                        onClick={handleBackup}
                        disabled={isLoading}
                        className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <DownloadIcon className="w-5 h-5" />
                        )}
                        <span>{isLoading ? 'جاري الإنشاء...' : 'إنشاء وتنزيل النسخة الاحتياطية'}</span>
                    </button>
                </div>
                {error && <p className="mt-4 p-3 rounded-lg bg-red-900/50 text-red-300 text-center w-full">{error}</p>}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-red-400" style={{ color: 'var(--color-primary-focus)' }}>استعادة نسخة احتياطية</h3>
                <p className="text-gray-300 mb-4">
                    للاستعادة من نسخة احتياطية، يجب رفع الملفات يدوياً إلى مستودع المشروع على Git. هذه عملية حساسة وتتطلب معرفة تقنية.
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-400">
                    <li>قم بفك ضغط ملف الـ ZIP الذي قمت بتنزيله.</li>
                    <li>ستجد مجلدين: `content` و `public`.</li>
                    <li>قم بنسخ هذين المجلدين إلى المجلد الرئيسي لمشروعك، ووافق على استبدال الملفات والمجلدات الموجودة.</li>
                    <li>بعد رفع الملفات، يجب إعادة نشر الموقع (redeploy) لتظهر التغييرات.</li>
                </ol>
                <p className="mt-4 text-sm text-yellow-400 bg-yellow-900/30 p-3 rounded-lg">
                    <strong>تحذير:</strong> استعادة نسخة قديمة سيؤدي إلى حذف أي تغييرات قمت بها بعد تاريخ أخذ تلك النسخة. إذا لم تكن متأكداً، يرجى التواصل مع مطور الموقع للمساعدة.
                </p>
            </div>
        </div>
    );
};

export default Backup;