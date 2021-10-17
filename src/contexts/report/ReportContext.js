import { createContext } from 'react';

export const ReportContext = createContext({
  entity: '',
  setEntity: null,
  status: '',
  setStatus: null
});
export default ReportContext;