import * as bunyan from 'bunyan';

export default function getLogger(name: string): any {
  return bunyan.createLogger({ name });
}
