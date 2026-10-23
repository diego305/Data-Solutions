import React, { useState } from "react";
import { Interview, DimensionScores } from "../types";
import { RadarChart } from "./charts/RadarChart";
import { seedSampleData } from "../lib/storage";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  Sprout,
  BarChart3,
  TrendingUp,
  Award,
  Zap,
  Printer,
  Layout,
  FileText,
  Check,
  Building2,
  PieChart,
  Target,
  AlertTriangle,
  Layers
} from "lucide-react";

interface AnalyticsViewProps {
  interviews: Interview[];
  onRefresh: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ interviews, onRefresh }) => {
  const [viewMode, setViewMode] = useState<"standard" | "a4">("standard");
  const { t, language, getLocalizedLevel } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  if (interviews.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 text-center py-12 font-['Inter']">
        <div className="bg-white p-8 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-4">
          <div className="text-3xl">📊</div>
          <h2 className="text-base font-light text-[#1E252D] font-['Outfit'] tracking-wide">
            {t("analytics_empty_title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {t("analytics_empty_desc")}
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                seedSampleData();
                onRefresh();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary text-xs cursor-pointer"
            >
              <Sprout className="w-4 h-4" />
              {t("analytics_empty_seed")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const total = interviews.length;
  const scores = interviews.map((i) => i.score_global);
  const avgScore = Math.round((scores.reduce((a, b) => a + b, 0) / total) * 10) / 10;
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  const levelCounts: Record<string, number> = {
    "Nivel 1: Inicial / Disperso": 0,
    "Nivel 2: Operativo / Estructurado": 0,
    "Nivel 3: Avanzado / Preparado": 0
  };
  interviews.forEach((i) => {
    if (levelCounts[i.nivel_madurez] !== undefined) {
      levelCounts[i.nivel_madurez]++;
    } else {
      levelCounts[i.nivel_madurez] = 1;
    }
  });

  const levelColors: Record<string, string> = {
    "Nivel 1: Inicial / Disperso": "#EF4444",
    "Nivel 2: Operativo / Estructurado": "#BFA898",
    "Nivel 3: Avanzado / Preparado": "#3B8AC4"
  };

  // Find predominant level
  let predominantLevelKey = "Nivel 1: Inicial / Disperso";
  let maxCount = -1;
  Object.entries(levelCounts).forEach(([lvl, count]) => {
    if (count > maxCount) {
      maxCount = count;
      predominantLevelKey = lvl;
    }
  });
  const predominantLevelInfo = getLocalizedLevel(predominantLevelKey);
  const predominantPct = total > 0 ? Math.round((maxCount / total) * 100) : 0;

  const sectorCounts: Record<string, number> = {};
  interviews.forEach((i) => {
    sectorCounts[i.sector] = (sectorCounts[i.sector] || 0) + 1;
  });
  const sortedSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]);
  const maxSectorVal = sortedSectors[0]?.[1] || 1;
  const topSector = sortedSectors[0] ? sortedSectors[0][0] : "N/A";
  const topSectorCount = sortedSectors[0] ? sortedSectors[0][1] : 0;

  const obstacleCounts: Record<string, number> = {};
  interviews.forEach((i) => {
    (i.obstaculos_decision || []).forEach((obs) => {
      obstacleCounts[obs] = (obstacleCounts[obs] || 0) + 1;
    });
  });
  const sortedObstacles = Object.entries(obstacleCounts).sort((a, b) => b[1] - a[1]);
  const maxObsVal = sortedObstacles[0]?.[1] || 1;
  const topObstacle = sortedObstacles[0] ? sortedObstacles[0][0] : (language === "en" ? "Lack of technical time" : "Falta de tiempo del equipo");

  const processCounts: Record<string, number> = {};
  interviews.forEach((i) => {
    const p =
      i.proceso_prioritario === "Otro" && i.proceso_prioritario_otro
        ? `${language === "en" ? "Other" : "Otro"} (${i.proceso_prioritario_otro})`
        : i.proceso_prioritario;
    processCounts[p] = (processCounts[p] || 0) + 1;
  });
  const sortedProcesses = Object.entries(processCounts).sort((a, b) => b[1] - a[1]);
  const maxProcVal = sortedProcesses[0]?.[1] || 1;
  const topProcess = sortedProcesses[0] ? sortedProcesses[0][0] : "N/A";
  const topProcessCount = sortedProcesses[0] ? sortedProcesses[0][1] : 0;

  const dimSums: DimensionScores = {
    "Almacenamiento y Fuentes": 0,
    "Integración entre Áreas": 0,
    "Frecuencia de Actualización": 0,
    "Calidad y Consistencia": 0,
    "Eficiencia de Reportes": 0
  };
  interviews.forEach((i) => {
    if (i.dimensiones) {
      dimSums["Almacenamiento y Fuentes"] += i.dimensiones["Almacenamiento y Fuentes"] || 0;
      dimSums["Integración entre Áreas"] += i.dimensiones["Integración entre Áreas"] || 0;
      dimSums["Frecuencia de Actualización"] += i.dimensiones["Frecuencia de Actualización"] || 0;
      dimSums["Calidad y Consistencia"] += i.dimensiones["Calidad y Consistencia"] || 0;
      dimSums["Eficiencia de Reportes"] += i.dimensiones["Eficiencia de Reportes"] || 0;
    }
  });

  const avgDimensions: DimensionScores = {
    "Almacenamiento y Fuentes": Math.round((dimSums["Almacenamiento y Fuentes"] / total) * 10) / 10,
    "Integración entre Áreas": Math.round((dimSums["Integración entre Áreas"] / total) * 10) / 10,
    "Frecuencia de Actualización": Math.round((dimSums["Frecuencia de Actualización"] / total) * 10) / 10,
    "Calidad y Consistencia": Math.round((dimSums["Calidad y Consistencia"] / total) * 10) / 10,
    "Eficiencia de Reportes": Math.round((dimSums["Eficiencia de Reportes"] / total) * 10) / 10
  };

  const dimensionList = [
    { key: "Almacenamiento y Fuentes", label: t("dim_storage"), score: avgDimensions["Almacenamiento y Fuentes"] },
    { key: "Integración entre Áreas", label: t("dim_integration"), score: avgDimensions["Integración entre Áreas"] },
    { key: "Frecuencia de Actualización", label: t("dim_frequency"), score: avgDimensions["Frecuencia de Actualización"] },
    { key: "Calidad y Consistencia", label: t("dim_quality"), score: avgDimensions["Calidad y Consistencia"] },
    { key: "Eficiencia de Reportes", label: t("dim_reporting"), score: avgDimensions["Eficiencia de Reportes"] }
  ];

  // Find lowest dimension (bottleneck)
  const sortedDimensions = [...dimensionList].sort((a, b) => a.score - b.score);
  const lowestDimension = sortedDimensions[0] || dimensionList[0];

  const formattedDate = new Date().toISOString().substring(0, 10);
  const reportCode = `IS-MKT-ANALYTICS-${formattedDate.replace(/-/g, "")}`;

  /* -------------------------------------------------------------------------
     RENDER A4 SINGLE-PAGE COMPONENT FOR ANALYTICS
     Calibrated to fit strictly on 1 single A4 sheet without cutoffs or overflow
     ------------------------------------------------------------------------- */
  const renderA4SinglePage = () => (
    <div className="a4-print-page bg-white text-[#1E252D] font-['Inter'] flex flex-col justify-between h-full p-2 sm:p-4 text-[11px] leading-tight">
      {/* 1. Header Banner */}
      <div className="border-b-2 border-[#1E252D] pb-2 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Brand Mark Compass */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B8AC4] to-[#1E5E94] flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" />
              <circle cx="12" cy="11" r="1.5" fill="#7EBCE6" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs tracking-wider uppercase text-[#1E252D] font-['Outfit']">
                {t("report_header_title")}
              </span>
              <span className="text-[9px] bg-[#E0EFF9] text-[#1E5E94] font-semibold px-1.5 py-0.2 rounded font-mono">
                {language === "en" ? "A4 MARKET ANALYTICS" : "ANALÍTICA CONSOLIDADA A4"}
              </span>
            </div>
            <p className="text-[9.5px] text-slate-500 font-medium">
              {t("report_header_subtitle")}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono font-bold text-[#1E252D]">{reportCode}</div>
          <div className="text-[9px] text-slate-500 font-mono">
            {language === "en" ? "Date: " : "Fecha: "}{formattedDate}
          </div>
          <div className="text-[8.5px] text-[#3B8AC4] font-semibold uppercase tracking-wider">
            {t("badge_official")}
          </div>
        </div>
      </div>

      {/* 2. Executive KPI Ribbon */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div className="bg-[#F5F8FB] border border-[#E4ECF2] rounded-xl p-2 text-center">
          <span className="text-[8.5px] font-semibold uppercase tracking-wider text-slate-500 block font-['Outfit']">
            {t("analytics_total_assessments")}
          </span>
          <div className="text-base font-bold text-[#1E252D] font-mono tabular-nums leading-tight mt-0.5">
            {total}
          </div>
          <span className="text-[8px] text-slate-400 font-mono">
            {language === "en" ? "audited companies" : "empresas relevadas"}
          </span>
        </div>

        <div className="bg-[#F5F8FB] border border-[#E4ECF2] rounded-xl p-2 text-center">
          <span className="text-[8.5px] font-semibold uppercase tracking-wider text-slate-500 block font-['Outfit']">
            {t("analytics_average_score")}
          </span>
          <div className="text-base font-bold text-[#3B8AC4] font-mono tabular-nums leading-tight mt-0.5">
            {avgScore} <span className="text-[9px] font-sans font-normal text-slate-500">/ 100</span>
          </div>
          <span className="text-[8px] text-slate-400 font-mono">
            Min: {minScore} · Max: {maxScore}
          </span>
        </div>

        <div className="bg-[#F5F8FB] border border-[#E4ECF2] rounded-xl p-2 text-center">
          <span className="text-[8.5px] font-semibold uppercase tracking-wider text-slate-500 block font-['Outfit']">
            {t("analytics_predominant_level")}
          </span>
          <div className="text-xs font-bold text-[#1E252D] font-['Outfit'] leading-tight mt-0.5 truncate">
            {predominantLevelInfo.short}
          </div>
          <span className="text-[8px] text-[#3B8AC4] font-semibold font-mono">
            {maxCount} {t("analytics_clients_suffix")} ({predominantPct}%)
          </span>
        </div>

        <div className="bg-[#F5F8FB] border border-[#E4ECF2] rounded-xl p-2 text-center">
          <span className="text-[8.5px] font-semibold uppercase tracking-wider text-slate-500 block font-['Outfit']">
            {t("analytics_most_frequent_sector")}
          </span>
          <div className="text-xs font-bold text-[#1E252D] font-['Outfit'] leading-tight mt-0.5 truncate">
            {topSector}
          </div>
          <span className="text-[8px] text-[#BFA898] font-semibold font-mono">
            {topSectorCount} {t("analytics_clients_suffix")} ({total > 0 ? Math.round((topSectorCount / total) * 100) : 0}%)
          </span>
        </div>
      </div>

      {/* 3. Core Analytical Row: Radar + Dimension Breakdown + Maturity Levels */}
      <div className="grid grid-cols-12 gap-2 mb-2">
        {/* Left: Pentagonal Radar of Average Dimensions */}
        <div className="col-span-4 bg-white border border-[#E4ECF2] rounded-xl p-2 flex flex-col items-center justify-center text-center">
          <div className="text-[9.5px] font-bold text-[#1E252D] uppercase tracking-wider mb-0.5 font-['Outfit']">
            {language === "en" ? "Portfolio Radar (Avg)" : "Radar de Madurez Promedio"}
          </div>
          <RadarChart
            dimensiones={avgDimensions}
            color="#3B8AC4"
            fillColor="rgba(59, 138, 196, 0.22)"
            size={160}
            compact={true}
          />
          <div className="text-[8px] text-slate-400 font-mono mt-0.5">
            {language === "en" ? "Scale 0-100% across all audits" : "Escala 0-100% sobre total relevado"}
          </div>
        </div>

        {/* Center: Dimension Breakdown Bars */}
        <div className="col-span-4 bg-white border border-[#E4ECF2] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="text-[9.5px] font-bold text-[#1E252D] uppercase tracking-wider mb-1 font-['Outfit'] flex items-center justify-between">
            <span>{t("report_dimension_scores")}</span>
            <span className="text-[8px] font-normal text-slate-400 font-mono">Avg %</span>
          </div>
          <div className="space-y-1.5 flex-1 flex flex-col justify-center">
            {dimensionList.map((dim) => (
              <div key={dim.key} className="space-y-0.5">
                <div className="flex justify-between items-center text-[9px]">
                  <span className="font-medium text-slate-700">{dim.label}</span>
                  <span className="font-mono font-bold text-[#3B8AC4]">{dim.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${dim.score}%`,
                      backgroundColor:
                        dim.score >= 75
                          ? "#3B8AC4"
                          : dim.score >= 45
                          ? "#BFA898"
                          : "#EF4444"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-1 border-t border-slate-100 text-[8px] text-slate-500 flex justify-between">
            <span>{language === "en" ? "Critical axis:" : "Eje más crítico:"}</span>
            <span className="font-semibold text-red-500 font-mono">
              {lowestDimension.label} ({lowestDimension.score}%)
            </span>
          </div>
        </div>

        {/* Right: Maturity Levels Distribution */}
        <div className="col-span-4 bg-white border border-[#E4ECF2] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="text-[9.5px] font-bold text-[#1E252D] uppercase tracking-wider mb-1 font-['Outfit']">
            {t("analytics_maturity_dist")}
          </div>

          <div className="space-y-2 flex-1 flex flex-col justify-center">
            {Object.entries(levelCounts).map(([lvl, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const color = levelColors[lvl] || "#3B8AC4";
              const lvlInfo = getLocalizedLevel(lvl);
              return (
                <div key={lvl} className="space-y-0.5">
                  <div className="flex justify-between text-[9px] font-medium text-[#1E252D]">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="font-['Outfit'] truncate">{lvlInfo.short}</span>
                    </span>
                    <span className="font-mono font-bold tabular-nums text-slate-600 shrink-0">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F5F8FB] border border-[#E4ECF2] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-1.5 border-t border-slate-100 grid grid-cols-3 text-center text-[8.5px]">
            {Object.entries(levelCounts).map(([lvl, count]) => (
              <div key={lvl}>
                <div className="font-bold font-mono text-[11px]" style={{ color: levelColors[lvl] }}>
                  {count}
                </div>
                <div className="text-[7.5px] text-slate-400 font-medium truncate font-['Outfit']">
                  {lvl.split(":")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Demand Analysis: Priority Processes & Economic Sectors */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Priority Processes */}
        <div className="bg-white border border-[#E4ECF2] rounded-xl p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#1E252D] font-['Outfit'] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#3B8AC4]" />
              <span>{t("analytics_priority_processes")}</span>
            </span>
            <span className="text-[8px] text-slate-400 font-mono">
              {language === "en" ? "Dashboard Demand" : "Demanda de Tableros"}
            </span>
          </div>

          <div className="space-y-1.5">
            {sortedProcesses.slice(0, 4).map(([proc, count]) => {
              const widthPct = Math.round((count / maxProcVal) * 100);
              const totalPct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={proc} className="space-y-0.5">
                  <div className="flex justify-between text-[8.5px] font-medium text-[#1E252D]">
                    <span className="truncate pr-2">{proc}</span>
                    <span className="text-[#3B8AC4] font-semibold font-mono tabular-nums shrink-0">
                      {count} {t("analytics_clients_suffix")} ({totalPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F5F8FB] border border-[#E4ECF2] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-[#3B8AC4] rounded-full"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sectors and Obstacles (Combined 2-box column) */}
        <div className="bg-white border border-[#E4ECF2] rounded-xl p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#1E252D] font-['Outfit'] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#BFA898]" />
                <span>{t("analytics_sectors_dist")}</span>
              </span>
            </div>
            <div className="space-y-1">
              {sortedSectors.slice(0, 3).map(([sec, count]) => {
                const widthPct = Math.round((count / maxSectorVal) * 100);
                return (
                  <div key={sec} className="space-y-0.5">
                    <div className="flex justify-between text-[8px] text-slate-700">
                      <span className="truncate">{sec}</span>
                      <span className="font-mono font-semibold text-[#BFA898] tabular-nums">{count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                      <div className="h-full bg-[#BFA898] rounded-full" style={{ width: `${widthPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-1.5 mt-1 border-t border-slate-100">
            <div className="text-[8.5px] font-bold uppercase tracking-wider text-slate-500 font-['Outfit'] mb-0.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>{t("analytics_obstacles_dist")}</span>
            </div>
            <div className="text-[8px] text-slate-600 line-clamp-1">
              {sortedObstacles.slice(0, 2).map(([obs, count], idx) => (
                <span key={obs}>
                  {idx > 0 && " · "}
                  <strong className="text-slate-800">{obs}</strong> ({count})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Executive Strategic Insights (3-column summary cards) */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="bg-[#F0F7FC] border border-[#7EBCE6]/50 rounded-xl p-2">
          <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#1E5E94] font-['Outfit'] mb-0.5">
            {t("analytics_market_diagnostic")}
          </div>
          <p className="text-[8.5px] text-slate-700 leading-tight">
            {language === "en"
              ? `The portfolio shows an average score of ${avgScore} pts (${predominantLevelInfo.short}), highlighting an immediate need for data normalization and automated dashboards.`
              : `El portafolio promedia ${avgScore} pts (${predominantLevelInfo.short}), requiriendo principalmente etapas de normalización y tableros operativos directos.`}
          </p>
        </div>

        <div className="bg-[#FAF7F5] border border-[#BFA898]/50 rounded-xl p-2">
          <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#8C6D53] font-['Outfit'] mb-0.5">
            {t("analytics_bottleneck_label")}
          </div>
          <p className="text-[8.5px] text-slate-700 leading-tight">
            {language === "en"
              ? `${lowestDimension.label} is the lowest axis (${lowestDimension.score}%), driven by "${topObstacle}".`
              : `${lowestDimension.label} es el eje más rezagado (${lowestDimension.score}%), impulsado por "${topObstacle}".`}
          </p>
        </div>

        <div className="bg-[#F5F8FB] border border-[#E4ECF2] rounded-xl p-2">
          <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#1E252D] font-['Outfit'] mb-0.5">
            {t("analytics_opportunity_label")}
          </div>
          <p className="text-[8.5px] text-slate-700 leading-tight">
            {language === "en"
              ? `Maximum market demand is concentrated in "${topProcess}" (${topProcessCount} audits), representing the fastest ROI entry point.`
              : `Mayor tracción comercial en "${topProcess}" (${topProcessCount} relevamientos), representando el punto de entrada con retorno más rápido.`}
          </p>
        </div>
      </div>

      {/* 6. Institutional Footer & Single Sheet Assurance */}
      <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[8.5px] text-slate-500 font-['Inter']">
        <div>
          <span className="font-semibold text-[#1E252D]">I+S Data Solutions</span> · {t("report_header_subtitle")}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-slate-400">Hash: IS-ANALYTICS-N{total}-AVG{avgScore}</span>
          <span className="font-semibold text-[#1E252D] bg-slate-100 px-2 py-0.5 rounded">
            {t("report_page_info")}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-['Inter'] print:p-0 print:m-0 print:max-w-none">
      {/* Top Action Bar with View Toggle and Print Button (Matching ReportView) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h2 className="text-xl sm:text-2xl font-light text-[#1E252D] tracking-wide flex items-center gap-2 font-['Outfit']">
            <span>📊</span> {t("analytics_title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t("analytics_subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Mode Toggle: Standard vs A4 */}
          <div className="inline-flex rounded-xl border border-[#E4ECF2] bg-white p-1 shadow-2xs">
            <button
              onClick={() => setViewMode("standard")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer font-['Outfit'] ${
                viewMode === "standard"
                  ? "bg-[#3B8AC4] text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-[#1E252D]"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>{t("btn_view_full")}</span>
            </button>
            <button
              onClick={() => setViewMode("a4")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer font-['Outfit'] ${
                viewMode === "a4"
                  ? "bg-[#3B8AC4] text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-[#1E252D]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t("btn_view_a4")}</span>
            </button>
          </div>

          {/* Primary Print / Save as PDF Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white btn-primary cursor-pointer shadow-xs font-['Outfit']"
            title={t("btn_print_pdf")}
          >
            <Printer className="w-4 h-4" />
            <span>{t("btn_print_pdf")}</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          SCREEN VIEW: CONDITIONAL ON viewMode
          --------------------------------------------------------------------- */}
      {viewMode === "a4" ? (
        /* A4 Single-Page Preview Wrapper */
        <div className="print:hidden">
          <div className="mb-3 p-3 rounded-xl bg-sky-50 border border-[#7EBCE6]/50 flex items-center justify-between text-xs text-[#1E5E94]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#3B8AC4] shrink-0" />
              <span>
                <strong>{language === "en" ? "A4 Sheet Mode (1 Page):" : "Modo Vista A4 (1 Hoja):"}</strong>{" "}
                {t("analytics_a4_notice")}
              </span>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-[#3B8AC4] text-white font-medium rounded-lg text-xs hover:bg-[#3277AB] transition-colors shrink-0 cursor-pointer"
            >
              {t("btn_print_now")}
            </button>
          </div>

          {/* The A4 Canvas Mockup on Screen */}
          <div className="w-full max-w-[794px] mx-auto bg-white rounded-2xl shadow-[0_10px_35px_rgba(30,37,45,0.1)] border border-slate-300 p-6 sm:p-8">
            {renderA4SinglePage()}
          </div>
        </div>
      ) : (
        /* Standard Rich Interactive Screen View */
        <div className="space-y-6 print:hidden">
          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E4ECF2] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#3B8AC4] flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-['Outfit']">
                  {t("analytics_total_assessments")}
                </div>
                <div className="text-xl sm:text-2xl font-light text-[#1E252D] font-mono tabular-nums">{total}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E4ECF2] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#3B8AC4] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-['Outfit']">
                  {t("analytics_average_score")}
                </div>
                <div className="text-xl sm:text-2xl font-light text-[#1E252D] font-mono tabular-nums">
                  {avgScore} <span className="text-xs font-sans text-slate-400 font-normal">pts</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E4ECF2] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F5] text-[#BFA898] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-['Outfit']">
                  {t("analytics_max_score")}
                </div>
                <div className="text-xl sm:text-2xl font-light text-[#1E252D] font-mono tabular-nums">
                  {maxScore} <span className="text-xs font-sans text-slate-400 font-normal">pts</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E4ECF2] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-['Outfit']">
                  {t("analytics_min_score")}
                </div>
                <div className="text-xl sm:text-2xl font-light text-[#1E252D] font-mono tabular-nums">
                  {minScore} <span className="text-xs font-sans text-slate-400 font-normal">pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 1: Distribution by Level & Sectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E252D] font-['Outfit']">
                {t("analytics_maturity_dist")}
              </h3>

              <div className="space-y-3">
                {Object.entries(levelCounts).map(([lvl, count]) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const color = levelColors[lvl] || "#3B8AC4";
                  const lvlInfo = getLocalizedLevel(lvl);
                  return (
                    <div key={lvl} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-[#1E252D]">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                          <span className="font-['Outfit']">{lvlInfo.title}</span>
                        </span>
                        <span className="font-mono tabular-nums text-slate-500">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#F5F8FB] border border-[#E4ECF2] rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#E4ECF2] grid grid-cols-3 text-center text-xs">
                {Object.entries(levelCounts).map(([lvl, count]) => (
                  <div key={lvl}>
                    <div className="font-light text-base font-mono tabular-nums" style={{ color: levelColors[lvl] }}>
                      {count}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium truncate font-['Outfit']">
                      {lvl.split(":")[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sectors horizontal bars */}
            <div className="bg-white p-5 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E252D] font-['Outfit']">
                {t("analytics_sectors_dist")}
              </h3>

              <div className="space-y-2.5 pt-1">
                {sortedSectors.map(([sec, count]) => {
                  const widthPct = Math.round((count / maxSectorVal) * 100);
                  return (
                    <div key={sec} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-[#1E252D]">
                        <span className="truncate pr-2 font-['Outfit']">{sec}</span>
                        <span className="text-[#3B8AC4] font-semibold font-mono tabular-nums">{count}</span>
                      </div>
                      <div className="w-full bg-[#F5F8FB] border border-[#E4ECF2] rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-[#3B8AC4] rounded-full transition-all duration-500"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 2: Obstacles & Priority Processes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Obstacles */}
            <div className="bg-white p-5 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E252D] font-['Outfit']">
                {t("analytics_obstacles_dist")}
              </h3>
              <p className="text-xs text-slate-500">
                {language === "en" ? "Frictions reported with highest frequency by management:" : "Fricciones reportadas con mayor frecuencia por la dirección:"}
              </p>

              <div className="space-y-2.5 pt-1">
                {sortedObstacles.map(([obs, count]) => {
                  const widthPct = Math.round((count / maxObsVal) * 100);
                  return (
                    <div key={obs} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-[#1E252D]">
                        <span className="truncate pr-2">{obs}</span>
                        <span className="text-[#BFA898] font-semibold font-mono tabular-nums">
                          {count} {t("analytics_mentions_suffix")}
                        </span>
                      </div>
                      <div className="w-full bg-[#F5F8FB] border border-[#E4ECF2] rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-[#BFA898] rounded-full transition-all duration-500"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Priority Processes */}
            <div className="bg-white p-5 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E252D] font-['Outfit']">
                {t("analytics_priority_processes")}
              </h3>
              <p className="text-xs text-slate-500">
                {language === "en" ? "Areas where companies demand their first implementation:" : "Áreas donde los clientes demandan su primera implementación:"}
              </p>

              <div className="space-y-2.5 pt-1">
                {sortedProcesses.map(([proc, count]) => {
                  const widthPct = Math.round((count / maxProcVal) * 100);
                  return (
                    <div key={proc} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-[#1E252D]">
                        <span className="truncate pr-2">{proc}</span>
                        <span className="text-[#3B8AC4] font-semibold font-mono tabular-nums">
                          {count} {t("analytics_clients_suffix")}
                        </span>
                      </div>
                      <div className="w-full bg-[#F5F8FB] border border-[#E4ECF2] rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-[#3B8AC4] rounded-full transition-all duration-500"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 3: Average Portfolio Radar */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-light text-[#1E252D] tracking-wide font-['Outfit']">
                {t("analytics_radar_title")}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("analytics_radar_subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <RadarChart
                  dimensiones={avgDimensions}
                  color="#3B8AC4"
                  fillColor="rgba(59, 138, 196, 0.22)"
                  size={320}
                />
              </div>

              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-['Outfit']">
                  {language === "en" ? "Consolidated Dimension Breakdown" : "Desglose de Promedios Generales"}
                </div>
                {dimensionList.map((dim) => (
                  <div key={dim.key} className="flex items-center justify-between p-2.5 bg-[#F5F8FB] rounded-xl border border-[#E4ECF2]">
                    <span className="text-xs font-medium text-[#1E252D] font-['Outfit']">{dim.label}</span>
                    <span className="text-xs font-semibold text-[#3B8AC4] font-mono tabular-nums bg-white px-2 py-0.5 rounded-md border border-[#7EBCE6]/30">
                      {dim.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          PRINT ENGINE: ALWAYS RENDERS THE A4 SINGLE-PAGE WHEN PRINTING
          Hidden on screen, shown exclusively when window.print() is active
          --------------------------------------------------------------------- */}
      <div className="hidden print:block w-full">
        {renderA4SinglePage()}
      </div>
    </div>
  );
};
