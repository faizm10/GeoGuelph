

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent/MapComponent'), {
  ssr: false,
});

export { MapComponent };