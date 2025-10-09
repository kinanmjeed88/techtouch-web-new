import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { DownloadIcon, UploadIcon } from './Icons';

interface BackupFileSummary {
    posts: number;
    categories: number;
    settings: boolean;
    profile: boolean;
    fileName: string;
}

const Backup: React.FC = () => {
    const [isBackupLoading, setIsBackupLoading] = useState(false);
    const [backupError, setBackupError] = useState<string | null>(null);
    
    const [isProcessingRestore, setIsProcessingRestore] = useState(false);
    const [fileSummary, setFileSummary] = useState<BackupFileSummary | null>(null);
    const [restoreError, setRestoreError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBackup = async () => {
        setIsBackupLoading(true);
        setBackupError(null);
        try {
            const response = await fetch('/.netlify/functions/backup');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'فشل إنشاء النسخة الاحتياطية.');
            }
            const { filename, data } = await response.json();
            
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
            setBackupError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
        } finally {
            setIsBackupLoading(false);
        }
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsProcessingRestore(true);
        setRestoreError(null);
        setFileSummary(null);

        try {
            if (!file.name.endsWith('.zip')) {
                throw new Error('الملف غير صالح. يرجى رفع ملف ZIP.');
            }

            const zip = await JSZip.loadAsync(file);
            
            let posts = 0;
            let categories = 0;
            let settings = false;
            let profile = false;

            zip.forEach((relativePath) => {
                if (relativePath.startsWith('content/posts/') && relativePath.endsWith('.md')) posts++;
                if (relativePath.startsWith('content/categories/') && relativePath.endsWith('.md')) categories++;
                if (relativePath === 'public/settings.json') settings = true;
                if (relativePath === 'public/profile.json') profile = true;
            });

            if (posts === 0 && categories === 0 && !settings && !profile) {
                throw new Error('ملف النسخة الاحتياطية فارغ أو غير متوافق.');
            }

            setFileSummary({ posts, categories, settings, profile, fileName: file.name });
        } catch (err) {
            setRestoreError(err instanceof Error ? err.message : 'حدث خطأ أثناء معالجة الملف.');
        } finally {
            setIsProcessingRestore(false);
            if (event.target) {
                event.target.value = '';
            }
        }
    };

    const handleResetRestore = () => {
        setFileSummary(null);
        setRestoreError(null);
    };

    return (
        <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-red-400" style={{ color: 'var(--color-primary-focus)' }}>أخذ نسخة احتياطية</h3>
                <p className="text-gray-300 mb-6">
                    انقر على الزر أدناه لإنشاء نسخة احتياطية كاملة من محتوى موقعك. سيتم تنزيل ملف ZIP يحتوي على كل المحتوى المصدر (المنشورات، التصنيفات، الإعدادات).
                </p>
                <div className="text-center">
                    <button
                        onClick={handleBackup}
                        disabled={isBackupLoading}
                        className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isBackupLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <DownloadIcon className="w-5 h-5" />
                        )}
                        <span>{isBackupLoading ? 'جاري الإنشاء...' : 'إنشاء وتنزيل النسخة الاحتياطية'}</span>
                    </button>
                </div>
                {backupError && <p className="mt-4 p-3 rounded-lg bg-red-900/50 text-red-300 text-center w-full">{backupError}</p>}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-red-400" style={{ color: 'var(--color-primary-focus)' }}>استعادة نسخة احتياطية</h3>
                {!fileSummary ? (
                    <>
                        <p className="text-gray-300 mb-6">
                            قم برفع ملف النسخة الاحتياطية (ZIP) هنا للتحقق من محتوياته قبل متابعة عملية الاستعادة.
                        </p>
                        <div 
                            className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 hover:bg-gray-800 transition-colors duration-300"
                            onClick={() => !isProcessingRestore && fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept=".zip"
                                className="hidden"
                                disabled={isProcessingRestore}
                            />
                            {isProcessingRestore ? (
                                <>
                                    <div className="w-8 h-8 border-4 border-gray-500 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-400">جاري معالجة الملف...</p>
                                </>
                            ) : (
                                <>
                                    <UploadIcon className="w-10 h-10 mx-auto text-gray-500 mb-4" />
                                    <p className="font-semibold text-white">انقر هنا أو اسحب ملف الـ ZIP</p>
                                    <p className="text-sm text-gray-400 mt-1">لفحص محتوياته</p>
                                </>
                            )}
                        </div>
                        {restoreError && <p className="mt-4 p-3 rounded-lg bg-red-900/50 text-red-300 text-center w-full">{restoreError}</p>}
                    </>
                ) : (
                    <div className="animate-fadeIn">
                        <h4 className="font-semibold text-lg text-green-400 mb-3">تم التحقق من ملف النسخة الاحتياطية بنجاح!</h4>
                        <div className="bg-gray-900/50 p-4 rounded-md mb-6 border border-gray-600">
                            <p className="text-gray-300 font-semibold mb-3">تم العثور على المحتويات التالية في ملف `{fileSummary.fileName}`:</p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
                                <li>{fileSummary.posts} منشورات</li>
                                <li>{fileSummary.categories} تصنيفات</li>
                                {fileSummary.settings && <li>ملف إعدادات الموقع</li>}
                                {fileSummary.profile && <li>ملف الملف الشخصي</li>}
                            </ul>
                        </div>

                        <h4 className="font-semibold text-lg text-gray-200 mb-3">خطوات إكمال الاستعادة:</h4>
                        <ol className="list-decimal list-inside space-y-3 text-gray-400 mb-6">
                            <li>قم بفك ضغط ملف الـ ZIP الذي قمت بتحميله.</li>
                            <li>ستجد مجلدين: `content` و `public`.</li>
                            <li>قم بنسخ هذين المجلدين إلى المجلد الرئيسي لمشروعك في Git، ووافق على استبدال الملفات.</li>
                            <li>قم بعمل commit و push للتغييرات إلى المستودع الخاص بك.</li>
                            <li>سيقوم Netlify بإعادة نشر الموقع تلقائياً، وبعدها ستظهر جميع المنشورات المستعادة.</li>
                        </ol>

                        <p className="mt-4 text-sm text-yellow-400 bg-yellow-900/30 p-3 rounded-lg">
                            <strong>تحذير:</strong> استعادة نسخة قديمة سيؤدي إلى حذف أي تغييرات قمت بها بعد تاريخ أخذ تلك النسخة.
                        </p>

                        <div className="text-center mt-6">
                            <button
                                onClick={handleResetRestore}
                                className="text-white font-bold py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
                            >
                                رفع ملف آخر
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Backup;