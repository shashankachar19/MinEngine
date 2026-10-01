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
        { message: 'Analyzing geo-sensor data streams...', duration: 2500 },
        { message: 'Correlating slope displacement readings (2mm → 12mm)...', duration: 3000 },
        { message: 'Running risk assessment model on Sector 4...', duration: 2500 },
        { message: 'Identifying 17 exposed personnel via IoT tags...', duration: 2000 },
      ],
      2: [
        { message: 'Calculating optimal evacuation route...', duration: 2500 },
        { message: 'Checking Route Alpha-4 clearance status...', duration: 2000 },
        { message: 'Dispatching Ambulance 1 and Rescue Team 1...', duration: 2500 },
        { message: 'Broadcasting emergency alerts to all personnel...', duration: 2000 },
      ],
      3: [
        { message: 'Detecting secondary incident on Route Alpha-4...', duration: 2000 },
        { message: 'Analyzing crash debris field and road blockage...', duration: 3000 },
        { message: 'Re-evaluating all available evacuation routes...', duration: 2500 },
        { message: 'Flagging Ambulance 1 as blocked — plan invalidated...', duration: 2500 },
      ],
      4: [
        { message: 'Initiating dynamic replanning algorithm...', duration: 2500 },
        { message: 'Scanning for alternate safe paths to Sector 4...', duration: 3000 },
        { message: 'Routing Ambulance 2 via western bypass...', duration: 2500 },
        { message: 'Confirming arrival — all 17 workers accounted for...', duration: 3000 },
      ],
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
