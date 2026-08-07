# Antigravity 连接 Figma MCP 自动化画图踩坑与全探索指南

> 本指南完整记录了使用 **Antigravity / AI Agent** 通过 **MCP (Model Context Protocol)** 协议探索 **Figma UI 自动化画图** 的全过程：从最初尝试 **Figma Dev Mode MCP（只读局限）** 发现无法绘图，到技术选型转向 **figma-console-mcp（双向写操作）**；以及在这个过程中踩过的所有开源安装、网络穿透、端口占用、分段超时、API 误区等坑点与终极解决方案。

---

## 目录
- [一、 起点与探索：Figma Dev Mode MCP 的局限性与失败尝试](#一-起点与探索figma-dev-mode-mcp-的局限性与失败尝试)
- [二、 技术选型重塑：转向 figma-console-mcp 架构](#二-技术选型重塑转向-figma-console-mcp-架构)
- [三、 详细安装指南：开源仓库 clone 与 Desktop Bridge 插件导入](#三-详细安装指南开源仓库-clone-与-desktop-bridge-插件导入)
- [四、 Figma Personal Access Token 申请与配置](#四-figma-personal-access-token-申请与配置)
- [五、 MCP 配置文件格式与环境变量坑点](#五-mcp-配置文件格式与环境变量坑点)
- [六、 核心网络壁垒：Windows Figma 与 WSL2 端口穿透](#六-核心网络壁垒windows-figma-与-wsl2-端口穿透)
- [七、 插件 UI 坑点：Local Mode vs Cloud Mode（☁️ 云朵图标）](#七-插件-ui-坑点local-mode-vs-cloud-mode云朵图标)
- [八、 孤儿进程占用与 9223 端口解绑](#八-孤儿进程占用与-9223-端口解绑)
- [九、 跨文件与多标签页隔离机制（Tab Disconnect Code 1001）](#九-跨文件与多标签页隔离机制tab-disconnect-code-1001)
- [十、 大代码超时与分段流水线策略（Step-by-Step Pipeline）](#十-大代码超时与分段流水线策略step-by-step-pipeline)
- [十一、 Figma API 踩坑：Dynamic-Page 模式与 `getNodeByIdAsync`](#十一-figma-api-踩坑dynamic-page-模式与-getnodebyidasync)
- [十二、 视觉坑点：暗黑对比度与视口自动聚焦（Viewport & Contrast）](#十二-视觉坑点暗黑对比度与视口自动聚焦viewport--contrast)
- [十三、 “假生成 / 假成功”（Fake Success / Invisible UI）痛点全剖析](#十三-假生成--假成功fake-success--invisible-ui痛点全剖析)
- [十四、 终极完整闭环：从 Prompt 生成到 Figma 画布落地](#十四-终极完整闭环从-prompt-生成到-figma-画布落地)
- [十五、 常见报错日志与错误代码速查手册（Error Log Reference）](#十五-常见报错日志与错误代码速查手册error-log-reference)

---

## 一、 起点与探索：Figma Dev Mode MCP 的局限性与失败尝试

### 1. 初始目标
希望让 AI Agent 在 Figma 画布上自动根据需求画出 APP 界面、创建 Frame、绘制矢量组件并写入文本。

### 2. 第一次尝试：Figma Dev Mode MCP / 官方 REST API
在项目初始阶段，我们首先配置并尝试使用了 Figma 官方或基于 Dev Mode 的 REST API MCP（例如 `mcp-figma` 或本地 Dev Mode 服务）：
- **提供的 Tool**：`get_design_context`、`get_selection`、`get_metadata`、`download_assets` 等。
- **遇到的痛点与阻碍**：
  - 发送创建 `Frame`、画矩形或生成页面指令时，官方 API 均无相应接口或直接报错。
  - **根本原因**：Figma 官方 Dev Mode API / REST API 的定位是 **Design-to-Code（设计导出为代码的 Inspect 工具）**。Figma REST API 出于安全和架构考虑，**未暴露任何用于创建、修改画布矢量图层的写操作接口**。

### 3. 结论与转向
单靠官方 Dev Mode MCP 无法实现 AI 自动画图，必须寻找能够**向 Figma 画布注入写代码（Write Code）** 的双向通信方案。

---

## 二、 技术选型重塑：转向 figma-console-mcp 架构

为了实现 **Code-to-Design（AI 自动生成 UI 到 Figma 画布）**，我们技术选型转向了开源项目：

- **开源仓库**：[michaellperry/figma-console-mcp](https://github.com/michaellperry/figma-console-mcp)
- **npm 包名**：`figma-console-mcp`（最新版 `figma-console-mcp@latest`）

### 架构原理（双向 WebSocket 通道）
该项目采用 **桌面插件 Bridge 架构**：在 Figma 内部运行一个 Manifest 插件，通过本地 WebSocket 通道与后端 Node 进程通信，直接在 Figma 主线程执行原生的 Plugin JS 代码：

```text
[ Antigravity / AI Agent ]
         │ (JSON-RPC stdio)
         ▼
[ figma-console-mcp Server (Node 进程) ] ─── 监听 localhost:9223
         ▲
         │ (WebSocket 实时长连接)
         ▼
[ Figma Desktop Bridge 插件 (Figma 内部运行) ]
         │ (调用 figma.createFrame / createText Native API)
         ▼
[ Figma 画布实时呈现矢量 UI 图层 ]
```

---

## 三、 详细安装指南：开源仓库 clone 与 Desktop Bridge 插件导入

为了在 Figma 桌面版中接收画图指令，需要完成插件的本地导入：

1. **下载开源仓库代码**：
   在终端运行克隆命令：
   ```bash
   git clone https://github.com/michaellperry/figma-console-mcp.git
   ```
2. **定位插件清单文件**：
   在克隆下来的项目中，找到 `desktop-bridge/manifest.json` 及其对应的编译后 JS 文件（如 `code.js`）。
3. **导入到 Figma 桌面客户端**：
   - 打开 Figma 桌面版；
   - 点击顶部菜单 **Plugins** -> **Development** -> **Import plugin from manifest...**；
   - 选中 `desktop-bridge/manifest.json` 文件导入；
4. **启动插件**：
   - 在 Figma 中按 `Ctrl + Alt + P`（或菜单栏 **Plugins -> Development -> Figma Desktop Bridge**）运行插件；
   - 插件弹窗开启后，会自动尝试建立 WebSocket 连接。

---

## 四、 Figma Personal Access Token 申请与配置

虽然写操作主要通过 Desktop Bridge 执行，但读取文件结构和元数据仍需要 Token 认证：

1. 登录 Figma 账号，点击左上角头像 -> **Settings**；
2. 切换到 **Security** 标签页；
3. 找到 **Personal Access Tokens**，点击 **Generate new token**；
4. 勾选必要的 Scope（包含 `files:read` / `file_variables:read` 等）；
5. 复制生成的字符串（格式为 `figd_7sTrC5Mv_CGL...`），此 Token 即为环境变量所需凭证。

---

## 五、 MCP 配置文件格式与环境变量坑点

在配置 `mcp.json` 或 `mcp_config.json` 时踩过的坑：

### 1. 包名 E404 错误
- ❌ 错误包名：`@modelcontextprotocol/server-figma`（npm 仓库无此包）。
- ✅ 正确包名：`figma-console-mcp@latest`。

### 2. JSON 格式化语法错误
- ❌ 在 JSON 配置文件中书写 `//` 单行注释，导致 IDE 解析报错 `Invalid JSON`。

### 3. 环境变量名称不匹配
- ❌ 误写为 `FIGMA_PERSONAL_ACCESS_TOKEN`。
- ✅ 正确变量名为 `FIGMA_ACCESS_TOKEN`。

### 正确配置示范
```json
{
  "mcpServers": {
    "figma-console": {
      "command": "npx",
      "args": [
        "-y",
        "figma-console-mcp@latest"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_你的真实Token",
        "ENABLE_MCP_APPS": "true"
      }
    }
  }
}
```

---

## 六、 核心网络壁垒：Windows Figma 与 WSL2 端口穿透

### 1. 痛点现象
Figma 插件小窗口内反复显示：`Looking for your AI app... Couldn't find your AI app...`，点击 `Try again` 无响应。

### 2. 原因分析
- **Figma 客户端** 运行在 **Windows 宿主机** 环境中，扫描 Windows 本地的 `127.0.0.1:9223`；
- **MCP Node 进程** 运行在 **WSL2 (Ubuntu 虚拟机)** 环境中 (`/wsl+ubuntu/...`)，监听 WSL2 的 `127.0.0.1:9223`；
- WSL2 默认的网络隔离导致 Windows 客户端访问不到 WSL2 内部的 9223 端口。

### 3. 解决方案

#### 方案 A：PowerShell 端口转发（最常用）
在 Windows **管理员权限 PowerShell** 中运行：
```powershell
$wsl_ip = (wsl hostname -I).Trim().Split(" ")[0]
9223..9225 | ForEach-Object { netsh interface portproxy add v4tov4 listenport=$_ listenaddress=127.0.0.1 connectport=$_ connectaddress=$wsl_ip }
```

#### 方案 B：Win11 镜像网络模式
编辑 Windows 用户目录下的 `.wslconfig`（`C:\Users\你的用户名\.wslconfig`）：
```ini
[wsl2]
networkingMode=mirrored
```
然后运行 `wsl --shutdown` 重启 WSL2 即可全自动共享 `localhost` 端口。

---

## 七、 插件 UI 坑点：Local Mode vs Cloud Mode（☁️ 云朵图标）

### 1. 痛点现象
Figma 插件窗口弹出框要求输入 6 位 `Pairing Code`，下方显示 `Cloud: not connected`。

### 2. 原因分析
不小心点击了插件弹窗顶部标题栏的 **紫色 ☁️ 云朵图标**，误将插件切换成了云端模式。

### 3. 解决方案
再次点击 **☁️ 云朵图标**（取消高亮），切回 **Local Mode**，配合端口转发即可瞬间变为 **`🟢 Local · ready`** 状态。

---

## 八、 孤儿进程占用与 9223 端口解绑

### 1. 痛点现象
MCP 启动日志报错：
`Preferred WebSocket port 9223 was in use, bound to fallback port 9224`
导致 Figma 插件（固定连 9223）无法连上 MCP。

### 2. 解决方案
1. 在 WSL 终端查找占用 9223 端口的旧孤儿进程：`lsof -i :9223`；
2. 强制杀掉旧 Node 进程：`kill -9 <PID>`；
3. 重新拉起 MCP 常驻服务，确保成功占用 `9223` 端口。

---

## 九、 跨文件与多标签页隔离机制（Tab Disconnect Code 1001）

### 1. 痛点现象
在 Figma 桌面版中新建文件或切换到新标签页（例如从 `Untitled` 切换到 `活动` 文件）后，Agent 发送写指令报错：
```text
Cannot connect to Figma Desktop.
Open the Desktop Bridge plugin in Figma...
```

### 2. 原因分析
Figma 桌面插件的运行生命周期是**绑定在当前文件标签页**之上的。切换到新文件标签页后，旧标签页的插件被冻结/断开，日志抛出 `Code 1001: File disconnected`。

### 3. 解决方案
在新打开的文件标签页中，只需操作一次：
1. 点击顶部菜单 **Plugins -> Development -> Figma Desktop Bridge**；
2. 插件再次在新标签页中启动并连接 9223 端口，连接恢复正常。

---

## 十、 大代码超时与分段流水线策略（Step-by-Step Pipeline）

### 1. 痛点现象
一次性把包含数十个 UI 图层的整段复杂代码通过 `figma_execute` 发送给 Figma，导致 WebSocket 连接中途断开，无 `result` 返回，画布未生成任何图层。

### 2. 原因分析
Figma 插件运行在主 UI 线程 JS 沙盒中，一次性注入过长或耗时过高的 DOM 构造逻辑会触发插件执行超时（Execution Timeout）。

### 3. 解决方案：分段流水线（Step-by-Step Pipeline）
把一个复杂 App 首页的生成拆解为多个子步骤独立发送：

```text
Step 1: 创建根外框 Frame (375x812) + 状态栏 + 导航栏 (返回 frame.id)
Step 2: 通过 await figma.getNodeByIdAsync(frameId) 挂载 Hero Banner 轮播区
Step 3: 挂载 4x2 金刚区 8 宫格分类
Step 4: 挂载 Tab 切换栏
Step 5: 挂载 3 张资讯卡片
Step 6: 挂载底部 TabBar 导航栏，并执行 figma.viewport.scrollAndZoomIntoView([frame]) 聚焦视角
```

---

## 十一、 Figma API 踩坑：Dynamic-Page 模式与 `getNodeByIdAsync`

### 1. 痛点现象
在分段更新节点时，执行 `figma.getNodeById('13:58')` 报错：
```text
Error: in getNodeById: Cannot call with documentAccess: dynamic-page. Use figma.getNodeByIdAsync instead.
```

### 2. 原因分析
Figma Plugin API 的最新版本默认启用了 **Dynamic-Page Access（动态页面模式）**，传统同步 `getNodeById` 被禁止。

### 3. 解决方案
在任何分段或查询脚本中，必须统一使用**异步 API**：
```javascript
// ❌ 错误同步写法
const f = figma.getNodeById('13:58');

// ✅ 正确异步写法
const f = await figma.getNodeByIdAsync('13:58');
```

---

## 十二、 视觉坑点：暗黑对比度与视口自动聚焦（Viewport & Contrast）

### 1. 痛点现象
1. 代码返回 `success: true`，但用户在画布上看不到任何新建的画板；
2. 生成了文字图层，但在暗黑背景下文字呈现为黑色，肉眼完全无法识别。

### 2. 原因分析
- 新生成的 Frame 落在离用户当前镜头较远的坐标上（如 `x: 605, y: 0`）；
- `createText()` 的默认文字颜色为黑色（`r: 0, g: 0, b: 0`），在暗黑/深灰色背景画板上与背景同色无法被肉眼辨识。

### 3. 解决方案
1. **视口自动聚焦**：每个功能块画完后，显式控制视口聚焦：
   ```javascript
   figma.currentPage.selection = [frame];
   figma.viewport.scrollAndZoomIntoView([frame]);
   ```
2. **纯白文字对比度**：暗色背景下的所有文字图层，必须显式声明 `fills` 为纯白：
   ```javascript
   textNode.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; // #FFFFFF
   ```

---

## 十三、 “假生成 / 假成功”（Fake Success / Invisible UI）痛点全剖析

### 1. 痛点现象
Agent 控制台或日志显示“已成功生成 UI / success: true”，但用户在 Figma 画布上死活找不到画出来的界面。

### 2. 根源剖析（四大隐秘原因）
1. **插件沙盒静默报错**：例如调用了废弃的 `figma.getNodeById()`，Figma 沙盒内部直接抛错挂起，导致后续 `appendChild()` 和 `scrollAndZoomIntoView()` 未被执行。
2. **WebSocket 传输超时/丢包**：单次代码块过长，WebSocket 通道在传输途中静默断开（`File disconnected`），但前端 Agent 没有拿到明确失败提示。
3. **坐标偏离与视口未同步**：画板被创建在画布远离屏幕中央的远端坐标（如 `x: 605, y: 0`），用户当前的 Figma 镜头视口停留在 `(0, 0)`。
4. **插件处于伪连接挂起状态**：插件窗口提示 `Last action: 4m ago`，当标签页失去焦点时插件挂起，无法实时接收渲染指令。

### 3. 解决方案与最佳实践
- **强制使用异步 API**：一律使用 `getNodeByIdAsync()`。
- **强制分段流水线**：单次发送不超过 30 行轻量代码。
- **强行追加视口聚焦**：脚本末尾必须执行 `figma.viewport.scrollAndZoomIntoView([frame])`。
- **重新激活插件**：切换文件/标签页后，在窗口上手动点一次 `Figma Desktop Bridge` 恢复连接。

---

## 十四、 终极完整闭环：从 Prompt 生成到 Figma 画布落地

一套完整的 AI Agent + Figma MCP 自动化 UI 设计工作流：

1. **结构化 Prompt**：定义应用类型（如手游攻略 App）、暗黑风视觉规范、信息架构与模块划分；
2. **环境通道校验**：确认端口转发正常，插件小窗口呈现 `🟢 Local · ready`；
3. **分段 Pipeline 执行**：按 Step 1~6 依次发送 `figma_execute`，避免单次脚本超时；
4. **截图审计反馈**：调用 `figma_take_screenshot` 截取 Figma 运行渲染图，校验布局与组件；
5. **视口锁定与交付**：自动调用 `scrollAndZoomIntoView` 缩放定位镜头，完成设计交付。

---

## 十五、 常见报错日志与错误代码速查手册（Error Log Reference）

| 序号 | 错误类型 / 报错特征文本 | 常见触发场景 | 核心原因 | 快速排查与解决办法 |
|:---:|:---|:---|:---|:---|
| 1 | `npm error code E404... @modelcontextprotocol/server-figma - Not found` | 执行 `npx` 启动 MCP 时 | 包名填写错误，npm 官方无此包 | 将 MCP 包名修改为 `figma-console-mcp@latest` |
| 2 | `MCP Configuration Error: Invalid JSON... Unexpected token '/'` | 启动 IDE 或 MCP 服务器时 | 在 JSON 配置文件中写了 `//` 注释 | 删除 `mcp.json` 中所有的双斜杠注释 |
| 3 | `Cannot connect to Figma Desktop... Open the Desktop Bridge plugin in Figma` | 发送 `figma_execute` 指令时 | ① Windows 与 WSL2 端口未转发<br>② Figma 插件未在当前文件标签页打开 | ① 运行 PowerShell `netsh interface portproxy`<br>② 在当前文件菜单重新打开 `Figma Desktop Bridge` 插件 |
| 4 | `Preferred WebSocket port 9223 was in use, bound to fallback port 9224` | MCP 进程重启或重复启动时 | 旧的 Node 孤儿进程未释放，占用了 9223 | 执行 `lsof -i :9223` 找到 PID 并运行 `kill -9 <PID>` |
| 5 | `File disconnected from WebSocket... code: 1001` | Figma 切换文件标签页或新建 Page 时 | Figma 桌面插件的运行生命周期绑定在单一文件标签页上 | 在新打开的文件标签页中手点一次 `Figma Desktop Bridge` |
| 6 | `Error: in getNodeById: Cannot call with documentAccess: dynamic-page` | 分段脚本通过 ID 挂载节点时 | Figma Plugin API 启用了动态页面模式，废弃了同步 `getNodeById` | 将代码中的 `figma.getNodeById()` 替换为 `await figma.getNodeByIdAsync()` |
| 7 | `Cloud: not connected... Enter 6-digit pairing code` | 插件窗口状态显示异常 | 误触了插件小窗口顶部的 **☁️ 云朵图标** | 再次点击 **☁️ 云朵图标** 取消高亮，切回 Local 直连模式 |
| 8 | `Connected to 1 AI app ... Last action: 4m ago` | 画布长期无响应、显示伪连接时 | 标签页长久失去焦点或窗口挂起 | 点击插件窗口里的 `Pause` 再点 `Resume` 或刷新标签页 |
