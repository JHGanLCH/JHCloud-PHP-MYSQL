
import { NewsItem, CaseItem, ProductItem, TechnicalSpec, IndustryFeature } from './types';

export const COMPANY_NAME = "北京嘉禾云网科技有限公司";
export const COMPANY_INTRO = "北京嘉禾云网科技有限公司是全球领先的智能制造 AI 解决方案提供商。公司以“AI 驱动制造、智慧赋能企业”为核心愿景，致力于研发基于大规模工业参数预训练的下一代制造执行系统。我们运用先进的生成式 AI、数字孪生与边缘计算技术，重塑企业生产、质量预测与供应链协同流程。核心团队由清华、北大等名校 AI 博士与深耕制造业十余年的领域专家组成，旨在通过自研的“嘉禾工业大模型”推动中国制造业实现跨越式的智慧化升级。";

export const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: '嘉禾云网发布“嘉禾智脑1.0”：首个面向制造业的工业大模型',
    date: '2025-01-10',
    summary: '该模型具备理解复杂工艺流程、自动生成生产计划及实时预测设备健康状态的能力...',
    content: '<h1>引领工业 AI 新纪元</h1><p>嘉禾云网正式发布“嘉禾智脑1.0”。该产品不仅是简单的软件升级，更是制造逻辑的重构。通过对数十万台工业设备运行数据的深度学习，模型可以实现毫秒级的异常检测。</p><img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" alt="AI Logic" class="w-full rounded-2xl shadow-lg my-6" />',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    views: 3420,
    isSticky: true
  },
  {
    id: '2',
    title: 'AI 驱动的预测性维护系统在某航天基地成功上线',
    date: '2024-12-15',
    summary: '系统成功预警了某核心设备的轴承损毁，为客户节省停机损失近千万元...',
    content: '<p>通过部署嘉禾云网的 AI 预测性维护模块，客户实现了从“坏了再修”到“预测先修”的转变。该模块基于 LSTM 网络模型，对振动信号进行 24 小时监控。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    views: 1560,
    isSticky: false
  },
  {
    id: '3',
    title: '嘉禾云网荣获“2024年度工业 AI 创新领军企业”称号',
    date: '2024-11-20',
    summary: '凭借在生成式 AI 与工业互联网领域的深厚积淀，公司在年度工业峰会上斩获殊荣...',
    content: '<p>在近日举行的全国工业数字化转型峰会上，嘉禾云网凭借其独创的工业大模型技术路线，赢得了专家评审的一致认可。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    views: 1280,
    isSticky: false
  },
  {
    id: '4',
    title: '5G + AI：嘉禾云网助力离散制造实现秒级生产调度',
    date: '2024-10-05',
    summary: '新一代 iMES 系统集成 5G 切片技术，大幅降低了生产环节间的通讯时延...',
    content: '<p>通过 5G 高可靠、低时延的特性，嘉禾云网的调度引擎可以实时获取生产线每一个工位的精确状态，并进行分钟级的排产更新。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
    views: 940,
    isSticky: false
  },
  {
    id: '5',
    title: '技术深度：如何利用数字孪生构建智慧车间的“数字基座”',
    date: '2024-09-12',
    summary: '嘉禾云网 CTO 深度解析数字孪生技术在复杂制造环境下的应用实践与未来趋势...',
    content: '<p>数字孪生不只是 3D 模型，更是包含物理属性、逻辑关系与实时数据的活体镜像。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    views: 2100,
    isSticky: false
  },
  {
    id: '6',
    title: '嘉禾云网加入中国智能制造联盟，共建行业数据标准',
    date: '2024-08-30',
    summary: '作为理事单位，公司将主导工业边缘侧数据采集与交互接口标准的制定工作...',
    content: '<p>统一的标准是互联互通的前提。嘉禾云网致力于消除工业软件间的信息孤岛。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=800',
    views: 860,
    isSticky: false
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'p1',
    name: 'AIoT 智能联接中台',
    shortIntro: '具备边缘 AI 计算能力的工业物联网系统，支持视觉识别与异常侦测。',
    fullIntro: '<p>不仅仅是数据采集，每一台接入的网关都具备边缘算力。支持现场级的 AI 模型推理，在断网状态下依然可以保证生产安全。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'p2',
    name: 'iMES AI 制造大脑',
    shortIntro: '自进化排产算法，通过强化学习不断优化工厂生产效率。',
    fullIntro: '<p>传统的 MES 是死板的规则引擎，而 iMES 3.0 是自进化的。它会根据真实生产反馈不断调整其决策模型，实现真正的智慧生产。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600'
  }
];

export const TECH_SPECS_DATA: TechnicalSpec[] = [
  {
    id: 't1',
    title: '嘉禾工业大模型 (JH-LLM)',
    content: '我们自研的工业大模型拥有 700 亿参数，专为制造业多模态数据设计，能够精准解析 G 代码、PLC 梯形图及生产日报。',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200'
  }
];

export const FEATURES_DATA: IndustryFeature[] = [
  {
    id: 'f1',
    title: '生成式工艺优化',
    content: '通过生成式 AI，系统可根据最终产品的质量要求，反向生成最佳的生产工艺参数组合。',
    type: 'green'
  }
];

export const CASE_DATA: CaseItem[] = [
  {
    id: 'c1',
    industry: '航天领域',
    title: '航天科工某部 AI 数字化车间',
    logo: 'https://picsum.photos/seed/aero/100/100',
    summary: '利用计算机视觉 AI 实现了 100% 的装配缺陷自动检测。',
    content: '<p>该项目集成了高精度视觉侦测系统，AI 模型识别准确率达到 99.99%，彻底取代了人工目检环节。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800'
  }
];

export const TRIAL_LINK = "http://210.12.53.106:97/";
