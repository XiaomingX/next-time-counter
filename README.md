# next-time-counter ⏱️

一个基于 Next.js 和 TypeScript 实现的在线倒计时秒表演示（Demo），支持毫秒级精确倒计时显示。

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![License](https://img.shields.io/badge/license-Apache--2.0-blue)

## 项目简介

本项目演示如何用 Next.js 搭建一个高精度的倒计时秒表页面，毫秒级实时刷新，支持流畅视觉效果。适合作为计时器、倒计时工具的前端实现范例，方便二次开发扩展。

- 使用 React Hook 和 `requestAnimationFrame` 保证高精度和高性能
- 基于 `performance.now()` 实现毫秒级时间计算
- TypeScript 编写，类型安全，代码易维护
- 简洁现代的UI设计

## 目录结构

```
next-time-counter/
├── app/                # Next.js App路由目录（Next.js 13+风格）
│   └── page.tsx        # 主要倒计时组件页面
├── public/             # 静态资源
├── styles/             # CSS样式
├── package.json        # 项目依赖描述
└── README.md           # 项目说明文档（当前文件）
```

## 快速开始

### 安装依赖

```
npm install
# 或者使用 yarn
yarn
```

### 本地开发

```
npm run dev
# 或
yarn dev
```

默认访问 [http://localhost:3000](http://localhost:3000) 预览倒计时秒表页面。

### 生产部署

构建项目：

```
npm run build
```

启动项目：

```
npm start
```

## 功能亮点

- 精确到毫秒的倒计时
- 流畅的动画更新
- 支持自定义倒计时时长（可在源码中调节）
- 简单易用，方便扩展新功能（例如暂停、重置）

## 代码示例

倒计时核心代码来自 `app/page.tsx`，示例：

```
const countdownTime = 10000; // 10秒

const [timeLeft, setTimeLeft] = useState<number>(countdownTime);
const startTimeRef = useRef<number | null>(null);

useEffect(() => {
  startTimeRef.current = performance.now();
  // 通过 requestAnimationFrame 循环更新状态实现高精度倒计时
  const tick = () => {
    const now = performance.now();
    const elapsed = now - (startTimeRef.current ?? 0);
    const remaining = countdownTime - elapsed;
    if (remaining > 0) {
      setTimeLeft(remaining);
      requestAnimationFrame(tick);
    } else {
      setTimeLeft(0);
    }
  };
  requestAnimationFrame(tick);
}, []);
```

## 贡献指南

欢迎贡献代码和建议！

1. Fork 本仓库
2. 新建功能分支 (`git checkout -b feature/your-feature`)
3. 提交变更 (`git commit -m 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 发起 Pull Request

请在提交前执行代码格式检查和测试。

## 许可证

本项目采用 Apache-2.0 许可证，详见 [LICENSE](./LICENSE)。

## 相关链接

- [Next.js 官方文档](https://nextjs.org/docs)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Apache-2.0 许可证简介](https://opensource.org/licenses/Apache-2.0)

---

感谢您的关注和使用！如果觉得项目对您有帮助，欢迎点⭐支持！
