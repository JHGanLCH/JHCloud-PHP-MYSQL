
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  views: number;
  isSticky: boolean;
}

export interface CaseItem {
  id: string;
  industry: string;
  title: string;
  logo: string;
  summary: string;
  content: string;
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  name: string;
  shortIntro: string;
  fullIntro: string;
  imageUrl: string;
}

export interface TechnicalSpec {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export interface IndustryFeature {
  id: string;
  title: string;
  content: string;
  type: 'green' | 'blue';
}

export type ProductTab = 'core' | 'tech' | 'feature' | 'case';
