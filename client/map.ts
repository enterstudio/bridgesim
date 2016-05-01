///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
///<reference path="../core/ship.ts" />
///<reference path="../core/projectile.ts" />
///<reference path="const.ts" />
///<reference path="colors.ts" />

namespace Bridgesim.Client {

  const TILE_PX = 50;
  const BLIP_PX = 2;

  @component('bridgesim-map')
  export class Map extends polymer.Base {
    @property({type: Number}) size: number;
    @property({type: Array}) ships: Core.Ship[];
    @property({type: Object}) projectiles: {[id: number]: Core.Projectile};
    @property({type: Object}) ship: Core.Ship;

    private can: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shipImage: HTMLImageElement;

    ready(): void {
      this.can = this.$.canvas;
      this.ctx = this.can.getContext('2d');
      this.ctx.font = '11px Share Tech Mono';
      this.shipImage = new Image();
      this.shipImage.src = "/images/ship.svg";
    }

    draw(localAlpha: number, remoteAlpha: number): void {
      let ctx = this.ctx;

      ctx.clearRect(0, 0, this.can.width, this.can.height);

      ctx.beginPath();
      for (let i = 0; i < this.size + 1; i++) {
        ctx.moveTo(i * TILE_PX + HP, HP);
        ctx.lineTo(i * TILE_PX + HP, this.size * TILE_PX + HP);
        ctx.moveTo(HP, i * TILE_PX + HP);
        ctx.lineTo(this.size * TILE_PX + HP, i * TILE_PX + HP);
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = GREEN;
      ctx.stroke();

      for (let s of this.ships) {
        const alpha = s === this.ship ? localAlpha : remoteAlpha;
        ctx.beginPath();
        let x = s.body.lerpX(alpha) * TILE_PX + TILE_PX / 2 + HP;
        let y = s.body.lerpY(alpha) * TILE_PX + TILE_PX / 2 + HP;
        if (this.ship === s) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(s.body.lerpYaw(alpha) * Math.PI / 180);
          const shipWidth = 34 / 3;
          const shipHeight = 59 / 3;
          ctx.drawImage(this.shipImage, -shipWidth / 2, -shipHeight / 2,
                        shipWidth, shipHeight);
          ctx.restore();
        } else {
          ctx.arc(x, y, BLIP_PX, 0, 2 * Math.PI);
          ctx.fillStyle = '#FF0000';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText(s.name, x + 10, y + 5);
        ctx.fillText(s.name, x + 10, y + 5);

        ctx.strokeText(s.hp.toString(), x + 10, y + 20);
        ctx.fillText(s.hp.toString(), x + 10, y + 20);
      }

      for (let id in this.projectiles) {
        const p = this.projectiles[id];
        let rads = Core.radians(p.body.lerpYaw(remoteAlpha) - 90);
        ctx.beginPath();
        let x = p.body.lerpX(remoteAlpha) * TILE_PX + TILE_PX / 2 + HP;
        let y = p.body.lerpY(remoteAlpha) * TILE_PX + TILE_PX / 2 + HP;
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(rads) * 20, y + Math.sin(rads) * 20);
        ctx.strokeStyle = '#F00';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }
  Map.register();
}
