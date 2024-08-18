import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import {Card, CardHeader, CardBody, CardFooter, Divider, Input, Image, Button} from "@nextui-org/react";


export default function Home() {

      return (
            <div className='container'>
                  Home Page
            </div>
      );
}
