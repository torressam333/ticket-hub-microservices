import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client)
      throw new Error('Cannot access NATS client before connecting');

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('CONNECTED TO NATS VIA NATS WRAPPER - ORDERS SERVICE');
        resolve();
      });

      // If failed to connect
      this.client.on('error', (err) => {
        console.log('error', err);
        reject(err);
      });
    });
  }
}

// To be used as singleton anywhere in app
export const natsWrapper = new NatsWrapper();
