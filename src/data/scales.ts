export interface Scale {
  slug: string;
  title: string;
  specialty: string;
  description: string;
}

export const specialties = [
  '呼吸',
  '心血管',
  '消化',
  '泌尿',
  '血液',
  '风湿免疫',
  '危重病',
  '理化因素所致疾病',
] as const;

export type Specialty = (typeof specialties)[number];

export const scales: Scale[] = [
  {
    slug: 'gcs-coma-scale',
    title: 'GCS 昏迷评分',
    specialty: '危重病',
    description:
      '格拉斯哥昏迷评分（Glasgow Coma Scale），用于评估患者意识障碍程度，从睁眼、语言、运动三个维度评分，总分 3–15 分。',
  },
  {
    slug: 'rifle-aki',
    title: 'RIFLE 急性肾损伤分期',
    specialty: '泌尿',
    description:
      'RIFLE 标准将 AKI 分为 Risk、Injury、Failure、Loss、ESRD 五级，基于血清肌酐变化和尿量两个维度，取较重者分期。',
  },
];
