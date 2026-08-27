import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import {
  ShieldCheck,
  Boxes,
  Receipt,
  Sparkles,
  Zap,
  Users,
  Award,
  ArrowRight,
  Github,
  Linkedin,
  Lightbulb,
  CheckCircle2,
  Code2,
  Database,
  Layers,
  FileCheck,
} from 'lucide-react';

export const About: React.FC = () => {
  const activeTeam = [
    {
      name: 'Emmanuel Joshua',
      role: 'Full-Stack Architecture & Design Systems',
      bio: 'Orchestrated end-to-end cloud infrastructure, real-time WebSocket state syncing, industrial UI craftsmanship, and API gateway routing.',
      skills: ['React 19 / Vite', 'FastAPI Async', 'System Design', 'Real-time Telemetry'],
      github: 'https://github.com/Emman-code',
      linkedin: 'https://linkedin.com',
      avatarInitial: 'EJ',
    },
    {
      name: 'Aravinth P',
      role: 'Backend Infrastructure & Database Architecture',
      bio: 'Designed the relational database schema, company-scoped tenant isolation, sequential purchase order state machine, and data persistence.',
      skills: ['PostgreSQL', 'SQLAlchemy 2.0', 'Alembic Migrations', 'Security RBAC'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      avatarInitial: 'AP',
    },
    {
      name: 'Bavish',
      role: 'Procurement Logic & Inventory Ledger',
      bio: 'Implemented the atomic stock reservation ledger, multi-supplier procurement cart grouping, and order settlement business workflows.',
      skills: ['Inventory Algorithms', 'Checkout Service', 'State Validation', 'REST APIs'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      avatarInitial: 'B',
    },
    {
      name: 'Kathirvel',
      role: 'Frontend Engineering & Quality Assurance',
      bio: 'Built responsive client components, role-guarded routing, automated UI validation, and user experience refinements.',
      skills: ['TypeScript', 'Component Architecture', 'Tailwind CSS', 'Integration QA'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      avatarInitial: 'K',
    },
  ];

  const ideationPioneers = [
    {
      name: 'Kishore Es',
      contribution: 'Core Problem Statement & Market Ideation',
      detail: 'Spearheaded the initial conceptual framework, identifying wholesale communication bottlenecks and supplier overselling friction.',
      badge: 'Foundational Ideator',
    },
    {
      name: 'Mirula',
      contribution: 'Domain Research & Workflow Blueprinting',
      detail: 'Conducted field analysis on retail supermarket ordering patterns and structured the early buyer-supplier procurement lifecycle.',
      badge: 'Foundational Ideator',
    },
    {
      name: 'Aravinth P',
      contribution: 'Technical Architecture & Initial Scaffolding',
      detail: 'Translated domain insights into the initial relational data models, permission structures, and baseline backend services.',
      badge: 'Core Contributor',
    },
    {
      name: 'Bavish',
      contribution: 'Inventory Mechanics & Order Flow Conception',
      detail: 'Defined the initial three-way inventory balance formulas and purchase order state progression logic.',
      badge: 'Core Contributor',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] dark:bg-[#0D0E12] text-[#111216] dark:text-[#F8F8FA] selection:bg-amber-500/20 selection:text-amber-950 font-sans">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20">
        {/* ========================================================= */}
        {/* 1. HERO & VISION                                          */}
        {/* ========================================================= */}
        <section className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            <Zap size={13} className="text-amber-600 dark:text-amber-400" />
            <span>Crafted by Team ThunderBoltz</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
            Architected for precision. Built for real trade.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Flowza was born out of a simple observation: millions of wholesale transactions still run on unstructured WhatsApp messages, paper memos, and spreadsheet attachments. We built a shared purchase-order workspace where retailers and suppliers coordinate with absolute clarity.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 2. FOUNDING IDEATION & PROBLEM CREDITS RECOGNITION        */}
        {/* ========================================================= */}
        <section id="ideation" className="scroll-mt-24 space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#12141A] border border-amber-500/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Award size={16} />
                  <span>Foundational Ideation &amp; Problem Statement Credits</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
                  The Genesis of Flowza
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 self-start md:self-auto">
                Project Origins &amp; Base Structure
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-5 pb-6">
              The initial problem statement, market research, and structural foundations of Flowza were conceived and formulated during the project's inception. We proudly credit and recognize <strong>Kishore Es</strong>, <strong>Mirula</strong>, <strong>Aravinth P</strong>, and <strong>Bavish</strong> for identifying the critical friction points in traditional Indian B2B wholesale trade and shaping the core architectural problem statement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ideationPioneers.map((person, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-50 dark:bg-[#161822] border border-neutral-200 dark:border-neutral-800/80 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-sm font-bold text-neutral-950 dark:text-white">
                        {person.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-400 block">
                      {person.contribution}
                    </span>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
                      {person.detail}
                    </p>
                  </div>
                  <span className="mt-3 inline-block px-2 py-0.5 text-[9px] font-mono uppercase font-bold tracking-wider rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 w-fit">
                    {person.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. ACTIVE ENGINEERING TEAM: THUNDERBOLTZ                  */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
              Engineering &amp; Production Team
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
              Meet Team ThunderBoltz
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              The full-stack engineering unit responsible for building, scaling, and deploying Flowza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTeam.map((member, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-5 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Avatar & Socials */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white dark:bg-amber-500 dark:text-neutral-950 font-heading font-extrabold flex items-center justify-center text-sm shadow-xs">
                        {member.avatarInitial}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-neutral-950 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        title="GitHub Profile"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={16} />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap gap-1.5">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. THE 4 ARCHITECTURAL PILLARS                            */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
              Engineering Architecture
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
              Built on 4 Core Foundations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Boxes size={18} />
              </div>
              <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
                Atomic Stock Reservations
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Stock is locked in real-time upon order confirmation with transactional safety (<code className="font-mono text-neutral-800 dark:text-neutral-200">Available = On-Hand - Reserved</code>), completely preventing concurrent overselling.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Receipt size={18} />
              </div>
              <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
                GST-Ready Tax Breakdown
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Automated intra-state (CGST + SGST) and inter-state (IGST) calculation based on verified company GSTINs and product tax rates with in-memory PDF rendering.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
                Company Tenant Isolation
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Every database query is strictly scoped by company and role boundaries via OAuth2 JWT tokens, ensuring complete commercial confidentiality.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <h3 className="font-heading text-base font-bold text-neutral-950 dark:text-white">
                Grounded AI Business Copilot
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Google Gemini agent armed with deterministic SQL analytical tools that query real-time database records to answer inventory and order status questions.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CALL TO ACTION                                         */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-2xl bg-neutral-950 text-white dark:bg-[#14161F] border border-neutral-800 text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to experience Flowza?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Test drive the shared purchase order workflow as a Retailer or Wholesale Supplier.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold font-mono bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Choose Your Workspace →</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
