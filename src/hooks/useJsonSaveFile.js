import { useState, useEffect } from "react";
import { JSONCrush, JSONUncrush } from "jsoncrush";
import createPersistedState from "use-persisted-state";
import { useDebouncedCallback } from "use-debounce";
import { CaretDoubleDown } from "phosphor-react";

const createJsonSaveFile = (filename, debounce = 1000) => {
  const useFileState = createPersistedState(filename);

  return (defaultContent) => {
    const [fileState, setFileState] = useFileState(defaultContent);
    const [jsonState, setJsonState] = useState(fileState);
    const [autoSaving, setAutoSaving] = useState(false);
    const debouncedUpdateFileState = useDebouncedCallback((json) => {
      setAutoSaving(true);
      setFileState(json);
      setTimeout(() => {
        setAutoSaving(false);
      }, 500);
    }, debounce);
    const updateState = (json) => {
      setJsonState(json);
      debouncedUpdateFileState(json);
    };
    return [jsonState, updateState, autoSaving];
  };
};

export default createJsonSaveFile;