export interface Lab {
  name: string;
  value: string;
  ref: string;
  flag: 'normal' | 'high' | 'low';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  dept: string;
  status: string;
  risk: 'high' | 'mid' | 'low';
  doctor: string;
  admitted: string;
  allergy: string;
  vitals: { hr: number; spo2: number; temp: number; sbp: number };
  visits: { color: 'cyan' | 'amber' | 'success'; time: string; text: string }[];
  labs: Lab[];
}

export const PATIENTS: Patient[] = [
  {
    id: 'P-1024', name: '张伟', age: 56, dept: '心内科', status: '住院', risk: 'high', doctor: '陈医生', admitted: '06-22', allergy: '青霉素',
    vitals: { hr: 96, spo2: 95, temp: 37.6, sbp: 148 },
    visits: [
      { color: 'cyan', time: '今天 09:20', text: '查房 · 心率偏快，调整用药' },
      { color: 'amber', time: '昨天 16:00', text: '心电监护异常预警' },
      { color: 'success', time: '06-22', text: '入院评估完成' },
    ],
    labs: [
      { name: '肌钙蛋白 I', value: '0.08', ref: '<0.04 ng/mL', flag: 'high' },
      { name: '血钾', value: '4.2', ref: '3.5–5.5 mmol/L', flag: 'normal' },
      { name: 'BNP', value: '420', ref: '<100 pg/mL', flag: 'high' },
    ],
  },
  {
    id: 'P-1025', name: '李娜', age: 34, dept: '内分泌', status: '门诊', risk: 'low', doctor: '王医生', admitted: '06-26', allergy: '无',
    vitals: { hr: 72, spo2: 99, temp: 36.6, sbp: 118 },
    visits: [
      { color: 'cyan', time: '今天 10:10', text: '复诊 · 血糖控制良好' },
      { color: 'success', time: '06-26', text: '初诊建档' },
    ],
    labs: [
      { name: '空腹血糖', value: '5.4', ref: '3.9–6.1 mmol/L', flag: 'normal' },
      { name: '糖化血红蛋白', value: '5.8', ref: '<6.5 %', flag: 'normal' },
    ],
  },
  {
    id: 'P-1026', name: '王芳', age: 68, dept: '呼吸科', status: '住院', risk: 'mid', doctor: '李医生', admitted: '06-20', allergy: '头孢',
    vitals: { hr: 84, spo2: 92, temp: 38.1, sbp: 132 },
    visits: [
      { color: 'amber', time: '今天 08:40', text: '雾化治疗 · 血氧偏低' },
      { color: 'cyan', time: '昨天 14:00', text: '胸片复查' },
      { color: 'success', time: '06-20', text: '入院' },
    ],
    labs: [
      { name: 'CRP', value: '36', ref: '<10 mg/L', flag: 'high' },
      { name: '白细胞', value: '11.2', ref: '4–10 ×10⁹', flag: 'high' },
      { name: '血氧饱和度', value: '92', ref: '95–100 %', flag: 'low' },
    ],
  },
  {
    id: 'P-1027', name: '刘强', age: 41, dept: '消化科', status: '观察', risk: 'low', doctor: '赵医生', admitted: '06-25', allergy: '无',
    vitals: { hr: 76, spo2: 98, temp: 36.9, sbp: 122 },
    visits: [
      { color: 'cyan', time: '今天 11:00', text: '胃镜检查' },
      { color: 'success', time: '06-25', text: '观察入院' },
    ],
    labs: [{ name: '肝功能 ALT', value: '32', ref: '7–40 U/L', flag: 'normal' }],
  },
];

export const FLAG: Record<Lab['flag'], { v: 'default' | 'danger' | 'amber'; t: string }> = {
  normal: { v: 'default', t: '正常' },
  high: { v: 'danger', t: '偏高' },
  low: { v: 'amber', t: '偏低' },
};
