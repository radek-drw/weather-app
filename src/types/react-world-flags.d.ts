declare module 'react-world-flags' {
    import React from 'react';
  
    interface FlagProps {
      code: string;
      [key: string]: any;
    }
  
    const Flag: React.FC<FlagProps>;
  
    export default Flag;
  }