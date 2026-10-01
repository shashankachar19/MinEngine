import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SimulationState, initialState, SIMULATION_LOGS } from './simulationState';

interface SimContextType {
  state: SimulationState;
  missionStarted: boolean;
  startMission: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  approveAndResolve: () => void;
  visibleLogs: typeof SIMULATION_LOGS;
  closePlanPanel: () => void;
  openApprovalModal: () => void;
  closeApprovalModal: () => void;
  closeImpactReport: () => void;
  pendingStep: number | null;
  setPendingStep: (step: number | null) => void;
  executePendingStep: () => void;
}

const SimContext = createContext<SimContextType | undefined>(undefined);

export function SimProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SimulationState>(initialState);
  const [missionStarted, setMissionStarted] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);

  const startMission = () => {
    setMissionStarted(true);
  };

  const executePendingStep = async () => {
    if (pendingStep === null) return;
    const targetStep = pendingStep;
    setPendingStep(null);
    await simulateProcessing(targetStep, targetStep === 4 ? 3000 : 2500);
  };

  const simulateProcessing = async (targetStep: number, _processingTimeMs = 2500) => {
    // Step-specific thinking durations (total ~45s across all 4 steps)
    const thinkingPhases: Record<number, { message: string; duration: number }[]> = {
      1: [
        { message: 'Geo-Analyst AI: Processing raw sensor streams', duration: 4000 },
        { message: 'Geo-Analyst AI: Slope displacement confirmed', duration: 1500 },
        { message: 'Risk Analyst AI: Evaluating Sector 4 threat matrix', duration: 4500 },
        { message: 'Risk Analyst AI: 17 personnel isolated in hazard zone', duration: 1500 },
      ],
      2: [
        { message: 'Route Navigator AI: Computing optimal extraction vectors', duration: 4000 },
        { message: 'Route Navigator AI: Alpha-4 designated as primary', duration: 1500 },
        { message: 'Fleet Dispatcher AI: Allocating medical and rescue units', duration: 4500 },
        { message: 'Fleet Dispatcher AI: Ambulance 1 dispatched', duration: 1500 },
      ],
      3: [
        { message: 'System Monitor AI: Analyzing telemetry loss on HT-1', duration: 4000 },
        { message: 'System Monitor AI: Engine failure confirmed', duration: 1500 },
        { message: 'Route Navigator AI: Calculating Alpha-4 blockage impact', duration: 4500 },
        { message: 'Route Navigator AI: Extraction plan invalidated', duration: 1500 },
      ],
      4: [
        { message: 'Ops Commander AI: Executing dynamic replanning', duration: 4000 },
        { message: 'Ops Commander AI: Bypass sequence authorized', duration: 1500 },
        { message: 'Route Navigator AI: Verifying Bravo-2 bypass integrity', duration: 4500 },
        { message: 'Fleet Dispatcher AI: Ambulance 2 rerouted', duration: 1500 },
      ]
    };

    const phases = thinkingPhases[targetStep] || [{ message: 'Processing...', duration: 3000 }];

    // Run through each thinking phase
    for (const phase of phases) {
      setState(prev => ({ ...prev, isProcessing: true, processingMessage: phase.message }));
      await new Promise(resolve => setTimeout(resolve, phase.duration));
    }

    // After all phases, apply the new state
    setState(prev => {
      const newState = { ...prev, step: targetStep, isProcessing: false, processingMessage: '' };
      
      // Add new logs for this step with actual real-time timestamps
      const newLogs = SIMULATION_LOGS.filter(l => l.step === targetStep).map((l, idx) => ({
        ...l,
        timestamp: new Date(Date.now() + idx * 1000).toLocaleTimeString('en-GB', { hour12: false })
      }));
      
      newState.visibleLogs = [...prev.visibleLogs, ...newLogs];
      
      if (targetStep === 1) {
        newState.siteStatus = 'INCIDENT';
        newState.statusLabel = 'CRITICAL ALERT';
        newState.cameraTarget = 'sector4';
      } 
      else if (targetStep === 2) {
        newState.resources = prev.resources.map(r => 
          (r.id === 'AMB-1' || r.id === 'RT-1') ? { ...r, status: 'en_route', location: 'Route Alpha-4' } : r
        );
      }
      else if (targetStep === 3) {
        newState.siteStatus = 'AWAITING_APPROVAL';
        newState.statusLabel = 'AI REPLAN REQUIRED';
        newState.resources = prev.resources.map(r => {
          if (r.id === 'HT-1') return { ...r, status: 'locked', location: 'Route Alpha-4' };
          if (r.id === 'AMB-1') return { ...r, status: 'locked', location: 'Route Alpha-4' };
          return r;
        });
      }
      else if (targetStep === 4) {
        newState.siteStatus = 'RESOLVED';
        newState.statusLabel = 'INCIDENT RESOLVED';
        newState.resources = prev.resources.map(r => 
          r.id === 'AMB-2' ? { ...r, status: 'deployed', location: 'Sector 4' } : r
        );
      }
      return newState;
    });

    // Show impact report after a delay so user sees the map changes first
    if (targetStep === 4) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      setState(prev => ({ ...prev, showImpactReport: true }));
    }
  };

  const goToStep = (step: number) => {
    simulateProcessing(step);
  };

  const nextStep = () => {
    if (state.step < 4) goToStep(state.step + 1);
  };

  const approveAndResolve = () => {
    goToStep(4);
  };

  const closePlanPanel = () => setState(prev => ({ ...prev, showPlanPanel: false }));
  const openApprovalModal = () => setState(prev => ({ ...prev, showApprovalModal: true }));
  const closeApprovalModal = () => setState(prev => ({ ...prev, showApprovalModal: false }));
  const closeImpactReport = () => setState(prev => ({ ...prev, showImpactReport: false }));

  return (
    <SimContext.Provider value={{
      state,
      missionStarted,
      startMission,
      goToStep,
      nextStep,
      approveAndResolve,
      visibleLogs: state.visibleLogs,
      closePlanPanel,
      openApprovalModal,
      closeApprovalModal,
      closeImpactReport,
      pendingStep,
      setPendingStep,
      executePendingStep
    }}>
      {children}
    </SimContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimContext);
  if (context === undefined) throw new Error('useSimulation must be used within SimProvider');
  return context;
}
