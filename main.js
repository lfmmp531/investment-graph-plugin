// ============================================================
// 投资思维画布 · 主逻辑
// 数据存储在插件内存中，通过工具增删查改
// ============================================================

// ---- 初始数据：从当前基准版导入 ----
let graphData = {
  nodes: [
    { id: "core", label: "认知变现", group: "core", size: 30, desc: "投资=多角度分析的变现。体感+数据=决策。" },
    { id: "multi", label: "多角度分析", group: "core", size: 24, desc: "医疗一线 + AI开发 + 宏观历史 + 人性洞察 + 单兵体感" },
    { id: "wait", label: "等回调·闲钱", group: "core", size: 22, desc: "标普500回撤10-15%启动，不追高，不加杠杆。" },
    { id: "hold", label: "3年持有·止盈", group: "core", size: 22, desc: "过滤短期噪音，止盈线15-20%。" },
    { id: "med_feel", label: "医疗一线体感", group: "medical", size: 20, desc: "你在行业内的真实观察：政策落地阻力、DRG/DIP执行僵持。" },
    { id: "med_policy", label: "政策落地阻力", group: "medical", size: 18, desc: "文件到科室执行之间的博弈和妥协。" },
    { id: "med_insurance", label: "医保支付方", group: "medical", size: 16, desc: "医保控费压力传导至医院端。" },
    { id: "med_hospital", label: "医院端", group: "medical", size: 16, desc: "成本核算压力，科室绩效受影响。" },
    { id: "med_pharma", label: "药企端", group: "medical", size: 16, desc: "集采压低利润，创新转型迫切。" },
    { id: "med_export", label: "创新药出海", group: "medical", size: 16, desc: "License-out 交易放量，全球化验证。" },
    { id: "med_japan", label: "日本医药路径", group: "medical", size: 16, desc: "控费阵痛后创新驱动，出海找增量。" },
    { id: "med_korea", label: "韩国医药路径", group: "medical", size: 16, desc: "CDMO代工+技术授权模式。" },
    { id: "med_suspend", label: "医药暂缓", group: "medical", size: 22, desc: "交叉验证：医疗一线+政策阻力+日韩路径 → 暂缓，等待更明确信号。" },
    { id: "med_policy_impact", label: "集采冲击边际钝化", group: "medical", size: 16, desc: "集采常态化，市场反应逐渐麻木。" },
    { id: "med_conflict", label: "医患矛盾→改革阵痛", group: "medical", size: 16, desc: "深层矛盾需时间化解，短期扰动情绪。" },
    { id: "ai_dev_feel", label: "AI开发者体感", group: "ai", size: 20, desc: "调用API、做情感陪伴产品的一线经验。" },
    { id: "ai_api_cost", label: "API性价比实测", group: "ai", size: 18, desc: "DeepSeek便宜，Claude/GPT贵但强，按需调度。" },
    { id: "ai_github", label: "GitHub生态深度使用", group: "ai", size: 18, desc: "开发者粘性极强，生态锁定效应。" },
    { id: "ai_model", label: "模型层 (DeepSeek/Claude/GPT)", group: "ai", size: 20, desc: "上游核心，按token收费，规模效应。" },
    { id: "ai_compute", label: "算力层 (英伟达/芯片)", group: "ai", size: 18, desc: "AI越普及，算力需求越刚性。" },
    { id: "ai_api_volume", label: "API调用量→景气指标", group: "ai", size: 16, desc: "真实需求的风向标。" },
    { id: "ai_toolchain", label: "工具链 (Dify/n8n/Coze)", group: "ai", size: 18, desc: "降低开发门槛，聚合开发者。" },
    { id: "ai_platform", label: "开发者平台 (阿里Qoder/猫箱)", group: "ai", size: 18, desc: "国内中游重要玩家，生态扩张。" },
    { id: "ai_github_lock", label: "GitHub生态锁定", group: "ai", size: 18, desc: "代码托管+CI/CD+Copilot，不可替代。" },
    { id: "ai_app", label: "情感陪伴应用", group: "ai", size: 18, desc: "下游典型场景，用户付费意愿强。" },
    { id: "ai_homogeneous", label: "同质化严重", group: "ai", size: 16, desc: "99%产品换皮，缺乏差异化。" },
    { id: "ai_user_alert", label: "用户警惕圈钱", group: "ai", size: 16, desc: "用户已具备辨别能力，付费转化下降。" },
    { id: "ai_mid_看好", label: "中游看好", group: "ai", size: 22, desc: "交叉验证：开发者体感+GitHub生态+工具链 → 中游最有护城河。" },
    { id: "ai_up_收租", label: "上游收租", group: "ai", size: 22, desc: "交叉验证：API性价比+算力刚需+调用量增长 → 上游确定性最强。" },
    { id: "ai_down_不看好", label: "下游不看好", group: "ai", size: 22, desc: "交叉验证：同质化+用户警惕+红海竞争 → 下游难出龙头。" },
    { id: "ai_regulation", label: "新规反向印证潜力", group: "ai", size: 18, desc: "监管越严，说明赛道越热，需求管不住。" },
    { id: "consume_必选", label: "消费必选 (国家战略)", group: "consume", size: 20, desc: "出口+地产见顶，消费是唯一主引擎。" },
    { id: "consume_timing", label: "时机不明", group: "consume", size: 16, desc: "需等待社零、CPI、就业信号。" },
    { id: "consume_sub", label: "服务/AI消费细分", group: "consume", size: 16, desc: "情绪消费、AI陪伴、服务体验是新方向。" },
    { id: "bought_hs300", label: "沪深300 (已买入)", group: "bought", size: 18, desc: "A股核心底仓，每周20元。" },
    { id: "bought_bond", label: "中债 (已买入)", group: "bought", size: 16, desc: "压舱石，每周15元。" },
    { id: "bought_sp500", label: "标普500 (已买入)", group: "bought", size: 18, desc: "海外分散，每周10元。" },
    { id: "bought_med_etf", label: "医疗ETF (已买入)", group: "bought", size: 16, desc: "小剂量播种，每周5元。" },
    { id: "bought_money_fund", label: "货币基金 (备用金)", group: "bought", size: 14, desc: "等待大跌时手动加仓。" },
    { id: "watch_nasdaq", label: "纳斯达克100 (待回调)", group: "watch", size: 16, desc: "等回调15-20%介入。" },
    { id: "watch_ali_tencent", label: "阿里云/腾讯 (观察)", group: "watch", size: 16, desc: "国内中游平台，关注生态扩张。" },
    { id: "watch_msft", label: "微软 (GitHub母公司)", group: "watch", size: 16, desc: "GitHub+Azure+AI，生态龙头。" },
    { id: "watch_consume_etf", label: "消费类ETF (待信号)", group: "watch", size: 14, desc: "等社零数据确认复苏。" },
    { id: "watch_deepseek", label: "DeepSeek (等IPO)", group: "watch", size: 16, desc: "性价比屠夫，关注上市进程。" }
  ],
  links: [
    { source: "core", target: "multi", value: 2, type: "causal" },
    { source: "core", target: "wait", value: 2, type: "causal" },
    { source: "core", target: "hold", value: 2, type: "causal" },
    { source: "multi", target: "med_feel", value: 1.5, type: "cross" },
    { source: "multi", target: "ai_dev_feel", value: 1.5, type: "cross" },
    { source: "multi", target: "consume_必选", value: 1.5, type: "cross" },
    { source: "med_feel", target: "med_policy", value: 1.8, type: "causal" },
    { source: "med_policy", target: "med_insurance", value: 1.5, type: "causal" },
    { source: "med_insurance", target: "med_hospital", value: 1.5, type: "causal" },
    { source: "med_hospital", target: "med_pharma", value: 1.5, type: "causal" },
    { source: "med_pharma", target: "med_export", value: 1.5, type: "causal" },
    { source: "med_export", target: "med_japan", value: 1.2, type: "causal" },
    { source: "med_export", target: "med_korea", value: 1.2, type: "causal" },
    { source: "med_feel", target: "med_suspend", value: 2, type: "cross" },
    { source: "med_policy", target: "med_suspend", value: 2, type: "cross" },
    { source: "med_japan", target: "med_suspend", value: 1.8, type: "cross" },
    { source: "med_korea", target: "med_suspend", value: 1.8, type: "cross" },
    { source: "med_policy_impact", target: "med_suspend", value: 1.5, type: "cross" },
    { source: "med_conflict", target: "med_suspend", value: 1.5, type: "cross" },
    { source: "ai_dev_feel", target: "ai_api_cost", value: 1.8, type: "causal" },
    { source: "ai_dev_feel", target: "ai_github", value: 1.8, type: "causal" },
    { source: "ai_api_cost", target: "ai_model", value: 1.5, type: "causal" },
    { source: "ai_model", target: "ai_compute", value: 1.5, type: "causal" },
    { source: "ai_model", target: "ai_api_volume", value: 1.5, type: "causal" },
    { source: "ai_github", target: "ai_toolchain", value: 1.5, type: "causal" },
    { source: "ai_toolchain", target: "ai_platform", value: 1.5, type: "causal" },
    { source: "ai_github", target: "ai_github_lock", value: 1.8, type: "causal" },
    { source: "ai_dev_feel", target: "ai_app", value: 1.8, type: "causal" },
    { source: "ai_app", target: "ai_homogeneous", value: 1.5, type: "causal" },
    { source: "ai_app", target: "ai_user_alert", value: 1.5, type: "causal" },
    { source: "ai_dev_feel", target: "ai_mid_看好", value: 2, type: "cross" },
    { source: "ai_github", target: "ai_mid_看好", value: 2, type: "cross" },
    { source: "ai_toolchain", target: "ai_mid_看好", value: 2, type: "cross" },
    { source: "ai_platform", target: "ai_mid_看好", value: 1.8, type: "cross" },
    { source: "ai_model", target: "ai_up_收租", value: 2, type: "cross" },
    { source: "ai_compute", target: "ai_up_收租", value: 2, type: "cross" },
    { source: "ai_api_volume", target: "ai_up_收租", value: 2, type: "cross" },
    { source: "ai_api_cost", target: "ai_up_收租", value: 1.8, type: "cross" },
    { source: "ai_app", target: "ai_down_不看好", value: 2, type: "cross" },
    { source: "ai_homogeneous", target: "ai_down_不看好", value: 2, type: "cross" },
    { source: "ai_user_alert", target: "ai_down_不看好", value: 2, type: "cross" },
    { source: "ai_app", target: "ai_regulation", value: 1.5, type: "causal" },
    { source: "ai_regulation", target: "ai_down_不看好", value: 1.2, type: "causal" },
    { source: "consume_必选", target: "consume_timing", value: 1.8, type: "causal" },
    { source: "consume_必选", target: "consume_sub", value: 1.5, type: "causal" },
    { source: "med_suspend", target: "bought_med_etf", value: 1.8, type: "causal" },
    { source: "med_feel", target: "bought_med_etf", value: 1.5, type: "causal" },
    { source: "ai_up_收租", target: "watch_msft", value: 1.8, type: "causal" },
    { source: "ai_up_收租", target: "watch_nasdaq", value: 1.8, type: "causal" },
    { source: "ai_mid_看好", target: "watch_ali_tencent", value: 1.8, type: "causal" },
    { source: "ai_model", target: "watch_deepseek", value: 1.5, type: "causal" },
    { source: "consume_必选", target: "watch_consume_etf", value: 1.5, type: "causal" },
    { source: "consume_timing", target: "watch_consume_etf", value: 1.5, type: "causal" },
    { source: "wait", target: "bought_hs300", value: 1.8, type: "causal" },
    { source: "wait", target: "bought_sp500", value: 1.8, type: "causal" },
    { source: "hold", target: "bought_bond", value: 1.5, type: "causal" },
    { source: "hold", target: "bought_money_fund", value: 1.5, type: "causal" },
    { source: "multi", target: "med_suspend", value: 1.5, type: "cross" },
    { source: "multi", target: "ai_mid_看好", value: 1.5, type: "cross" },
    { source: "multi", target: "ai_up_收租", value: 1.5, type: "cross" },
    { source: "multi", target: "ai_down_不看好", value: 1.5, type: "cross" },
    { source: "multi", target: "consume_必选", value: 1.5, type: "cross" }
  ]
};

// ---- 辅助：id是否存在 ----
function nodeExists(id) {
  return graphData.nodes.some(n => n.id === id);
}

// ---- 工具函数 ----

function add_node(params) {
  const { id, label, group, size, desc } = params;
  if (!id || !label || !group || !size || !desc) {
    return { success: false, error: '缺少必填参数：id/label/group/size/desc' };
  }
  if (nodeExists(id)) {
    return { success: false, error: '节点id已存在：' + id };
  }
  const validGroups = ['core', 'medical', 'ai', 'consume', 'bought', 'watch'];
  if (!validGroups.includes(group)) {
    return { success: false, error: 'group必须是：' + validGroups.join('/') };
  }
  graphData.nodes.push({ id, label, group, size, desc });
  return { success: true, data: { message: '✅ 已添加节点：' + label, nodeCount: graphData.nodes.length } };
}

function add_link(params) {
  const { source, target, value, type } = params;
  if (!source || !target || !value || !type) {
    return { success: false, error: '缺少必填参数：source/target/value/type' };
  }
  if (!nodeExists(source)) {
    return { success: false, error: 'source节点不存在：' + source };
  }
  if (!nodeExists(target)) {
    return { success: false, error: 'target节点不存在：' + target };
  }
  if (type !== 'causal' && type !== 'cross') {
    return { success: false, error: 'type必须是 causal 或 cross' };
  }
  // 检查是否已存在
  const exists = graphData.links.some(l => l.source === source && l.target === target);
  if (exists) {
    return { success: false, error: '这条连线已存在' };
  }
  graphData.links.push({ source, target, value, type });
  return { success: true, data: { message: '✅ 已添加连线：' + source + ' → ' + target, linkCount: graphData.links.length } };
}

function remove_node(params) {
  const { id } = params;
  if (!id) return { success: false, error: '缺少参数 id' };
  if (!nodeExists(id)) return { success: false, error: '节点不存在：' + id };
  graphData.nodes = graphData.nodes.filter(n => n.id !== id);
  graphData.links = graphData.links.filter(l => l.source !== id && l.target !== id);
  return { success: true, data: { message: '🗑️ 已删除节点及关联连线：' + id, nodeCount: graphData.nodes.length } };
}

function remove_link(params) {
  const { source, target } = params;
  if (!source || !target) return { success: false, error: '缺少参数 source/target' };
  const before = graphData.links.length;
  graphData.links = graphData.links.filter(l => !(l.source === source && l.target === target));
  if (graphData.links.length === before) {
    return { success: false, error: '未找到该连线' };
  }
  return { success: true, data: { message: '🗑️ 已删除连线', linkCount: graphData.links.length } };
}

function get_graph_data() {
  return {
    success: true,
    data: {
      nodes: graphData.nodes,
      links: graphData.links,
      nodeCount: graphData.nodes.length,
      linkCount: graphData.links.length
    }
  };
}

function import_data(params) {
  const { nodes_json, links_json } = params;
  try {
    const nodes = JSON.parse(nodes_json);
    const links = JSON.parse(links_json);
    if (!Array.isArray(nodes) || !Array.isArray(links)) {
      return { success: false, error: 'nodes和links必须是数组' };
    }
    graphData.nodes = nodes;
    graphData.links = links;
    return { success: true, data: { message: '📦 已导入数据', nodeCount: nodes.length, linkCount: links.length } };
  } catch (e) {
    return { success: false, error: 'JSON解析失败：' + e.message };
  }
}

function render_graph() {
  const { nodes, links } = graphData;

  // 构建颜色映射
  const colorMap = {
    core: "#f7b731", medical: "#4fc3f7", ai: "#a78bfa",
    consume: "#f472b6", bought: "#34d399", watch: "#fbbf24"
  };
  const groupNames = { core:"核心", medical:"医疗行业", ai:"AI行业", consume:"消费", bought:"已买入", watch:"待买入" };

  // 统计每个节点的交叉验证数量
  const crossCount = {};
  links.forEach(l => {
    if (l.type === 'cross') {
      crossCount[l.source] = (crossCount[l.source] || 0) + 1;
      crossCount[l.target] = (crossCount[l.target] || 0) + 1;
    }
  });

  // 生成节点数组的JS代码
  const nodesJS = JSON.stringify(nodes, null, 2);
  const linksJS = JSON.stringify(links, null, 2);

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
  <title>🧠 投资认知网络</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#0b1424;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter','Segoe UI',system-ui,sans-serif;padding:16px;}
    .graph-container{width:100%;max-width:1400px;background:radial-gradient(circle at 30% 40%,#121e33,#080f1c);border-radius:48px;padding:16px;box-shadow:0 30px 80px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.03);position:relative;}
    svg{display:block;width:100%;height:auto;min-height:820px;background:transparent;border-radius:32px;cursor:grab;}
    svg:active{cursor:grabbing;}
    .node circle{stroke-width:1.8px;}
    .node text{fill:#e8edf5;font-size:8px;font-weight:500;text-shadow:0 0 8px #0a1424,0 0 2px #0a1424;dominant-baseline:middle;text-anchor:middle;pointer-events:none;letter-spacing:0.2px;}
    .link{stroke-opacity:0.5;stroke-linecap:round;}
    .link.cross{stroke-dasharray:5 4;stroke-opacity:0.8;}
    .legend{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 24px;margin-top:18px;padding:10px 20px;background:rgba(255,255,255,0.03);border-radius:60px;border:1px solid rgba(255,255,255,0.04);}
    .legend-item{display:flex;align-items:center;gap:6px;color:#9bb0d0;font-size:0.7rem;}
    .legend-item .circle-dot{width:12px;height:12px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);}
    .legend-item .dot.dashed{width:16px;height:0;border-top:3px dashed #f472b6;background:transparent;}
    .footnote{margin-top:14px;color:#5a7298;font-size:0.7rem;letter-spacing:1px;text-align:center;opacity:0.6;}
    @media(max-width:700px){.graph-container{padding:8px;border-radius:28px;}svg{min-height:600px;}.node text{font-size:6px;}}
    .tooltip{position:absolute;z-index:100;background:rgba(10,18,30,0.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:12px 16px;max-width:220px;pointer-events:none;opacity:0;transition:opacity 0.2s;box-shadow:0 8px 30px rgba(0,0,0,0.5);}
    .tooltip.show{opacity:1;}
    .tooltip .name{font-size:0.85rem;font-weight:600;color:#f0f4fe;margin-bottom:2px;}
    .tooltip .group{font-size:0.6rem;color:#4a6080;letter-spacing:1px;margin-bottom:6px;}
    .tooltip .desc{font-size:0.7rem;line-height:1.5;color:#b0c8e8;}
    .tooltip .cross-badge{display:inline-block;margin-top:6px;background:rgba(244,114,182,0.15);color:#f472b6;padding:2px 10px;border-radius:20px;font-size:0.6rem;border:1px solid rgba(244,114,182,0.2);}
  </style>
</head>
<body>
<div class="graph-container" style="position:relative">
  <div class="tooltip" id="tooltip">
    <div class="name" id="tipName"></div>
    <div class="group" id="tipGroup"></div>
    <div class="desc" id="tipDesc"></div>
    <div class="cross-badge" id="tipCross" style="display:none;">🔗 交叉验证节点</div>
  </div>
  <svg id="neuralGraph" viewBox="0 0 1000 820" preserveAspectRatio="xMidYMid meet"></svg>
</div>
<div class="legend">
  <span class="legend-item"><span class="circle-dot" style="background:#f7b731;"></span> 核心</span>
  <span class="legend-item"><span class="circle-dot" style="background:#4fc3f7;"></span> 医疗行业</span>
  <span class="legend-item"><span class="circle-dot" style="background:#a78bfa;"></span> AI行业</span>
  <span class="legend-item"><span class="circle-dot" style="background:#f472b6;"></span> 消费</span>
  <span class="legend-item"><span class="circle-dot" style="background:#34d399;"></span> 已买入</span>
  <span class="legend-item"><span class="circle-dot" style="background:#fbbf24;"></span> 待买入</span>
  <span class="legend-item"><span class="dot dashed"></span> 交叉验证关系</span>
</div>
<div class="footnote">节点大小表示主干程度 · 颜色区分模块 · 虚线为交叉验证 · 点击查看详情</div>
<script src="https://d3js.org/d3.v7.min.js"><\\/script>
<script>
(function(){
  const nodes = ${nodesJS};
  const links = ${linksJS};
  const CM=${JSON.stringify(colorMap)},GN=${JSON.stringify(groupNames)};
  const CC=${JSON.stringify(crossCount)};
  const TC={causal:"#8aa3d0",cross:"#f472b6",same:"#5a7a9a",time:"#6b8f6b"};
  const svg=d3.select("#neuralGraph"),W=1000,H=820;
  const defs=svg.append("defs");
  const gf=defs.append("filter").attr("id","gf").attr("x","-60%").attr("y","-60%").attr("width","220%").attr("height","220%");
  gf.append("feGaussianBlur").attr("stdDeviation","4").attr("result","b");
  gf.append("feMerge").selectAll("feMergeNode").data(["b","SourceGraphic"]).enter().append("feMergeNode").attr("in",d=>d);
  const cgf=defs.append("filter").attr("id","cgf").attr("x","-80%").attr("y","-80%").attr("width","260%").attr("height","260%");
  cgf.append("feGaussianBlur").attr("stdDeviation","7").attr("result","b");
  cgf.append("feMerge").selectAll("feMergeNode").data(["b","SourceGraphic"]).enter().append("feMergeNode").attr("in",d=>d);
  Object.keys(CM).forEach(k=>{const c=CM[k],g=defs.append("radialGradient").attr("id","g_"+k).attr("cx","30%").attr("cy","30%");
    g.append("stop").attr("offset","0%").attr("stop-color",d3.color(c).brighter(0.5));
    g.append("stop").attr("offset","60%").attr("stop-color",c);
    g.append("stop").attr("offset","100%").attr("stop-color",d3.color(c).darker(0.7));});
  const cg=defs.append("radialGradient").attr("id","cg").attr("cx","30%").attr("cy","30%");
  cg.append("stop").attr("offset","0%").attr("stop-color","#fce38a");
  cg.append("stop").attr("offset","50%").attr("stop-color","#f7b731");
  cg.append("stop").attr("offset","100%").attr("stop-color","#c08810");
  const sim=d3.forceSimulation(nodes).force("link",d3.forceLink(links).id(d=>d.id).distance(d=>d.type==="cross"?140:d.value>1.8?100:d.value>1.2?130:170).strength(0.45))
    .force("charge",d3.forceManyBody().strength(-550).distanceMin(40).distanceMax(350))
    .force("center",d3.forceCenter(W/2,H/2))
    .force("collide",d3.forceCollide().radius(d=>(d.size||16)*1.5).iterations(3)).alphaDecay(0.025);
  const lk=svg.append("g").selectAll("line").data(links).enter().append("line")
    .attr("class",d=>"link "+(d.type==="cross"?"cross":""))
    .attr("stroke",d=>TC[d.type]||"#8aa3d0")
    .attr("stroke-width",d=>d.type==="cross"?1.8:0.6+d.value*0.4)
    .attr("opacity",d=>d.type==="cross"?0.85:0.45);
  const rg=svg.append("g");
  const rs=rg.selectAll("g.rs").data(nodes).enter().append("g");
  rs.append("line").attr("x1",d=>-d.size*2.2).attr("x2",d=>d.size*2.2).attr("y1",0).attr("y2",0).attr("stroke",d=>CM[d.group]).attr("stroke-width",0.5).attr("opacity",0.08);
  rs.append("line").attr("x1",0).attr("x2",0).attr("y1",d=>-d.size*2.2).attr("y2",d=>d.size*2.2).attr("stroke",d=>CM[d.group]).attr("stroke-width",0.5).attr("opacity",0.08);
  const nd=svg.append("g").selectAll(".nd").data(nodes).enter().append("g").attr("class","node")
    .call(d3.drag().on("start",(e,d)=>{if(!e.active)sim.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y;}).on("drag",(e,d)=>{d.fx=e.x;d.fy=e.y;}).on("end",(e,d)=>{if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null;}));
  nd.append("circle").attr("r",d=>d.size||16).attr("fill",d=>d.id==="core"?"url(#cg)":"url(#g_"+d.group+")").attr("stroke",d=>d3.color(CM[d.group]).brighter(0.3).toString()).attr("stroke-width",d=>d.id==="core"?2.5:1.8).attr("filter",d=>d.id==="core"?"url(#cgf)":"url(#gf)").style("cursor","pointer");
  nd.each(function(d){const c=d3.select(this).select("circle"),dl=Math.random()*2000;(function tw(){c.transition().delay(dl).duration(700).attr("opacity",0.6).transition().duration(700).attr("opacity",1).on("end",tw);})();});
  (function pl(){nd.filter(d=>d.id==="core").select("circle").transition().duration(1500).attr("r",32).transition().duration(1500).attr("r",30).on("end",pl);})();
  nd.each(function(d){const g=d3.select(this),lb=d.label||"";const ls=lb.split('·');if(ls.length>1&&lb.includes('·')){g.append("text").attr("y",-4).style("font-size","8px").style("font-weight","600").style("fill","#f0f4fe").style("text-anchor","middle").style("text-shadow","0 0 12px #0a1424").text(ls[0]);g.append("text").attr("y",8).style("font-size","6px").style("font-weight","400").style("fill","#b0c8e8").style("text-anchor","middle").style("text-shadow","0 0 8px #0a1424").text(ls[1]||"");}else{const fs=(d.size&&d.size>22)?"10px":(d.size&&d.size>18?"8px":"7px");g.append("text").attr("y",2).style("font-size",fs).style("font-weight",(d.size&&d.size>22)?"600":"500").style("fill","#e8edf5").style("text-anchor","middle").style("text-shadow","0 0 14px #0a1424,0 0 4px #0a1424").text(lb);}});
  const tip=document.getElementById("tooltip"),tn=document.getElementById("tipName"),tg=document.getElementById("tipGroup"),td=document.getElementById("tipDesc"),tc=document.getElementById("tipCross");
  nd.on("click",function(e,d){tn.textContent=d.label;tg.textContent=GN[d.group]||"";td.textContent=d.desc||"";if(CC[d.id]){tc.style.display="inline-block";tc.textContent="🔗 "+CC[d.id]+" 条交叉验证";}else tc.style.display="none";const r=this.getBoundingClientRect(),c=document.querySelector('.graph-container').getBoundingClientRect();let l=r.left-c.left+r.width/2,t=r.top-c.top-10;if(t<60)t=r.bottom-c.top+10;tip.style.left=Math.max(10,Math.min(l-90,c.width-200))+"px";tip.style.top=t+"px";tip.classList.add("show");e.stopPropagation();});
  document.addEventListener("click",function(e){if(!e.target.closest('.node'))tip.classList.remove("show");});
  sim.on("tick",()=>{lk.attr("x1",d=>d.source.x).attr("y1",d=>d.source.y).attr("x2",d=>d.target.x).attr("y2",d=>d.target.y);nd.attr("transform",d=>`translate(${d.x},${d.y})`);rs.attr("transform",d=>`translate(${d.x},${d.y})`);});
  function resize(){const c=document.querySelector('.graph-container').getBoundingClientRect();const w=Math.min(c.width-32,1400),rt=w/1000,nh=Math.max(600,820*rt);svg.attr("viewBox",`0 0 1000 ${nh}`);sim.force("center",d3.forceCenter(500,nh/2));sim.alpha(0.3).restart();}
  window.addEventListener('resize',resize);setTimeout(resize,100);
})();
<\\/script>
</body>
</html>`;

  return { success: true, data: { html, message: '✅ 图谱HTML已生成', nodeCount: nodes.length, linkCount: links.length } };
}

// ---- 导出 ----
exports.add_node = add_node;
exports.add_link = add_link;
exports.remove_node = remove_node;
exports.remove_link = remove_link;
exports.get_graph_data = get_graph_data;
exports.render_graph = render_graph;
exports.import_data = import_data;
