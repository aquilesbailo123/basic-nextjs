import Link from 'next/link';
import { APP_NAME, LINKEDIN_LINK, INSTAGRAM_LINK, MAIL_LINK, WHATSAPP_LINK } from '../utils/constants';
/**
 * Footer component provides navigation links for the application, as well as some external links.
 */
export default function Footer() {
      
      return (
            <footer className="w-full mt-10">
                  <div className="footer-container">
                        <div className='flex flex-col lg:flex-row justify-between items-center w-full'>
                              <div className='flex flex-col w-full lg:w-1/3 text-left mb-auto'>
                                    <Link href="/home" >
                                          <div className="font-bold text-4xl mb-8">{APP_NAME}</div>
                                    </Link>
                              </div>
                              <div className='flex flex-col w-full lg:w-1/3 text-left mb-auto pb-6'>
                                    <h2 className='gray'>Páginas</h2>
                                    <Link href="/home">
                                          <span>Inicio</span>
                                    </Link>
                                    <Link href="/user">
                                          <span>Usuario</span>
                                    </Link>
                              </div>
                              <div className="flex flex-col w-full lg:w-1/3 text-left mb-auto pb-6">
                                    <h2 className='gray'>Redes</h2>
                                    <Link href={LINKEDIN_LINK} target='_blank'>
                                          <span>LinkedIn</span>
                                    </Link>
                                    <Link href={INSTAGRAM_LINK} target='_blank'>
                                          <span>Instagram</span>
                                    </Link>
                              </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-between items-center w-full'>
                              <div className='flex flex-col w-full lg:w-1/3 text-left mb-auto pb-6'>
                                    
                              </div>
                              <div className='flex flex-col w-full lg:w-1/3 text-left mb-auto pb-6'>
                                    <h2 className='gray'>Políticas</h2>
                                    <Link href="/policies/privacy">
                                          <span>Política de privacidad</span>
                                    </Link>
                                    <Link href="/policies/security">
                                          <span>Política de seguridad de datos</span>
                                    </Link>
                                    <Link href="/policies/terms">
                                          <span>Términos y condiciones</span>
                                    </Link>
                                    <Link href="/policies/refunds">
                                          <span>Política de reembolso</span>
                                    </Link>
                              </div>
                              <div className="flex flex-col w-full lg:w-1/3 text-left mb-auto pb-6">
                                    <h2 className='gray'>Contacto</h2>
                                    <Link href={MAIL_LINK} target='_blank'>
                                          <span>Correo</span>
                                    </Link>
                                    <Link href={WHATSAPP_LINK} target='_blank'>
                                          <span>Whatsapp</span>
                                    </Link>
                              </div>
                        </div>
                        
                  </div>
                  
            </footer>
      );
}

