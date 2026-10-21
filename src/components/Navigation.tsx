import React, { useState } from "react";
import {
  FileText,
  Briefcase,
  Settings,
  BarChart3,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  HardDrive,
  Edit2,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { AppSquircleIcon } from "./BrandHeader";

export type NavModule = "form" | "proposal" | "admin" | "analytics" | "methodology";

interface NavigationProps {
  currentModule: NavModule;
  onSelectModule: (module: NavModule) => void;
  interviewCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentModule,
  onSelectModule,
  interviewCount
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { guestUser, updateGuestProfile, resetGuestProfile } = useAuth();

  // Profile Edit Modal State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState(guestUser.name);
  const [editRole, setEditRole] = useState(guestUser.role);

  const handleOpenEditProfile = () => {
    setEditName(guestUser.name);
    setEditRole(guestUser.role);
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateGuestProfile(editName.trim() || "Consultor Invitado", editRole.trim());
    setShowEditProfileModal(false);
  };

  const handleResetProfile = () => {
    resetGuestProfile();
    setEditName("Consultor Invitado");
    setEditRole("Especialista en Business Intelligence");
    setShowEditProfileModal(false);
  };

  const menuItems: { id: NavModule; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "form",
      label: "Nueva Entrevista",
      icon: <FileText className="w-4 h-4 text-[#3B8AC4]" />
    },
    {
      id: "proposal",
      label: "Propuesta de Trabajo",
      icon: <Briefcase className="w-4 h-4 text-[#BFA898]" />
    },
    {
      id: "admin",
      label: "Administración",
      icon: <Settings className="w-4 h-4 text-[#1E252D]" />,
      badge: interviewCount > 0 ? interviewCount.toString() : undefined
    },
    {
      id: "analytics",
      label: "Analítica de Clientes",
      icon: <BarChart3 className="w-4 h-4 text-[#3B8AC4]" />
    },
    {
      id: "methodology",
      label: "Matriz & Metodología",
      icon: <HelpCircle className="w-4 h-4 text-slate-500" />
    }
  ];

  const handleSelect = (mod: NavModule) => {
    onSelectModule(mod);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Glassmorphic Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 glass-header sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <AppSquircleIcon size={38} />
          <div>
            <div className="text-xs font-semibold text-[#1E252D] font-['Outfit'] tracking-tight leading-tight">
              Information + Solutions
            </div>
            <div className="text-[10px] text-[#2C6E9E] font-normal tracking-wider uppercase font-['Outfit'] mt-0.5">
              Data Solutions
            </div>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#1E252D] hover:bg-white rounded-xl border border-[#E4ECF2] bg-white/70 cursor-pointer transition-colors"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#1E252D]/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#F5F8FB] border-r border-[#E4ECF2] flex flex-col p-4 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="pb-4 mb-3 border-b border-[#E4ECF2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppSquircleIcon size={42} />
            <div>
              <h2 className="text-sm font-semibold text-[#1E252D] tracking-tight font-['Outfit'] leading-tight">
                Information + Solutions
              </h2>
              <div className="text-[10px] font-normal text-[#2C6E9E] tracking-widest uppercase font-['Outfit'] mt-0.5">
                Data Solutions
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest Access Profile Card */}
        <div className="mb-4 bg-white p-3.5 rounded-2xl border border-[#E4ECF2] shadow-[0px_2px_8px_rgba(30,37,45,0.04)]">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1E252D] font-['Outfit']">
              <HardDrive className="w-3.5 h-3.5 text-[#3B8AC4]" />
              <span>Acceso Invitado</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border bg-sky-50 text-[#3B8AC4] border-[#7EBCE6]/50">
              Modo Invitado
            </span>
          </div>

          <div className="pt-2 border-t border-[#E4ECF2] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3B8AC4] to-[#1E5E94] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs font-['Outfit']">
                {guestUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#1E252D] truncate font-['Outfit']">
                  {guestUser.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate font-['Inter']">
                  {guestUser.role}
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenEditProfile}
              title="Personalizar datos del consultor"
              className="p-1.5 text-slate-400 hover:text-[#3B8AC4] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Editar perfil de consultor"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Almacenamiento Local</span>
            </span>
            <span className="font-mono tabular-nums text-slate-600 font-medium">
              {interviewCount} {interviewCount === 1 ? "registro" : "registros"}
            </span>
          </div>
        </div>

        {/* Modules Navigation */}
        <div className="mb-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 px-2 font-['Outfit']">
            Módulos del Sistema
          </span>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-white text-[#3B8AC4] border border-[#7EBCE6]/50 shadow-xs font-semibold"
                      : "bg-transparent text-slate-700 hover:bg-white/80 hover:text-[#1E252D]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {item.icon}
                    <span className="font-['Inter']">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-md bg-sky-50 text-[#3B8AC4] font-semibold border border-[#7EBCE6]/30">
                      {item.badge}
                    </span>
                  ) : (
                    active && <ChevronRight className="w-3.5 h-3.5 text-[#3B8AC4]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Philosophy Card */}
        <div className="mt-auto pt-4">
          <div className="bg-white rounded-2xl p-3.5 border border-[#E4ECF2] shadow-xs text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-medium text-[#1E252D] text-[11px] font-['Outfit']">
              <Sparkles className="w-3.5 h-3.5 text-[#3B8AC4]" />
              <span>Propuesta de Valor I+S</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-['Inter'] italic">
              "El valor real no está en acumular datos, sino en saber utilizarlos para decidir mejor."
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-[#E4ECF2] flex items-center justify-between text-[10.5px] text-slate-500 font-medium px-1">
            <span>E. Carriego N° 431, La Rioja</span>
            <span className="font-bold text-[#2C6E9E] font-['Outfit']">I+S Data</span>
          </div>
        </div>
      </aside>

      {/* Profile Edit Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-[#1E252D]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#E4ECF2] shadow-2xl p-6 space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between gap-2 border-b border-[#E4ECF2] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#3B8AC4] flex items-center justify-center font-bold">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1E252D] font-['Outfit']">
                    Perfil del Consultor
                  </h3>
                  <p className="text-xs text-slate-500 font-['Inter']">
                    Personaliza el nombre que figurará en los informes y propuestas
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E252D] mb-1 font-['Outfit']">
                  Nombre del Consultor / Responsable:
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Ej: Ing. Diego Andrada"
                  required
                  className="w-full px-3.5 py-2 text-xs border border-[#E4ECF2] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#7EBCE6] focus:border-[#3B8AC4] bg-white transition-all font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E252D] mb-1 font-['Outfit']">
                  Cargo o Rol Profesional:
                </label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  placeholder="Ej: Consultor Senior BI & Analítica"
                  className="w-full px-3.5 py-2 text-xs border border-[#E4ECF2] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#7EBCE6] focus:border-[#3B8AC4] bg-white transition-all font-['Inter']"
                />
              </div>

              <div className="bg-[#F5F8FB] p-3 rounded-xl border border-[#E4ECF2] text-[11px] text-slate-600 space-y-1">
                <span className="font-semibold text-[#1E252D] block font-['Outfit']">
                  Acerca del Modo Invitado:
                </span>
                <p>
                  Esta información se almacena localmente en tu navegador. Tus reportes, diagnósticos y propuestas generadas llevarán esta firma profesional.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E4ECF2]">
                <button
                  type="button"
                  onClick={handleResetProfile}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-[#F5F8FB] border border-[#E4ECF2] cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white btn-primary flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Guardar Perfil</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
