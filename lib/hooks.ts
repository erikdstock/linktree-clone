import { useEffect } from "react";

const DEBUG = true;

export const useDebugData = ({ data }) => {
  useEffect(() => {
    if (!DEBUG) return;
    console.log({ debug: data });
  }, [data]);
  return null;
};
