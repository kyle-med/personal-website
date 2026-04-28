---
title: "Deep Residual Learning for Image Recognition"
date: 2026-04-20
tags: ["深度学习", "计算机视觉", "CNN"]
journal: "CVPR 2016"
authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun"
year: 2016
abstract: "提出残差学习框架，通过恒等映射解决深层网络退化问题，使152层网络在ImageNet上达到3.57%错误率。"
rating: 5
draft: false
---

## 核心问题

深层网络面临梯度消失/爆炸问题，但更重要的是**退化问题（degradation problem）**：随着网络深度增加，准确率趋于饱和后迅速下降，这不是过拟合导致的。

## 关键思路

不再让每层直接学习目标映射 H(x)，而是学习残差 F(x) = H(x) - x。这样：
1. 如果恒等映射是最优的，网络只需要把残差推至零（比拟合恒等映射容易）
2. 短路连接（shortcut connections）让梯度可以直接流过，不衰减

## 实现细节

- **残差块**：两层 3×3 卷积 + BatchNorm + ReLU，输出加上输入 x 再过 ReLU
- **瓶颈块（Bottleneck）**：1×1 降维 → 3×3 → 1×1 升维，减少计算量
- 下采样时 shortcut 用 1×1 卷积匹配维度

## 我的思考

ResNet 的优雅之处在于把问题从"学什么"转化为"学什么增量"。这个范式影响了后续几乎所有架构——DenseNet 把残差做到极致，Transformer 的残差连接也是同一思路。另外，BatchNorm 在残差块里的作用和 LayerNorm 在 Transformer 里的作用有异曲同工之妙，都保证了梯度的稳定流动。
