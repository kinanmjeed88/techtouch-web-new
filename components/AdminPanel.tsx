import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, CogIcon, XIcon } from './Icons';
import { App } from './AppCard';

interface Category {
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

interface AppsData {
  categories: { [key: string]: Category };
  apps: App[];
}

const AdminPanel: React.FC = () => {
  const [appsData, setAppsData] = useState<AppsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    link: '',
    category: 'iptv',
    keywords: '',
    description: '',
    featured: false,
  });

  // تحميل قاعدة البيانات
  useEffect(() => {
    const loadApps = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/apps_database.json');
        if (!response.ok) {
          throw new Error('فشل تحميل قاعدة البيانات');
        }
        const data: AppsData = await response.json();
        setAppsData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف');
        setIsLoading(false);
      }
    };

    loadApps();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      link: '',
      category: 'iptv',
      keywords: '',
      description: '',
      featured: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddApp = () => {
    if (!appsData) return;

    // التحقق من صحة البيانات
    if (!formData.name || !formData.nameAr || !formData.link) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newApp: App = {
      id: Math.max(...appsData.apps.map(app => app.id), 0) + 1,
      name: formData.name,
      nameAr: formData.nameAr,
      link: formData.link,
      category: formData.category,
      keywords: formData.keywords.split(',').map(k => k.trim()),
      description: formData.description,
      featured: formData.featured,
    };

    const updatedData = {
      ...appsData,
      apps: [...appsData.apps, newApp],
    };

    setAppsData(updatedData);
    
    // حفظ في localStorage
    localStorage.setItem('apps_database', JSON.stringify(updatedData));
    
    setShowAddModal(false);
    resetForm();
    showSuccess('تم إضافة التطبيق بنجاح');
  };

  const handleEditApp = (app: App) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      nameAr: app.nameAr,
      link: app.link,
      category: app.category,
      keywords: app.keywords.join(', '),
      description: app.description,
      featured: app.featured || false,
    });
    setShowEditModal(true);
  };

  const handleUpdateApp = () => {
    if (!appsData || !editingApp) return;

    // التحقق من صحة البيانات
    if (!formData.name || !formData.nameAr || !formData.link) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const updatedApps = appsData.apps.map(app =>
      app.id === editingApp.id
        ? {
            ...app,
            name: formData.name,
            nameAr: formData.nameAr,
            link: formData.link,
            category: formData.category,
            keywords: formData.keywords.split(',').map(k => k.trim()),
            description: formData.description,
            featured: formData.featured,
          }
        : app
    );

    const updatedData = {
      ...appsData,
      apps: updatedApps,
    };

    setAppsData(updatedData);
    
    // حفظ في localStorage
    localStorage.setItem('apps_database', JSON.stringify(updatedData));
    
    setShowEditModal(false);
    setEditingApp(null);
    resetForm();
    showSuccess('تم تحديث التطبيق بنجاح');
  };

  const handleDeleteApp = (appId: number) => {
    if (!appsData) return;
    
    if (!confirm('هل أنت متأكد من حذف هذا التطبيق؟')) {
      return;
    }

    const updatedApps = appsData.apps.filter(app => app.id !== appId);
    const updatedData = {
      ...appsData,
      apps: updatedApps,
    };

    setAppsData(updatedData);
    
    // حفظ في localStorage
    localStorage.setItem('apps_database', JSON.stringify(updatedData));
    
    showSuccess('تم حذف التطبيق بنجاح');
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleExportData = () => {
    if (!appsData) return;
    
    const dataStr = JSON.stringify(appsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'apps_database_backup.json';
    link.click();
    URL.revokeObjectURL(url);
    
    showSuccess('تم تصدير البيانات بنجاح');
  };

  if (isLoading) {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">لوحة تحكم الأدمن</h2>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">لوحة تحكم الأدمن</h2>
        <div className="text-center py-20">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* رسالة النجاح */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
          {successMessage}
        </div>
      )}

      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CogIcon className="w-8 h-8 text-red-400" />
          <h2 className="text-3xl font-bold">لوحة تحكم الأدمن</h2>
        </div>
        <p className="text-gray-400 text-lg">إدارة التطبيقات وقاعدة البيانات</p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h3 className="text-lg font-semibold mb-2">إجمالي التطبيقات</h3>
          <p className="text-4xl font-bold">{appsData?.apps.length || 0}</p>
        </div>
        
        <div className="p-6 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <h3 className="text-lg font-semibold mb-2">التطبيقات المميزة</h3>
          <p className="text-4xl font-bold">
            {appsData?.apps.filter(app => app.featured).length || 0}
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h3 className="text-lg font-semibold mb-2">عدد الفئات</h3>
          <p className="text-4xl font-bold">
            {Object.keys(appsData?.categories || {}).length}
          </p>
        </div>
      </div>

      {/* أزرار العمليات */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:scale-105 transition-transform duration-300 font-bold"
        >
          <PlusIcon className="w-5 h-5" />
          إضافة تطبيق جديد
        </button>
        
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:scale-105 transition-transform duration-300 font-bold"
        >
          تصدير البيانات
        </button>
      </div>

      {/* قائمة التطبيقات */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">قائمة التطبيقات</h3>
        
        {appsData?.apps.map(app => (
          <div
            key={app.id}
            className="p-4 rounded-lg bg-gray-800 border border-gray-700 hover:border-red-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-bold text-white">{app.nameAr}</h4>
                  {app.featured && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500 text-white">
                      مميز
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-2">{app.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>الفئة: {appsData.categories[app.category]?.name}</span>
                  <span>ID: {app.id}</span>
                  <span>الكلمات المفتاحية: {app.keywords.length}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditApp(app)}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                  title="تعديل"
                >
                  <EditIcon className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => handleDeleteApp(app.id)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                  title="حذف"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal إضافة تطبيق */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">إضافة تطبيق جديد</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الاسم بالإنجليزية *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الاسم بالعربية *
                </label>
                <input
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  style={{ direction: 'rtl' }}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الرابط *
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الفئة *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                >
                  {appsData &&
                    Object.entries(appsData.categories).map(([key, cat]) => (
                      <option key={key} value={key}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  rows={3}
                  style={{ direction: 'rtl' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الكلمات المفتاحية (مفصولة بفاصلة)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  placeholder="مثال: iptv, streaming, بث مباشر"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
                />
                <label className="text-sm font-semibold text-gray-300">
                  تطبيق مميز
                </label>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleAddApp}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:scale-105 transition-transform duration-300 font-bold"
              >
                إضافة التطبيق
              </button>
              
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal تعديل تطبيق */}
      {showEditModal && editingApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">تعديل التطبيق</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingApp(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الاسم بالإنجليزية *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الاسم بالعربية *
                </label>
                <input
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  style={{ direction: 'rtl' }}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الرابط *
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الفئة *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                >
                  {appsData &&
                    Object.entries(appsData.categories).map(([key, cat]) => (
                      <option key={key} value={key}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  rows={3}
                  style={{ direction: 'rtl' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  الكلمات المفتاحية (مفصولة بفاصلة)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                  placeholder="مثال: iptv, streaming, بث مباشر"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
                />
                <label className="text-sm font-semibold text-gray-300">
                  تطبيق مميز
                </label>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleUpdateApp}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform duration-300 font-bold"
              >
                حفظ التعديلات
              </button>
              
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingApp(null);
                  resetForm();
                }}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
