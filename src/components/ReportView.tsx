import React, { useState } from "react";
import { Interview } from "../types";
import { MATRIZ_EVALUACION } from "../config/constants";
import { GaugeChart } from "./charts/GaugeChart";
import { RadarChart } from "./charts/RadarChart";
import {
  ArrowLeft,
  Printer,
  Building2,
  User,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Layout,
  Check
} from "lucide-react";
import { ContrailCurves } from "./BrandHeader";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface ReportViewProps {
  interview: Interview;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const ReportView: React.FC<ReportViewProps> = ({
  interview,
  onBack,
  showBackButton = true
}) => {
  const [viewMode, setViewMode] = useState<"standard" | "a4">("standard");
  const { t, language, getLocalizedLevel } = useLanguage();

  const localizedLevel = getLocalizedLevel(interview.nivel_madurez);
  const matrizInfo =
    MATRIZ_EVALUACION[interview.nivel_madurez] ||
    MATRIZ_EVALUACION["Nivel 1: Inicial / Disperso"];

  const handlePrint = () => {
    window.print();
  };

  const sectorDisplay =
    interview.sector === "Otro" && interview.sector_otro
      ? `${language === "en" ? "Other" : "Otro"} (${interview.sector_otro})`
      : interview.sector;

  const procesoPrioDisplay =
    interview.proceso_prioritario === "Otro" && interview.proceso_prioritario_otro
      ? `${language === "en" ? "Other" : "Otro"} (${interview.proceso_prioritario_otro})`
      : interview.proceso_prioritario;

  const formattedDate = interview.created_at
    ? interview.created_at.substring(0, 10)
    : new Date().toISOString().substring(0, 10);

  const reportId = `IS-DIAG-${String(interview.id || "001").padStart(4, "0")}`;

  /* Dimension list for the compact breakdown bars */
  const dimensionList = [
    { key: "Almacenamiento y Fuentes", label: t("dim_storage"), score: interview.dimensiones["Almacenamiento y Fuentes"] ?? 0 },
    { key: "Integración entre Áreas", label: t("dim_integration"), score: interview.dimensiones["Integración entre Áreas"] ?? 0 },
    { key: "Frecuencia de Actualización", label: t("dim_frequency"), score: interview.dimensiones["Frecuencia de Actualización"] ?? 0 },
    { key: "Calidad y Consistencia", label: t("dim_quality"), score: interview.dimensiones["Calidad y Consistencia"] ?? 0 },
    { key: "Eficiencia de Reportes", label: t("dim_reporting"), score: interview.dimensiones["Eficiencia de Reportes"] ?? 0 }
  ];

  /* -------------------------------------------------------------------------
     RENDER A4 SINGLE-PAGE COMPONENT
     Engineered to fit strictly on 1 single A4 sheet without cutoffs
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
                {language === "en" ? "A4 DIAGNOSIS" : "DIAGNÓSTICO A4"}
              </span>
            </div>
            <p className="text-[9.5px] text-slate-500 font-medium">
              {t("report_header_subtitle")}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono font-bold text-[#1E252D]">{reportId}</div>
          <div className="text-[9px] text-slate-500 font-mono">{language === "en" ? "Date: " : "Fecha: "}{formattedDate}</div>
          <div className="text-[8.5px] text-[#3B8AC4] font-semibold uppercase tracking-wider">
            {t("badge_official")}
          </div>
        </div>
      </div>

      {/* 2. Client Profile Ribbon */}
      <div className="bg-[#F5F8FB] border border-[#E4ECF2] rounded-xl p-2.5 mb-2.5 flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#BFA898] font-['Outfit']">
              {t("report_assessed_company")}
            </span>
          </div>
          <div className="text-base font-bold text-[#1E252D] font-['Outfit'] leading-tight">
            {interview.empresa}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-slate-600">
            <span>
              <strong className="text-[#1E252D]">{t("report_contact")}:</strong> {interview.responsable_nombre}
              {interview.responsable_rol ? ` (${interview.responsable_rol})` : ""}
            </span>
            <span>·</span>
            <span>
              <strong className="text-[#1E252D]">{t("report_sector")}:</strong> {sectorDisplay}
            </span>
            <span>·</span>
            <span>
              <strong className="text-[#1E252D]">{t("report_size")}:</strong> {interview.colaboradores} {t("report_collaborators")}
            </span>
          </div>
        </div>

        {/* Diagnosis Badge & Score */}
        <div className="text-right shrink-0 bg-white border border-[#E4ECF2] rounded-lg px-3 py-1.5 shadow-2xs">
          <span className="text-[8.5px] uppercase font-bold tracking-wider text-slate-400 block font-['Outfit']">
            {t("report_official_verdict")}
          </span>
          <div className="text-xs font-bold text-[#1E252D] font-['Outfit']">
            {localizedLevel.title}
          </div>
          <div className="text-[10px] font-mono font-semibold text-[#3B8AC4]">
            {interview.score_global} / 100 pts
          </div>
        </div>
      </div>

      {/* 3. Visual Charts Grid (Gauge + Radar + Dimensions) */}
      <div className="grid grid-cols-12 gap-2 mb-2.5">
        {/* Left: Gauge Chart */}
        <div className="col-span-4 bg-white border border-[#E4ECF2] rounded-xl p-2 flex flex-col items-center justify-center text-center">
          <div className="text-[9.5px] font-bold text-[#1E252D] uppercase tracking-wider mb-1 font-['Outfit']">
            {t("report_maturity_index")}
          </div>
          <GaugeChart
            value={interview.score_global}
            label={localizedLevel.short}
            badgeColor={matrizInfo.badge_color}
            compact={true}
          />
          <div className="w-full grid grid-cols-3 gap-1 text-[7.5px] text-slate-500 mt-1 pt-1 border-t border-slate-100 font-mono text-center">
            <span className="text-red-500 font-semibold">{language === "en" ? "0-45 Dispersed" : "0-45 Disperso"}</span>
            <span className="text-[#BFA898] font-semibold">{language === "en" ? "46-75 Operational" : "46-75 Operativo"}</span>
            <span className="text-[#3B8AC4] font-semibold">{language === "en" ? "76-100 Ready" : "76-100 Avanzado"}</span>
          </div>
        </div>

        {/* Center: Radar Chart */}
        <div className="col-span-4 bg-white border border-[#E4ECF2] rounded-xl p-2 flex flex-col items-center justify-center text-center">
          <div className="text-[9.5px] font-bold text-[#1E252D] uppercase tracking-wider mb-0.5 font-['Outfit']">
            {t("report_pentagonal_radar")}
          </div>
          <RadarChart
            dimensiones={interview.dimensiones}
            size={165}
            compact={true}
          />
        </div>

        {/* Right: Dimension Bars */}
        <div className="col-span-4 bg-white border border-[#E4ECF2] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="text-[9.5px] font-bold text-[#1E252D] uppercase tracking-wider mb-1 font-['Outfit']">
            {t("report_dimension_scores")}
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
        </div>
      </div>

      {/* 4. Dictamen y Solución Recomendada (2-column compact) */}
      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <div className="bg-white border border-[#E4ECF2] rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-[#BFA898]" />
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-600 font-['Outfit']">
              {t("report_diagnostic_criteria")}
            </span>
          </div>
          <p className="text-[9.5px] text-slate-700 leading-snug">
            {localizedLevel.criteria}
          </p>
        </div>

        <div className="bg-[#F0F7FC] border border-[#7EBCE6]/60 rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8AC4]" />
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#1E5E94] font-['Outfit']">
              {t("report_recommended_solution")}
            </span>
          </div>
          <p className="text-[9.5px] text-[#1E252D] font-medium leading-snug">
            {localizedLevel.solution}
          </p>
        </div>
      </div>

      {/* 5. Plan de Acción Prioritario (4 Horizontal Steps) */}
      <div className="mb-2.5">
        <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-['Outfit'] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3B8AC4]" />
          <span>{t("report_immediate_action_plan")}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {matrizInfo.prioridades_clave.map((paso, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E4ECF2] rounded-lg p-2 flex flex-col justify-between"
            >
              <div className="text-[8.5px] font-mono font-bold text-[#3B8AC4] uppercase mb-0.5">
                {t("report_step_prefix")} {idx + 1}
              </div>
              <p className="text-[8.5px] text-slate-700 font-medium leading-tight line-clamp-3">
                {paso}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Relevamiento Operativo y Expectativas (2 Columns) */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Left: Relevamiento Operativo */}
        <div className="bg-white border border-[#E4ECF2] rounded-xl p-2.5 space-y-1">
          <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#1E252D] border-b border-slate-100 pb-1 font-['Outfit']">
            {t("report_operational_assessment")}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-slate-700">
            <div>
              <span className="font-semibold text-[#1E252D]">{t("report_integration")}: </span>
              {interview.integracion_nivel}
            </div>
            <div>
              <span className="font-semibold text-[#1E252D]">{t("report_frequency")}: </span>
              {interview.frecuencia_actualizacion}
            </div>
            <div>
              <span className="font-semibold text-[#1E252D]">{t("report_confidence")}: </span>
              {interview.confianza_datos}
            </div>
            <div>
              <span className="font-semibold text-[#1E252D]">{t("report_current_tool")}: </span>
              {interview.herramienta_visualizacion}
            </div>
          </div>
          <div className="text-[8.5px] text-slate-600 pt-0.5">
            <span className="font-semibold text-[#1E252D]">{t("report_storage_sources")}: </span>
            {interview.almacenamiento_fuentes && interview.almacenamiento_fuentes.length > 0
              ? interview.almacenamiento_fuentes.join(", ")
              : (language === "en" ? "Not specified" : "No especificadas")}
          </div>
        </div>

        {/* Right: Objetivos y Expectativas */}
        <div className="bg-white border border-[#E4ECF2] rounded-xl p-2.5 space-y-1">
          <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#1E252D] border-b border-slate-100 pb-1 font-['Outfit']">
            {t("report_goals_expectations")}
          </div>
          <div className="text-[9px] text-slate-700 space-y-0.5">
            <div>
              <span className="font-semibold text-[#1E252D]">{t("report_priority_process")}: </span>
              <span className="text-[#3B8AC4] font-semibold">{procesoPrioDisplay}</span>
            </div>
            <div>
              <span className="font-semibold text-[#1E252D]">{t("report_expected_value")}: </span>
              <span className="text-slate-600">{interview.valor_esperado}</span>
            </div>
            {interview.obstaculos_decision && interview.obstaculos_decision.length > 0 && (
              <div className="text-[8.5px] text-slate-600 truncate">
                <span className="font-semibold text-[#1E252D]">{t("report_obstacles")}: </span>
                {interview.obstaculos_decision.join(" · ")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 7. Institutional Footer & Single Sheet Assurance */}
      <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[8.5px] text-slate-500 font-['Inter']">
        <div>
          <span className="font-semibold text-[#1E252D]">I+S Data Solutions</span> · {t("report_header_subtitle")}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-slate-400">Hash: {interview.id || "001"}-{interview.score_global}</span>
          <span className="font-semibold text-[#1E252D] bg-slate-100 px-2 py-0.5 rounded">
            {t("report_page_info")}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12 print:p-0 print:m-0 print:max-w-none">
      {/* Top Action Bar with View Toggle and Print Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
        {showBackButton && onBack ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1E252D] bg-white border border-[#E4ECF2] rounded-xl hover:bg-[#F5F8FB] transition-colors shadow-2xs cursor-pointer font-['Outfit']"
          >
            <ArrowLeft className="w-4 h-4 text-[#3B8AC4]" />
            {t("btn_back_to_list")}
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2 ml-auto">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Mode toggle */}
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

          {/* Primary Print / Save PDF Button */}
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
                <strong>Modo Vista A4 (1 Hoja):</strong> Este diseño está calibrado para imprimirse o guardarse en PDF en <strong>exactamente una sola hoja A4</strong> sin cortes ni desbordes.
              </span>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-[#3B8AC4] text-white font-medium rounded-lg text-xs hover:bg-[#3277AB] transition-colors shrink-0 cursor-pointer"
            >
              Imprimir Ahora
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
          {/* Executive Header Banner styled with Aviation Sky & Deep Grafito */}
          <div className="relative rounded-2xl overflow-hidden border border-[#E4ECF2] shadow-[0px_4px_16px_rgba(30,37,45,0.08)] bg-[#1E252D] text-white">
            <ContrailCurves className="opacity-40" />

            <div className="relative p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-sky-200">
                  <span className="font-semibold tracking-widest uppercase text-[#BFA898] font-['Outfit']">
                    INFORME DE EVALUACIÓN BI
                  </span>
                  <span aria-hidden="true" className="text-[#7EBCE6]/60">·</span>
                  <span className="font-mono tabular-nums text-sky-200">
                    {formattedDate}
                  </span>
                  <span aria-hidden="true" className="text-[#7EBCE6]/60">·</span>
                  <span className="font-mono tabular-nums text-sky-200">
                    {reportId}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-light text-white tracking-wide font-['Outfit']">
                  {interview.empresa}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-sky-100/90 pt-0.5 font-['Inter']">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#7EBCE6]" />
                    <span className="font-medium text-white">{interview.responsable_nombre}</span>
                    {interview.responsable_rol && ` (${interview.responsable_rol})`}
                  </span>
                  <span aria-hidden="true" className="text-sky-300/40">·</span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#7EBCE6]" />
                    <span>{sectorDisplay}</span>
                  </span>
                  <span aria-hidden="true" className="text-sky-300/40">·</span>
                  <span className="font-mono tabular-nums text-sky-200">
                    {interview.colaboradores} colaboradores
                  </span>
                </div>
              </div>

              <div className="self-start md:self-auto p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md min-w-[210px] text-left md:text-right">
                <span className="text-[11px] uppercase font-semibold tracking-wider text-sky-200 block font-['Outfit']">
                  Diagnóstico Oficial
                </span>
                <div className="text-base sm:text-lg font-light text-white mt-1 font-['Outfit']">
                  {interview.nivel_madurez}
                </div>
                <div className="text-xs text-sky-100 font-mono tabular-nums mt-1">
                  Score: <span className="text-base font-semibold text-white">{interview.score_global}</span> / 100 pts
                </div>
              </div>
            </div>
          </div>

          {/* Visual Analytics Grid: Gauge & Radar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-light text-[#1E252D] mb-3 flex items-center gap-2 font-['Outfit'] tracking-wide">
                <span className="text-[#3B8AC4]">✦</span> Índice de Madurez Global
              </h3>
              <GaugeChart
                value={interview.score_global}
                label="Nivel de Preparación BI"
                badgeColor={matrizInfo.badge_color}
              />
            </div>

            <div>
              <h3 className="text-sm font-light text-[#1E252D] mb-3 flex items-center gap-2 font-['Outfit'] tracking-wide">
                <span className="text-[#3B8AC4]">✦</span> Evaluación por Dimensiones Clave
              </h3>
              <RadarChart dimensiones={interview.dimensiones} />
            </div>
          </div>

          {/* Official Matrix Recommendation Cards */}
          <div className="border-t border-[#E4ECF2] pt-6 space-y-3">
            <h3 className="text-base font-light text-[#1E252D] flex items-center gap-2 font-['Outfit'] tracking-wide">
              <span className="text-[#3B8AC4]">✦</span> Dictamen y Solución Recomendada (Matriz Oficial)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-[#E4ECF2] bg-[#FFFFFF] shadow-xs space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-['Outfit']">
                  Criterio Diagnóstico
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal font-['Inter']">
                  {matrizInfo.criterio}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-[#7EBCE6]/50 bg-sky-50/40 shadow-xs space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#3B8AC4] font-['Outfit']">
                  Solución Inicial Recomendada
                </div>
                <p className="text-xs sm:text-sm text-[#1E252D] leading-relaxed font-medium font-['Inter']">
                  {matrizInfo.solucion}
                </p>
              </div>
            </div>
          </div>

          {/* Action Plan Steps */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 font-['Outfit']">
              Plan de Acción y Prioridades Clave
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {matrizInfo.prioridades_clave.map((paso, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-[#E4ECF2] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold font-mono text-[#3B8AC4] tracking-wider uppercase block mb-1">
                      PASO {idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 font-normal leading-snug font-['Inter']">
                      {paso}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Survey Findings */}
          <div className="border-t border-[#E4ECF2] pt-6">
            <h3 className="text-base font-light text-[#1E252D] mb-4 flex items-center gap-2 font-['Outfit'] tracking-wide">
              <span className="text-[#3B8AC4]">✦</span> Relevamiento Detallado de Información
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1: Infrastructure */}
              <div className="bg-white p-5 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-3 font-['Inter']">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E252D] border-b border-[#E4ECF2] pb-2 font-['Outfit']">
                  Infraestructura y Datos Actuales
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="font-medium text-[#1E252D]">Integración entre áreas: </span>
                    {interview.integracion_nivel}
                  </div>
                  <div>
                    <span className="font-medium text-[#1E252D]">Frecuencia de actualización: </span>
                    {interview.frecuencia_actualizacion}
                  </div>
                  <div>
                    <span className="font-medium text-[#1E252D]">Confianza en los datos: </span>
                    {interview.confianza_datos}
                  </div>
                  <div>
                    <span className="font-medium text-[#1E252D]">Herramienta actual: </span>
                    {interview.herramienta_visualizacion}
                  </div>
                  <div>
                    <span className="font-medium text-[#1E252D]">Tiempo de reportabilidad: </span>
                    {interview.tiempo_reporte}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E4ECF2]">
                  <span className="font-medium text-[#1E252D] text-xs block mb-1.5 font-['Outfit']">
                    Fuentes donde se almacena la información:
                  </span>
                  {interview.almacenamiento_fuentes && interview.almacenamiento_fuentes.length > 0 ? (
                    <ul className="space-y-1">
                      {interview.almacenamiento_fuentes.map((f, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-[#3B8AC4] mt-0.5">•</span>
                          <span>
                            {f}
                            {f === "Otro" && interview.almacenamiento_otro
                              ? ` (${interview.almacenamiento_otro})`
                              : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No especificadas</span>
                  )}
                </div>
              </div>

              {/* Column 2: Objectives & Obstacles */}
              <div className="bg-white p-5 rounded-2xl border border-[#E4ECF2] shadow-xs space-y-3 font-['Inter']">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E252D] border-b border-[#E4ECF2] pb-2 font-['Outfit']">
                  Objetivos y Expectativas del Cliente
                </h4>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="font-medium text-[#1E252D]">Proceso prioritario: </span>
                    <span className="text-[#3B8AC4] font-semibold">
                      {procesoPrioDisplay}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1E252D]">Valor principal esperado: </span>
                    <div className="text-slate-700 font-normal mt-0.5">{interview.valor_esperado}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E4ECF2]">
                  <span className="font-medium text-[#1E252D] text-xs block mb-1.5 font-['Outfit']">
                    Principales obstáculos reportados:
                  </span>
                  {interview.obstaculos_decision && interview.obstaculos_decision.length > 0 ? (
                    <ul className="space-y-1.5">
                      {interview.obstaculos_decision.map((obs, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-700 bg-[#F5F8FB] px-3 py-1.5 rounded-xl border border-[#E4ECF2] flex items-center gap-2"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-[#BFA898] shrink-0" />
                          <span>{obs}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Ninguno especificado</span>
                  )}
                </div>

                {interview.observaciones_consultor && (
                  <div className="pt-2 border-t border-[#E4ECF2]">
                    <span className="font-medium text-[#1E252D] text-xs block mb-1 font-['Outfit']">
                      Notas del Consultor:
                    </span>
                    <div className="bg-sky-50/40 border border-[#7EBCE6]/40 rounded-xl p-3 text-xs text-slate-700 italic leading-relaxed">
                      "{interview.observaciones_consultor}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          PRINT ENGINE: ALWAYS RENDERS THE A4 SINGLE-PAGE WHEN PRINTING
          Hidden on screen unless viewMode === 'a4' (handled above)
          When printing via window.print(), this is the ONLY container shown
          --------------------------------------------------------------------- */}
      <div className="hidden print:block w-full">
        {renderA4SinglePage()}
      </div>
    </div>
  );
};
