export type LogLevel = 'system' | 'perception' | 'risk' | 'routing' | 'resource' | 'command';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  step: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'ambulance' | 'erv' | 'rescue_team' | 'heavy_crane' | 'haul_truck';
  status: 'standby' | 'en_route' | 'deployed' | 'locked';
  location: string;
}

export interface SimulationState {
  step: number;
  isProcessing: boolean;
  processingMessage: string;
  siteStatus: 'OPERATIONAL' | 'INCIDENT' | 'AWAITING_APPROVAL' | 'SECONDARY_INCIDENT' | 'RESOLVED';
  statusLabel: string;
  cameraTarget: 'mine' | 'sector4' | 'route_alpha4' | 'bravo2';
  visibleLogs: LogEntry[];
  sectors: {
    id: string;
    status: 'safe' | 'hazard' | 'evacuating' | 'critical';
  }[];
  resources: Resource[];
  showPlanPanel: boolean;
  showApprovalModal: boolean;
  showImpactReport: boolean;
}

export const MINE_LOCATION = {
  name: 'Sandur Open-Cast Iron Ore Mine',
  district: 'Ballari (Bellary)',
  lat: 15.0826,
  lng: 76.5486,
  area: '12.4 sq km',
  elevation: '580m ASL',
  type: 'Open-Cast Iron Ore',
};

// Simplified "ELI5" Logs
export const SIMULATION_LOGS: LogEntry[] = [
  // STEP 0: Normal
  {
    id: 's0-1',
    timestamp: '14:00:00',
    level: 'system',
    source: '[Agent: System Monitor]',
    message: 'minEngine core systems initialized. All subsystems nominal.',
    step: 0
  },
  {
    id: 's0-2',
    timestamp: '14:00:01',
    level: 'system',
    source: '[Agent: Grid Watcher]',
    message: 'Active monitoring established. 42 personnel registered across all sectors.',
    step: 0
  },

  // STEP 1: Hazard Detected
  {
    id: 's1-1',
    timestamp: '14:04:12',
    level: 'perception',
    source: '[GEO-SENSOR 402]',
    message: 'RAW_DATA: Slope displacement anomaly > 12mm/hr detected.',
    step: 1
  },
  {
    id: 's1-2',
    timestamp: '14:04:12',
    level: 'risk',
    source: '[Agent: Risk Analyst]',
    message: 'CRITICAL HAZARD: Sector 4 instability confirmed. 17 workers in exposure zone.',
    step: 1
  },
  {
    id: 's1-3',
    timestamp: '14:04:13',
    level: 'command',
    source: '[Agent: Ops Commander]',
    message: 'Evacuation protocol initiated. Generating immediate extraction plan.',
    step: 1
  },

  // STEP 2: Response
  {
    id: 's2-1',
    timestamp: '14:04:15',
    level: 'command',
    source: '[Agent: Ops Commander]',
    message: 'Plan authorized by Human-in-the-Loop. Broadcasting evacuation orders.',
    step: 2
  },
  {
    id: 's2-2',
    timestamp: '14:04:16',
    level: 'resource',
    source: '[Agent: Fleet Dispatcher]',
    message: 'Ambulance 1 & Rescue Team 1 dispatched via primary route Alpha-4.',
    step: 2
  },
  {
    id: 's2-3',
    timestamp: '14:04:18',
    level: 'routing',
    source: '[Agent: Route Navigator]',
    message: 'Tracking ETA for Ambulance 1. Route Alpha-4 is clear.',
    step: 2
  },

  // STEP 3: Escalation
  {
    id: 's3-1',
    timestamp: '14:05:42',
    level: 'perception',
    source: '[OBD-SENSOR HT1]',
    message: 'ERR_CODE_77X: Engine failure detected. Telemetry offline.',
    step: 3
  },
  {
    id: 's3-2',
    timestamp: '14:05:43',
    level: 'risk',
    source: '[Agent: Risk Analyst]',
    message: 'Alpha-4 blocked by Haul Truck 1. Ambulance 1 progress halted.',
    step: 3
  },
  {
    id: 's3-3',
    timestamp: '14:05:43',
    level: 'routing',
    source: '[Agent: Route Navigator]',
    message: 'Primary plan invalidated. Computing alternative extraction vectors...',
    step: 3
  },

  // STEP 4: Replanning
  {
    id: 's4-1',
    timestamp: '14:05:48',
    level: 'command',
    source: '[Agent: Ops Commander]',
    message: 'Human-in-the-Loop override granted. Seizing control of dispatch.',
    step: 4
  },
  {
    id: 's4-2',
    timestamp: '14:05:49',
    level: 'routing',
    source: '[Agent: Route Navigator]',
    message: 'Valid bypass found. Redirecting Ambulance 2 via Bravo-2 ramp.',
    step: 4
  },
  {
    id: 's4-3',
    timestamp: '14:05:51',
    level: 'resource',
    source: '[Agent: Fleet Dispatcher]',
    message: 'Ambulance 2 on-site at Sector 4. Medical extraction initiated.',
    step: 4
  },
  {
    id: 's4-4',
    timestamp: '14:05:55',
    level: 'system',
    source: '[Agent: System Monitor]',
    message: 'All 17 workers secured. Crisis successfully contained.',
    step: 4
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  { id: 'AMB-1', name: 'Ambulance 1', type: 'ambulance', status: 'standby', location: 'Pit Head' },
  { id: 'AMB-2', name: 'Ambulance 2', type: 'ambulance', status: 'standby', location: 'Sector 2' },
  { id: 'RT-1', name: 'Rescue Team 1', type: 'rescue_team', status: 'standby', location: 'Pit Head' },
  { id: 'HT-1', name: 'Haul Truck 1', type: 'haul_truck', status: 'standby', location: 'Sector 3' },
];

export const initialState: SimulationState = {
  step: 0,
  isProcessing: false,
  processingMessage: '',
  siteStatus: 'OPERATIONAL',
  statusLabel: 'SITE OPERATIONAL',
  cameraTarget: 'mine',
  visibleLogs: SIMULATION_LOGS.filter(l => l.step === 0).map((l, idx) => ({
    ...l,
    timestamp: new Date(Date.now() + idx * 1000).toLocaleTimeString('en-GB', { hour12: false })
  })),
  sectors: [
    { id: 'S1', status: 'safe' },
    { id: 'S2', status: 'safe' },
    { id: 'S3', status: 'safe' },
    { id: 'S4', status: 'safe' },
  ],
  resources: INITIAL_RESOURCES,
  showPlanPanel: false,
  showApprovalModal: false,
  showImpactReport: false,
};
