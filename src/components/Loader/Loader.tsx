import React from 'react';
import { Dna } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '400%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Dna
        visible={true}
        height="120"
        width="120"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
