import React from 'react';
import '../../styles/components/mapIframe.scss';
import SearchBranches from '../searchBranches/SearchBranches';

function MapIframe() {
  return (
    <div className='map-container'>
      <div className='mapouter'>
        <div className='gmap_canvas'>
          <iframe
            src='https://maps.google.com/maps?q=%D0%A3%D0%BB.%20%D0%A2%D1%83%D1%80%D1%83%D1%81%D0%B1%D0%B5%D0%BA%D0%BE%D0%B2%D0%B0%20A167&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed'
            frameBorder='0'
            scrolling='no'
            style={{ width: '1240px', height: '400px' }}
          ></iframe>
        </div>
        <style>
          {`
          .mapouter {
            position: relative;
            height: 400px;
            width: 1240px;
            background: #fff;
          }
          .mapouter a {
            color: #fff !important;
            position: absolute !important;
            top: 0 !important;
            z-index: 0 !important;
          }
          .gmap_canvas {
            overflow: hidden;
            height: 400px;
            width: 1240px;
          }
          .gmap_canvas iframe {
            position: relative;
            z-index: 2;
          }
        `}
        </style>
      </div>

      <SearchBranches />
    </div>
  );
}

export default MapIframe;
