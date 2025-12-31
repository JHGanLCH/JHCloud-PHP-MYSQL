
import { NewsItem, ProductItem, CaseItem, TechnicalSpec, IndustryFeature } from '../types';
import { NEWS_DATA, PRODUCTS_DATA, CASE_DATA, TECH_SPECS_DATA, FEATURES_DATA } from '../constants';

// 模拟数据库存储
let newsStore = [...NEWS_DATA];
let productStore = [...PRODUCTS_DATA];
let caseStore = [...CASE_DATA];
let techSpecsStore = [...TECH_SPECS_DATA];
let featuresStore = [...FEATURES_DATA];

let adminUser = {
  username: 'admin',
  password: 'admin'
};

export const mockApi = {
  // 身份验证
  login: async (username: string, psw: string) => {
    return username === adminUser.username && psw === adminUser.password;
  },
  updatePassword: async (oldPsw: string, newPsw: string) => {
    if (oldPsw === adminUser.password) {
      adminUser.password = newPsw;
      return { success: true };
    }
    return { success: false, message: '原密码错误' };
  },

  // 新闻管理
  getNews: async () => {
    return [...newsStore].sort((a, b) => {
      if (a.isSticky && !b.isSticky) return -1;
      if (!a.isSticky && b.isSticky) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  },
  saveNews: async (item: Partial<NewsItem>) => {
    if (item.id) {
      newsStore = newsStore.map(n => n.id === item.id ? { ...n, ...item } : n);
    } else {
      const newItem = { 
        ...item, 
        id: Date.now().toString(), 
        views: 0, 
        date: new Date().toISOString().split('T')[0] 
      } as NewsItem;
      newsStore.push(newItem);
    }
  },
  deleteNews: async (id: string) => {
    newsStore = newsStore.filter(n => n.id !== id);
  },

  // 产品管理
  getProducts: async () => [...productStore],
  saveProduct: async (item: Partial<ProductItem>) => {
    if (item.id) {
      productStore = productStore.map(p => p.id === item.id ? { ...p, ...item } : p);
    } else {
      const newItem = { ...item, id: Date.now().toString() } as ProductItem;
      productStore.push(newItem);
    }
  },
  deleteProduct: async (id: string) => {
    productStore = productStore.filter(p => p.id !== id);
  },

  // 技术说明管理
  getTechSpecs: async () => [...techSpecsStore],
  saveTechSpec: async (item: Partial<TechnicalSpec>) => {
    if (item.id) {
      techSpecsStore = techSpecsStore.map(t => t.id === item.id ? { ...t, ...item } : t);
    } else {
      const newItem = { ...item, id: Date.now().toString() } as TechnicalSpec;
      techSpecsStore.push(newItem);
    }
  },
  deleteTechSpec: async (id: string) => {
    techSpecsStore = techSpecsStore.filter(t => t.id !== id);
  },

  // 行业特色管理
  getFeatures: async () => [...featuresStore],
  saveFeature: async (item: Partial<IndustryFeature>) => {
    if (item.id) {
      featuresStore = featuresStore.map(f => f.id === item.id ? { ...f, ...item } : f);
    } else {
      const newItem = { ...item, id: Date.now().toString() } as IndustryFeature;
      featuresStore.push(newItem);
    }
  },
  deleteFeature: async (id: string) => {
    featuresStore = featuresStore.filter(f => f.id !== id);
  },

  // 案例管理
  getCases: async () => [...caseStore],
  saveCase: async (item: Partial<CaseItem>) => {
    if (item.id) {
      caseStore = caseStore.map(c => c.id === item.id ? { ...c, ...item } : c);
    } else {
      const newItem = { ...item, id: Date.now().toString() } as CaseItem;
      caseStore.push(newItem);
    }
  },
  deleteCase: async (id: string) => {
    caseStore = caseStore.filter(c => c.id !== id);
  }
};
