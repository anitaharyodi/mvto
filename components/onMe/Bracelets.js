import React, { useCallback, useRef, useState, useEffect, memo, useMemo } from 'react'
import * as tf from '@tensorflow/tfjs'
import ReactDOM from 'react-dom'
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'
import { drawHand } from '../handposeutil'
import * as fp from 'fingerpose'
import Handsigns from '../handsigns'
import { handsplaceholderSolid, handsplaceholderDash, HandRightOutline, HandLeftOutline, StackHolderSvg, SingleHolderSvg, braceletsHolderSvg } from '../handsplaceholder'
import { Text, Heading, Button, ButtonGroup, Image, Stack, Container, Box, VStack, ChakraProvider } from '@chakra-ui/react'

import { Signimage, Signpass } from '../handimage'
import Toggle from '../Form'
import Metatags from '../metatags'
import Link from 'next/link'
import Spinner from 'react-spinner-material'
import QR from '../qr/QR'
import Footer from '../footer/Footer'
import OnModel from '../onModel/OnModel'
import Header from '../header/Header'
import { Koordinats } from '../koordinat'
import { Koordinatsonme } from '../koordinatonme'
import { RiAlignJustify, RiCameraFill, RiCameraOffFill, RiStackFill, RiCoinFill, RiArrowLeftSLine } from 'react-icons/ri'

export default function Bracelets(params) {
  const [categoryDefault, setcategoryDefault] = useState(JSON.parse(localStorage.getItem('params')))
  const KoordinatsModelsBracelets = JSON.parse(localStorage.getItem('KoordinatsModel'))
  const imageStackLS = JSON.parse(localStorage.getItem('productStackList'))
  const paramsOnMe = params.params.OnMe
  const [RingOnMe, setRingOnMe] = useState(paramsOnMe)
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [camState, setCamState] = useState('on')
  const [stackState, setStackState] = useState('on')
  const [handPlaceholderDash, setHandPlacholderDash] = useState(handsplaceholderDash.HandsDash.src)
  const [handPlaceholderSolid, setHandPlacholderSolid] = useState(handsplaceholderSolid.HandsSolid.src)
  const [imageCapture, setImageCapture] = useState([])
  const [jariKoordinat, setKoordinat] = useState([])
  const [actionOncahnge, setActionOnchange] = useState('Otomatis')
  const [handsLeftRight, sethandsLeftRight] = useState('Left')
  const [animasiClassOf, setanimasiClassOf] = useState('animasi-of-left')
  const [animasiClassOn, setanimasiClassOn] = useState('animasi-on-left')
  const [disabledbottonCamera, setDisabledButtonCamera] = useState(false)

  const [sign, setSign] = useState(null)

  let signList = []
  let currentSign = 0

  let gamestate = 'started'

  // let net;

  // Hook
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    })
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      // Add event listener
      window.addEventListener('resize', handleResize)
      // Call handler right away so state gets updated with initial window size
      handleResize()
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount
    return windowSize
  }

  const sizeWindow = useWindowSize()
  //console.log(sizeWindow);
  const [Jari, setJari] = useState(0)
  const [TotX, setTotX] = useState(0)
  const [TotalLandmark, setTotalLandmark] = useState(0)

  const [windowSize, setWindowSize] = useState({ innerWidth: 450, innerHeight: 443 })
  const [DefaultScale, setDefaultScale] = useState(1)

  useEffect(() => {
    let scaleWidth = window.innerWidth
    let scaleHeight = window.innerHeight
    let scaleDefaulring = 1 / ((scaleHeight - 200) / scaleWidth)
    setDefaultScale(scaleDefaulring)
  }, [DefaultScale])
  //console.log(DefaultScale)

  async function runHandpose() {
    const net = await handpose.load()
    _signList()
    setInterval(() => {
      detect(net)
    }, 150)
  }

  function _signList() {
    signList = generateSigns()
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function generateSigns() {
    const password = shuffle(Signpass)
    return password
  }

  async function detect(net) {
    // Check data is available
    if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      setActionOnchange(localStorage.getItem('actioncamera'))
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canvas height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // Make Detections
      const hand = await net.estimateHands(video)

      if (hand.length > 0) {
        if (hand.length > 0) {
          let TotjariTelunjukX = 0
          let TotjariTelunjukY = 0
          let telunjukX = 0
          let telunjukY = 0
          let jaritengahX = 0
          let jaritengahY = 0
          let jarimanisX = 0
          let jarimanisY = 0
          let kelingkingX = 0
          let kelingkingY = 0
          let ibujariX = 0
          let ibujariY = 0

          for (let g = 0; g < hand[0].annotations.indexFinger.length; g++) {
            TotjariTelunjukX += hand[0].annotations.indexFinger[g][0]
            TotjariTelunjukY += hand[0].annotations.indexFinger[g][1]

            telunjukX = hand[0].annotations.indexFinger[g][0]
            telunjukY = hand[0].annotations.indexFinger[g][1]

            jaritengahX = hand[0].annotations.middleFinger[g][0]
            jaritengahY = hand[0].annotations.middleFinger[g][1]

            jarimanisX = hand[0].annotations.ringFinger[g][0]
            jarimanisY = hand[0].annotations.ringFinger[g][1]

            kelingkingX = hand[0].annotations.pinky[g][0]
            kelingkingY = hand[0].annotations.pinky[g][1]

            ibujariX = hand[0].annotations.thumb[g][0]
            ibujariY = hand[0].annotations.thumb[g][1]
          }
          let totX = 0
          let totY = 0
          for (let h = 0; h < hand[0].landmarks.length; h++) {
            totX += hand[0].landmarks[h][0]
            totY += hand[0].landmarks[h][1]
          }

          setJari(TotjariTelunjukX)
          setTotX(totX)

          let scaleWidth = window.innerWidth
          if (scaleWidth > 412 || scaleWidth > 450) {
            const TotalLandmark = (TotjariTelunjukX / totX) * 100
            setTotalLandmark(TotalLandmark)

            if (totX >= 6815 && totX < 6992 && TotjariTelunjukX >= 1445 && TotjariTelunjukX < 1498) {
              const canvasss = canvasRef.current.getContext('2d')
              canvasss.canvas.getContext('2d').drawImage(video, 0, 0, canvasss.canvas.width, canvasss.canvas.height)
              const image_data_url = canvasss.canvas.toDataURL()
              setKoordinat([
                { telunjuk: { x: telunjukX, y: telunjukY } },
                { jaritengah: { x: jaritengahX, y: jaritengahY } },
                { jarimanis: { x: jarimanisX, y: jarimanisY } },
                { kelingking: { x: kelingkingX, y: kelingkingY } },
                { ibujari: { x: ibujariX, y: ibujariY } },
              ])
              //console.log(image_data_url)
              var arr = [image_data_url]
              const imageobj = JSON.parse(localStorage.getItem('ImageCapture'))
              if (imageobj.length != 0) {
                var arr = []
                for (let s = 0; s < imageobj.image.length + 1; s++) {
                  if (s < imageobj.image.length) {
                    arr.push(imageobj.image[s])
                  } else {
                    arr.push(image_data_url)
                  }
                }
              }
              setImageCapture({ image: arr })
              document.getElementById('emojimage').setAttribute('src', image_data_url)
              document.querySelector('#loader-capture').style.display = 'block'
              setTimeout(() => {
                let inerwidth = window.innerWidth
                let inerheight = window.innerHeight
                setWindowSize({ innerWidth: inerwidth, innerHeight: inerheight })
                setCamState('off')
                setRingOnMe('off')
                const newParams = {
                  cat: categoryDefault.cat,
                  login: !categoryDefault.login ? 'false' : categoryDefault.login,
                  customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
                  id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
                  onme: 'off',
                }
                const paramLS = localStorage.setItem('params', JSON.stringify(newParams))
                const KoordinatsOnmeNew = localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinatsonme))
                document.querySelector('#loader-capture').style.display = 'none'
              }, 3000)
            }
          } else {
            const TotalLandmark = (TotjariTelunjukX / totX) * 100
            setTotalLandmark(TotalLandmark)

            if (totX >= 5315 && totX < 5452 && TotjariTelunjukX >= 1358 && TotjariTelunjukX < 1368) {
              const canvasss = canvasRef.current.getContext('2d')
              canvasss.canvas.getContext('2d').drawImage(video, 0, 0, canvasss.canvas.width, canvasss.canvas.height)
              const image_data_url = canvasss.canvas.toDataURL()
              setKoordinat([
                { telunjuk: { x: telunjukX, y: telunjukY } },
                { jaritengah: { x: jaritengahX, y: jaritengahY } },
                { jarimanis: { x: jarimanisX, y: jarimanisY } },
                { kelingking: { x: kelingkingX, y: kelingkingY } },
                { ibujari: { x: ibujariX, y: ibujariY } },
              ])
              var arr = [image_data_url]
              const imageobj = JSON.parse(localStorage.getItem('ImageCapture'))
              if (imageobj.length != 0) {
                var arr = []
                for (let s = 0; s < imageobj.image.length + 1; s++) {
                  if (s < imageobj.image.length) {
                    arr.push(imageobj.image[s])
                  } else {
                    arr.push(image_data_url)
                  }
                }
              }
              setImageCapture({ image: arr })
              document.getElementById('emojimage').setAttribute('src', image_data_url)
              document.querySelector('#loader-capture').style.display = 'block'
              setTimeout(() => {
                let inerwidth = window.innerWidth
                let inerheight = window.innerHeight
                setWindowSize({ innerWidth: inerwidth, innerHeight: inerheight })
                setCamState('off')
                setRingOnMe('off')
                const newParams = {
                  cat: categoryDefault.cat,
                  login: !categoryDefault.login ? 'false' : categoryDefault.login,
                  customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
                  id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
                  onme: 'off',
                }
                const paramLS = localStorage.setItem('params', JSON.stringify(newParams))
                const KoordinatsOnmeNew = localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinatsonme))
                document.querySelector('#loader-capture').style.display = 'none'
              }, 3000)
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    runHandpose()
  }, [])

  useEffect(() => {
    const actioncahnge = localStorage.setItem('actioncamera', actionOncahnge)
  }, [actionOncahnge])

  function turnOffCamera() {
    setCamState('off')
    setRingOnMe('off')
    const newParams = {
      cat: categoryDefault.cat,
      login: !categoryDefault.login ? 'false' : categoryDefault.login,
      customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
      id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
      onme: 'off',
    }
    const paramLS = localStorage.setItem('params', JSON.stringify(newParams))
    !imageCapture.img ? setImageCapture({ image: KoordinatsModelsBracelets.KoordinatBracelets.model.image }) : imageCapture
    !imageCapture.img ? localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinats)) : []
  }

  useEffect(() => {
    const koordinatJari = localStorage.setItem('koordinatJari', JSON.stringify(jariKoordinat))
  }, [jariKoordinat])

  function HandsLeft() {
    sethandsLeftRight('Left')
    setanimasiClassOf('animasi-off-left')
    setanimasiClassOn('animasi-on-left')
  }

  function HandsRight() {
    sethandsLeftRight('Right')
    setanimasiClassOf('animasi-off')
    setanimasiClassOn('animasi-on')
  }

  function controlBrightnessImage() {
    document.getElementById('myID').style.filter = 'brightness(50%)'
    document.getElementById('myID').style.filter = 'contrast(50%)'
  }

  function takeCap() {
    const image_data_url = webcamRef.current.getScreenshot()
    var arr = [image_data_url]
    if (imageCapture.length != 0) {
      var arr = []
      for (let s = 0; s < imageCapture.image.length + 1; s++) {
        if (s < imageCapture.image.length) {
          arr.push(imageCapture.image[s])
        } else {
          arr.push(image_data_url)
        }
      }
    }
    setImageCapture({ image: arr })

    document.getElementById('emojimage').setAttribute('src', image_data_url)
    document.querySelector('#loader-capture').style.display = 'block'
    setDisabledButtonCamera(true)
    setTimeout(() => {
      let inerwidth = window.innerWidth
      let inerheight = window.innerHeight
      setWindowSize({ innerWidth: inerwidth, innerHeight: inerheight })
      setCamState('off')
      setRingOnMe('off')
      const newParams = {
        cat: categoryDefault.cat,
        login: !categoryDefault.login ? 'false' : categoryDefault.login,
        customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
        id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
        onme: 'off',
      }
      const paramLS = localStorage.setItem('params', JSON.stringify(newParams))
      const KoordinatsOnmeNew = localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinatsonme))
      document.querySelector('#loader-capture').style.display = 'none'
    }, 3000)
  }

  useEffect(() => {
    const imageLZ = localStorage.setItem('ImageCapture', JSON.stringify(imageCapture))
  }, [imageCapture])
  console.log(RingOnMe)
  return (
    <>
      {camState === 'on' ? (
        <>
          <Box
            w={'100%'}
            bg="#0e1c28f0"
            id="box-onmodel"
            style={{
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'fixed',
              transform: 'scale(1)',
              transition: 'transform 0.3s ease 0s',
              transformOrigin: '195px 229px 0px',
              bottom: '0px',
              top: '0px',
              zIndex: '1800',
            }}
          >
            {camState === 'on' ? (
              <Webcam id="webcam" ref={webcamRef} videoConstraints={{ facingMode: 'environment' }} style={{ bottom: '0px' }} />
            ) : (
              // <canvas ref={canvasRef} style={{ bottom: "0px" }} />
              <canvas ref={canvasRef} style={{ bottom: '0px' }} />
            )}
            {<canvas id="gesture-canvas" ref={canvasRef} style={{ bottom: '0px' }} />}
            <Box
              id="loader-capture"
              style={{
                position: 'absolute',
                top: '0px',
                backgroundColor: 'white',
                opacity: '0.7',
                width: '100%',
                height: '100%',
              }}
              align="center"
              display="none"
            >
              <div className="div-loader" style={{ backgroundColor: '#FFFFF', position: 'absolute', top: '300px' }}>
                <Spinner radius={60} color={'black'} stroke={9} visible={true} />
              </div>
            </Box>
            <Box position={'absolute'} left={2} top={15} id="logo-mizora">
              <Image h="25px" src={'https://mizora.jewelry/assets/images/logo-mizora.svg'} id="mizora" />
            </Box>
            <Box
              style={{
                position: 'fixed',
                top: '50px',
                left: '15px',
                zIndex: 1000,
              }}
              display={camState === 'off' ? 'none' : 'block'}
            >
              <Button
                colorScheme={'gray'}
                width={'32px'}
                height={'32px'}
                borderRadius={'50%'}
                marginRight={5}
                onClick={turnOffCamera}
                leftIcon={<RiArrowLeftSLine size={25} />}
                style={{ zIndex: 1000, height: '37px' }}
              ></Button>
            </Box>
            <Box
            // w={[600, 600]} mt={130} p={0} display={{ md: 'flex' }} ml={handsLeftRight === "Left" ? -20 : 100
            >
              {
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 602 319"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    top: '-50px',
                    left: '0px',
                    position: 'fixed',
                    boxSize: '100%',
                    objectFit: 'cover',
                  }}
                >
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOf}
                    pathLength="100"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={'1 1'}
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${braceletsHolderSvg.d}`}
                  ></path>
                  <path
                    className={actionOncahnge === 'Manual' ? animasiClassOf : animasiClassOn}
                    pathLength="1"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${braceletsHolderSvg.d}`}
                  ></path>
                </svg>
              }
            </Box>
            {/* <Box  zIndex={2000} style={{
                position: "fixed",
                bottom: "330px",
                padding: "30px",
                right: "20px",
                color: "whitesmoke",
                fontSize: "9px"
                }} display={
                camState === "off" ? (
                    "none"
                ) : (
                    "block"
                )
                }>
                <div left="140px" style={{ color: 'white' }}>Landmark Finger : {`${Jari}`}</div>
                <div left="240px" style={{ color: 'white' }}>Landmark Total  : {`${TotX}`}</div>
                <div left="240px" style={{ color: 'white' }}>Landmark %  : {`${TotalLandmark}`}</div>
            </Box> */}
            <Box style={{ backgroundColor: '#FFFFF', position: 'absolute', bottom: '70px', left: '10px' }} display={camState === 'off' ? 'none' : 'block'}>
              <Link
                href={{
                  pathname: '/drag-area',
                  query: { img: imageCapture },
                }}
              >
                <Image h="50px" objectFit="cover" id="emojimage" display={camState === 'off' ? 'none' : 'block'} />
              </Link>
            </Box>
          </Box>

          {/* Foter */}
          <Box pb={0} pt={0} w={'100%'} h={180} bottom={0} position="fixed" bg={'transparent'} zIndex={2000}>
            <Box position={'absolute'} right={4} bottom={14} zIndex={2000}>
              <Toggle />
            </Box>
            <Box position={'absolute'} right={4} bottom={8} zIndex={2000} color="whiteAlpha.800">
              {actionOncahnge}
            </Box>
            <Container centerContent position={'relative'} top={39}>
              <Box margin={2} padding="4" maxW="md">
                {/* <Stack spacing={0} direction="row" align="left" marginBottom={4}>
                        <Button
                            colorScheme={handsLeftRight === "Left" ? ("blue") : ("gray")}
                            width={"47px"}
                            height={"47px"}
                            borderRadius={"50px"}
                            marginRight={5}
                            onClick={HandsLeft}
                            style={{ zIndex: 1000 }}
                        >
                            <Image src={HandLeftOutline.HandLeft.src} />
                        </Button>
                        <Button
                            colorScheme={handsLeftRight === "Right" ? ("blue") : ("gray")}
                            width={"47px"}
                            height={"47px"}
                            borderRadius={"50px"}
                            onClick={HandsRight}
                            style={{ zIndex: 1000 }}
                        >

                            <Image src={HandRightOutline.HandRight.src} />
                        </Button>
                    </Stack> */}
                <Stack spacing={0} direction="row" align="center" marginBottom={6} marginLeft={6}>
                  <Button
                    width={'67px'}
                    height={'67px'}
                    borderRadius={'50%'}
                    leftIcon={actionOncahnge === 'Manual' ? <RiCameraFill size={25} style={{ marginLeft: '6px' }} /> : <RiCameraOffFill size={25} style={{ marginLeft: '6px' }} />}
                    disabled={actionOncahnge === 'Manual' ? (disabledbottonCamera ? true : false) : true}
                    onClick={actionOncahnge === 'Manual' ? takeCap : turnOffCamera}
                    colorScheme={actionOncahnge === 'Manual' ? 'gray' : 'blackAlpha'}
                    bg={actionOncahnge === 'Manual' ? '#FFFFFF' : 'rgba(0, 0, 0, 0.92)'}
                  ></Button>
                </Stack>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <></>
      )}
      {camState === 'off' ? (
        <>
          <Footer
            params={{
              OnMe: RingOnMe,
              img: imageCapture,
              ProductImageThumb: imageStackLS.ProductImageThumb.Bracelets,
              ProductImage: imageStackLS.ProductImage.Bracelets,
              productName: imageStackLS.productName.Bracelets,
              productPrice: imageStackLS.productPrice.Bracelets,
              productID: imageStackLS.productID.Bracelets,
            }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
