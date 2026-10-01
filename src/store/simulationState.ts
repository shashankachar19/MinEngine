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
    source: 'SYSTEM',
    message: 'minEngine Dashboard started. Everything looks good!',
    step: 0
  },
  {
    id: 's0-2',
    timestamp: '14:00:01',
    level: 'system',
    source: 'SYSTEM',
    message: 'Watching all sectors. 42 workers are currently on site.',
    step: 0
  },

  // STEP 1: Hazard Detected
  {
    id: 's1-1',
    timestamp: '14:04:12',
    level: 'perception',
    source: 'SENSORS',
    message: 'Wait! The ground is shifting in Sector 4!',
    step: 1
  },
  {
    id: 's1-2',
    timestamp: '14:04:12',
    level: 'risk',
    source: 'AI RISK',
    message: 'DANGER! 17 workers are in direct danger in Sector 4.',
    step: 1
  },
  {
    id: 's1-3',
    timestamp: '14:04:13',
    level: 'command',
    source: 'COMMAND',
    message: 'Creating an emergency rescue plan right now.',
    step: 1
  },

  // STEP 2: Response
  {
    id: 's2-1',
    timestamp: '14:04:15',
    level: 'command',
    source: 'COMMAND',
    message: 'Plan approved! Telling everyone to get out.',
    step: 2
  },
  {
    id: 's2-2',
    timestamp: '14:04:16',
    level: 'resource',
    source: 'RESOURCES',
    message: 'Sending Ambulance 1 and Rescue Team 1 down Route Alpha-4.',
    step: 2
  },
  {
    id: 's2-3',
    timestamp: '14:04:18',
    level: 'routing',
    source: 'AI ROUTING',
    message: 'Ambulance 1 is on the way. It will be there very soon.',
    step: 2
  },

  // STEP 3: Escalation
  {
    id: 's3-1',
    timestamp: '14:05:42',
    level: 'perception',
    source: 'SENSORS',
    message: 'OH NO! Haul Truck 1 just crashed on Route Alpha-4!',
    step: 3
  },
  {
    id: 's3-2',
    timestamp: '14:05:43',
    level: 'risk',
    source: 'AI RISK',
    message: 'Route Alpha-4 is completely blocked. Ambulance 1 is stuck!',
    step: 3
  },
  {
    id: 's3-3',
    timestamp: '14:05:43',
    level: 'routing',
    source: 'AI ROUTING',
    message: 'The original plan failed. Figuring out a new way to save the workers...',
    step: 3
  },

  // STEP 4: Replanning
  {
    id: 's4-1',
    timestamp: '14:05:48',
    level: 'command',
    source: 'COMMAND',
    message: 'New plan authorized! Taking control.',
    step: 4
  },
  {
    id: 's4-2',
    timestamp: '14:05:49',
    level: 'routing',
    source: 'AI ROUTING',
    message: 'Found a safe path! Sending Ambulance 2 down the Bravo-2 Ramp instead.',
    step: 4
  },
  {
    id: 's4-3',
    timestamp: '14:05:51',
    level: 'resource',
    source: 'RESOURCES',
    message: 'Ambulance 2 has arrived safely. Starting rescues.',
    step: 4
  },
  {
    id: 's4-4',
    timestamp: '14:05:55',
    level: 'system',
    source: 'SYSTEM',
    message: 'Everyone is safe. Crisis averted with zero casualties!',
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
