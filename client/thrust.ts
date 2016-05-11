///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />

import * as color from "./colors";
import {Db} from "../core/entity/db";
import {HP} from "./const";
import {snap} from "./util";

@component('bridgesim-thrust')
export class Thrust extends polymer.Base {
  @property({type: Object}) db: Db;
  @property({type: String}) shipId: string;

  private can: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  ready(): void {
    this.can = this.$.canvas;
    this.ctx = this.can.getContext('2d');
  }

  draw(): void {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.can.width, this.can.height);
    let w = this.can.width - 1;
    let h = this.can.height - 20;

    const thrust = this.db.velocities[this.shipId];

    let barHeight = Math.round(h / 20);
    let maxHeight = h - barHeight;
    ctx.fillStyle = color.AQUA;
    ctx.fillRect(HP, snap(maxHeight - (thrust * maxHeight)), w, barHeight);

    ctx.strokeStyle = color.AQUA;
    ctx.strokeRect(HP, HP, w, h);

    ctx.font = "16px sans-serif";
    ctx.fillStyle = color.RED;
    const displayThrustValue = Math.round(thrust * 100);
    const thrustWidth = ctx.measureText(displayThrustValue.toString()).width;
    ctx.fillText(
        displayThrustValue.toString(), w / 2 - thrustWidth / 2,
        this.can.height);
  }
}
Thrust.register();
