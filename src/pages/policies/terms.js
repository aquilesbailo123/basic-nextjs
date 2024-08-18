import React from 'react';
import { APP_NAME } from '../../utils/constants';

const TermsAndConditions = () => (
      <div className='container'>
            <h1>Terminos y Condiciones</h1>
            <div className='text-justify max-w-2xl mx-auto'>
                  <p>Estos son los términos y condiciones de servicio de {APP_NAME}</p>

                  <p>Última actualización: 17/08/2024</p>
            </div>
      </div>
);

export default TermsAndConditions;
