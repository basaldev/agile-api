import * as assert from 'assert';
import { MongoClient } from 'mongodb';

assert.ok(process.env.DB_HOSTNAME, 'No DB_HOSTNAME env is specified');
assert.ok(process.env.DB_PORT, 'No DB_PORT env is specified');
assert.ok(process.env.DB_NAME, 'No DB_NAME env is specified');
assert.ok(process.env.DB_USERNAME, 'No DB_USERNAME env is specified');
assert.ok(process.env.DB_PASSWORD, 'No DB_PASSWORD env is specified');

const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}`;
const client = new MongoClient(url, { useNewUrlParser: true });

export function connect(): Promise<void> {
  return new Promise((resolve, reject) => {
    client.connect((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export function getDB() {
  return client.db(process.env.DB_NAME);
}

export function getCollection(name: string) {
  const db = getDB();
  return db.collection(name);
}

export function find(collectionName: string, query: any = {}): Promise<any[]> {
  const collection = getCollection(collectionName);
  return new Promise((resolve, reject) => {
    collection.find(query).toArray((err, docs) => {
      if (err) {
        return reject(err);
      }
      resolve(docs || []);
    });
  });
}

export function update(collectionName: string, query: any = {}, data: any): Promise<any[]> {
  const collection = getCollection(collectionName);
  return new Promise((resolve, reject) => {
    collection.updateOne(query, data, (err, result) => {
      if (err || result.result.n !== 1) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

export function create(collectionName: string, data: any): Promise<any[]> {
  const collection = getCollection(collectionName);
  return new Promise((resolve, reject) => {
    collection.insert(data, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}
