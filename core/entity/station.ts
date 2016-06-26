import {Resource} from '../resources';

import {Db} from './db';

export function SpawnStation(
    db: Db, name: string, x: number, y: number): string {
  const id = db.spawn();
  const station = db.newStation(id);
  db.newResource(id);
  station.produces[Resource.Missile] = 60;
  station.produces[Resource.Energy] = 1;
  if (!name) {
    name = 'Station ' + id;
  }
  const dbName = db.newName(id);
  dbName.name = name;
  const pos = db.newPosition(id);
  pos.x = x;
  pos.y = y;
  const col = db.newCollidable(id);
  col.length = 300;
  col.width = 300;
  col.mass = 1000;
  col.damage = 10;
  const hel = db.newHealth(id);
  hel.hp = 1000;
  hel.shields = true;
  console.log('entity.station: spawned station', id, name);
  return id;
}
