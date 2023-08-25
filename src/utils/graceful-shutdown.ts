/**
 * Graceful Shutdown server, DB, and any other processes when we receive a SIGTERM or SIGINT event
 * */

import { client } from "../db/conn";
export const onShutdown = (signal?: string) => {
  return new Promise<void>((resolve) => {
    console.log(`${signal} received, will close the DB connection!`);
    client.end().then(() => console.log("Postgres connection closed."));
    console.log("Cleanup finished!");
    resolve();
  });
};

export const preShutdown = (signal?: string) => {
  return new Promise<void>((resolve) => {
    console.log(`${signal} received!`);
    console.log("Cleaning up");
    resolve();
  });
};
