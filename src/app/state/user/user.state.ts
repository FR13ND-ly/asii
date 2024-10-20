export interface PPCLvl {
  // Points per click
  headset: number;
  monitor: number;
  keyboard: number;
  mouse: number;
}

export interface PPSLvl {
  // Points per second
  os: number;
  cpu: number;
  ram: number;
  ssd: number;
  gpu: number;
  ai: number;
}

export interface UserState {
  uid: string;
  points: number;
  ppcUpgrades: PPCLvl;
  ppsUpgrades: PPSLvl;
}

export const userInitState = {
  uid: '',
  points: 0,
  ppcUpgrades: {
    mouse: 0,
    keyboard: 0,
    headset: 0,
    monitor: 0,
  },
  ppsUpgrades: {
    cpu: 0,
    ram: 0,
    ssd: 0,
    gpu: 0,
    os: 0,
    ai: 0,
  },
};
