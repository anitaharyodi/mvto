import React,{ useRef, useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import { Box, Button, Center, Img, SimpleGrid } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'

import Modal from 'react-modal';
const desktopStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '0px !important',
    transform: 'translate(-50%, -50%)',
	  height: '100%',
    width: '50%',
  },
};

const mobileStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '0px !important',
    transform: 'translate(-50%, -50%)',
	  height: '100%',
    width: '100%',
  },
};
const LOGO_MAIN = 'https://mizora.jewelry/assets/images/logo-mizora.svg'
const ROUTES = [
  // { title: 'Bracelets', path: '/?cat=bracelets&login=false&id_cat=7' },
  { title: 'Bangles', path: '?cat=bangles&login=false&id_cat=8' },
  { title: 'Earrings', path: '?cat=earrings&login=false&id_cat=9' },
  { title: 'Rings', path: '?cat=rings&login=false&id_cat=10' },
  { title: 'Necklaces', path: '?cat=necklaces&login=false&id_cat=11' },
]

function LandingPage() {
  const [iframSrc, setIframeUrl] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false)
  const router = useRouter()
  //var pathURL = window.location.href
  //console.log(window.location.href)
  function openModal(event) {
    const url= window.location.href+event.target.id;
    console.log(url);
    setIframeUrl(url)
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Box p="14">
      <Center>
	  PROD
        <Img src={LOGO_MAIN} h="100px" objectFit="contain" />
      </Center>
    </Box>
  )
}

export default LandingPage
