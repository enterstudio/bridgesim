///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />

import * as Components from '../core/components';
import {Db} from '../core/entity/db';

@component('bridgesim-power')
export class Power extends polymer.Base {
  @property({type: Object}) db: Db;
  @property({type: String}) shipId: string;
  @property({type: String}) curSubsystem: string;
  subsystemNames: string[] = ['engine', 'maneuvering'];

  private subsystemLevel(
      powerDb: {[id: string]: Components.Power}, shipId: string,
      subsystem: string): any {
    const power = powerDb[shipId];
    let level = 0;
    if (power) {
      level = power[subsystem];
    }
    return 'height: ' + level.toFixed(3) + '%';
  }

  private subsystemActive(curSubsystem: string, subsystem: string): boolean {
    return curSubsystem === subsystem;
  }
}
Power.register();
