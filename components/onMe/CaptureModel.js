import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import * as handpose from '@tensorflow-models/handpose'
import { handsplaceholderSolid, handsplaceholderDash, HandRightOutline, HandLeftOutline } from '../handsplaceholder'
import { Button, Image, Stack, Container, Box } from '@chakra-ui/react'
import Link from 'next/link'
import Spinner from 'react-spinner-material'
import { Koordinatsonme } from '../koordinatonme'
import { RiCameraFill, RiCameraOffFill, RiArrowLeftSLine } from 'react-icons/ri'
import useParamsStore from '../stores/useParamsStore'
import useModelStore from '../stores/useModelStore'
import { STATE_OFF, STATE_ON, VIEW_ON_MODEL } from '../values/view_modes'
import { Signimage, Signpass } from '../handimage'
import { URL_CART, URL_ONME, URL_MAIN } from '../api/urls'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '../values/product_categories'
import { Koordinats as KoordinatsModelsFooter } from '../koordinat'
import { isMobile } from 'react-device-detect'
import { useSearchParams } from 'next/navigation'
import Toggle from '../Toggle.Component'
const animasiClassOf = 'animasi-of-left'
const animasiClassOn = 'animasi-on-left'

export default function CaptureModel({ pose, holderSvg }) {
  const [stack_state, setStackState] = useState(STATE_ON)
  const categoryDefault = useParamsStore(s => ({ ...s }))
  const setViewMode = useModelStore(s => s.setViewMode)
  const setImgList = useModelStore(s => s.setImgList)
  let signList = []

  const param = useSearchParams()
  var mobiled = param.get('_token')
  const prod_name = param.get('prod_name')
  const on_me = param.get('onme')
  //const customer_id = param.get('customer_id');
  const min = 1
  const max = 999999

  const customer_id = param.get('customer_id') === 'null' || param.get('customer_id') === null ? Math.round(min + Math.random() * (max - min)) : param.get('customer_id')
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [camState, setCamState] = useState('on')

  const [imageCaptureList, setImageCaptureList] = useState([])
  const [koordinat_tubuh, setKoordinatTubuh] = useState([])
  // const [actionOncahnge, setActionOnchange] = useState('Otomatis')
  const [actionOncahnge, setActionOnchange] = useState('Manual')
  const [statusReady, setStatusReady] = useState(true)

  const [disabledbottonCamera, setDisabledButtonCamera] = useState(false)

  const [Jari, setJari] = useState(0)
  const [TotX, setTotX] = useState(0)
  const [TotalLandmark, setTotalLandmark] = useState(0)

  const [windowSize, setWindowSize] = useState({ innerWidth: 450, innerHeight: 443 })
  const [defaultScale, setDefaultScale] = useState(1)
  const cat = categoryDefault.cat

  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [actionCamera, setActionCamera] = useState('Manual')

  useEffect(() => {
    const scaleWidth = window.innerWidth
    const scaleHeight = window.innerHeight
    const scaleDefaulring = 1 / ((scaleHeight - 200) / scaleWidth)
    setDefaultScale(scaleDefaulring)
  }, [defaultScale])

  const detect = useCallback(
    async net => {
      setStatusReady(true)
      // Check data is available
      if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
        setActionOnchange(localStorage.getItem('actioncamera'))
        let statusCamera = ''
        statusCamera = localStorage.getItem('actioncamera')
        console.log('statusCamera B', statusCamera)
        if (statusCamera === 'Otomatis') {
          document.getElementById('alert').textContent = "Harap tunggu..."
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

          if (net.estimateFaces) {
            const face = await net.estimateFaces(video)
            // @todo:
            if (face.length > 0) {
              let totData = 0
              let scaleWidth = window.innerWidth
              // if (scaleWidth >= 300) {
              if (true) {
                console.log(face[0].annotations)
                if (cat == CAT_NECKLACES) {
                  if (face[0].annotations.leftCheek.length > 0) {
                    for (let h = 0; h < face[0].annotations.leftCheek.length; h++) {
                      totData += face[0].annotations.leftCheek[h][0]
                      //console.log('totData',face[0].annotations.palmBase[h][0])
                    }

                    // document.getElementById('alert').textContent = "leftCheek" + totData
                    // console.log('masuk', totData)
                    if (totData >= 265 && totData <= 275) {
                      takeCap()
                    }
                  }
                } else if (cat == CAT_EARRINGS) {
                  if (face[0].annotations.leftEyebrowLower.length > 0) {
                    for (let h = 0; h < face[0].annotations.leftEyebrowLower.length; h++) {
                      totData += face[0].annotations.leftEyebrowLower[h][0]
                      //console.log('totData',face[0].annotations.leftEyebrowLower[h][0])
                    }
                    // document.getElementById('alert').textContent = "leftEyebrowLower" + totData
                    // console.log('masuk', totData)
                    if (totData >= 1335 && totData <= 1350) {
                      takeCap()
                    }
                  }
                }
              }
            }
          } else if (net.estimateHands) {
            const hand = await net.estimateHands(video)
            if (hand.length > 0) {
              let totData = 0
              let scaleWidth = window.innerWidth
              console.log(hand[0].annotations)
              // if (scaleWidth >= 300) {
              if (true) {
                if (cat == CAT_BRACELETS) {
                  if (hand[0].annotations.palmBase.length > 0) {
                    for (let h = 0; h < hand[0].annotations.palmBase.length; h++) {
                      totData += hand[0].annotations.palmBase[h][0]
                      // console.log('totData', hand[0].annotations.palmBase[h][0])
                    }
                    // document.getElementById('alert').textContent = "palmBase" + totData
                    // console.log('masuk', totData)
                    if (totData >= 260 && totData <= 263) {
                      takeCap()
                    }
                  }
                } else if (cat == CAT_RINGS) {
                  if (hand[0].annotations.ringFinger.length > 0) {
                    for (let h = 0; h < hand[0].annotations.ringFinger.length; h++) {
                      totData += hand[0].annotations.ringFinger[h][0]
                      // console.log('totData', hand[0].annotations.palmBase[h][0])
                    }

                    document.getElementById('alert').textContent = "ringfinger" + totData
                    // console.log('masuk', totData)
                    if (totData >= 925 && totData <= 935) {
                      takeCap()
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    [categoryDefault.cat, categoryDefault.customer_id, categoryDefault.id_cat, categoryDefault.login, imageCaptureList, setImgList, setViewMode]
  )

  const runPose = useCallback(async () => {
    const net = await pose.load()
    _signList()
    setInterval(() => {
      detect(net)
    }, 1000)
  }, [detect, pose])

  function _signList() {
    signList = generateSigns()
  }

  function generateSigns() {
    const password = shuffle(Signpass)
    return password
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
  useEffect(() => {
    runPose()
  }, [runPose])

  useEffect(() => {
    if(actionCamera === 'Otomatis') {
      document.getElementById('alert').textContent = "Harap tunggu..."
    }else {
       document.getElementById('alert').textContent = ""
    }
  }, [actionCamera])

  useEffect(() => {
    localStorage.setItem('actioncamera', checked ? 'Otomatis' : 'Manual')
    setActionCamera(checked ? 'Otomatis' : 'Manual')
  }, [checked])

  // useEffect(() => {
  //   localStorage.setItem('actioncamera', actionOncahnge)
  // }, [actionOncahnge])

  function turnOffCamera() {
    if (cat === CAT_RINGS) {
      setImgList(KoordinatsModelsFooter.KoordinatRings.model.image)
    } else if (cat === CAT_BRACELETS) {
      setImgList(KoordinatsModelsFooter.KoordinatBracelets.model.image)
    } else if (cat === CAT_EARRINGS) {
      setImgList(KoordinatsModelsFooter.KoordinatEarrings.model.image)
    } else if (cat === CAT_BANGLES) {
      setImgList(KoordinatsModelsFooter.KoordinatBangles.model.image)
    } else if (cat === CAT_NECKLACES) {
      setImgList(KoordinatsModelsFooter.KoordinatNecklaces.model.image)
    }

    setViewMode(VIEW_ON_MODEL)
    setStackState(STATE_ON)
  }

  useEffect(() => {
    localStorage.setItem('koordinatJari', JSON.stringify(koordinat_tubuh))
  }, [koordinat_tubuh])

  function takeCap() {
    const image_data_url = webcamRef.current.getScreenshot()
    //console.log(customer_id)
    if (mobiled && on_me === 'on') {
      //save
      var raw = JSON.stringify(image_data_url)

      var requestOptions = {
        method: 'POST',
        body: raw,
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "application/x-www-form-urlencoded",
        },
      }

      fetch(`${URL_ONME}/onme.php?customer_id=${customer_id}`, requestOptions)
        .then(response => response.text())
        .then(() => {
          window.location.href = `${URL_MAIN}product/${prod_name}` //'https://betarevamp.mizora.jewelry/'
        })
        .catch(error => console.log('error', error))
    } else {
      const arr_img = [image_data_url]
      if (imageCaptureList.length !== 0) {
        for (let s = 0; s < imageCaptureList.length + 1; s++) {
          if (s < imageCaptureList.length) {
            arr_img.push(imageCaptureList[s])
          } else {
            arr_img.push(image_data_url)
          }
        }
      }
      setImageCaptureList({ image: arr_img })

      document.getElementById('emojimage').setAttribute('src', image_data_url)
      document.querySelector('#loader-capture').style.display = 'block'
      setDisabledButtonCamera(true)
      setTimeout(() => {
        const inerwidth = window.innerWidth
        const inerheight = window.innerHeight
        setWindowSize({ innerWidth: inerwidth, innerHeight: inerheight })
        setCamState('off')
        // setRingOnMe('off')
        // const newParams = {
        //   cat: categoryDefault.cat,
        //   login: !categoryDefault.login ? 'false' : categoryDefault.login,
        //   customer_id: !categoryDefault.customer_id ? null : categoryDefault.customer_id,
        //   id_cat: !categoryDefault.id_cat ? '' : categoryDefault.id_cat,
        //   onme: 'off',
        // }
        // localStorage.setItem('params', JSON.stringify(newParams))
        // setParams(newParams)
        // localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinatsonme))

        setImgList(arr_img)
        setViewMode(VIEW_ON_MODEL)
        document.querySelector('#loader-capture').style.display = 'none'
      })
    }
  }

  const handleChange = e => {
    setChecked(e.target.checked)
  }

  return (
    <>
      <Box h="20px" id="alert" zIndex={'999999'} position={'absolute'} left={'20px'} top={'70px'}></Box>
      {camState === 'on' && statusReady ? (
        <>
          <Box
            w={'100%'}
            bg="#0e1c28f0"
            id="box-onmodel-cam"
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
              <Webcam id="webcam" screenshotQuality={1} ref={webcamRef} videoConstraints={{ facingMode: 'environment' }} style={{ bottom: '0px' }} />
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
              <Image alt="" h="25px" src={'https://mizora.jewelry/assets/images/logo-mizora.svg'} id="mizora" />
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
              {on_me !== 'on' && (
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
              )}
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
                    left: cat === CAT_RINGS ? '60px' : cat === CAT_NECKLACES ? '-10px' : cat === CAT_EARRINGS ? '80px' : '0px',
                    position: 'fixed',
                    boxSize: '100%',
                    objectFit: 'cover',
                  }}
                >
                  <path
                    className={actionCamera === 'Manual' ? animasiClassOf : animasiClassOf}
                    pathLength="100"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={'1 1'}
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${holderSvg.d + holderSvg.d1 + holderSvg.d2 + holderSvg.d3}`}
                  ></path>
                  <path
                    className={actionCamera === 'Manual' ? animasiClassOf : animasiClassOn}
                    pathLength="1"
                    stroke="white"
                    fill="none"
                    strokeWidth="2"
                    display={camState === 'on' ? 'block' : 'none'}
                    d={`${holderSvg.d + holderSvg.d1 + holderSvg.d2 + holderSvg.d3}`}
                  ></path>
                </svg>
              }
            </Box>
            <Box style={{ backgroundColor: '#FFFFF', position: 'absolute', bottom: '70px', left: '10px' }} display={camState === 'off' ? 'none' : 'block'}>
              <Link
                href={{
                  pathname: '/drag-area',
                  query: { img: imageCaptureList },
                }}
              >
                <Image alt="" h="50px" objectFit="cover" id="emojimage" display={camState === 'off' ? 'none' : 'block'} />
              </Link>
            </Box>
          </Box>

          {/* Foter */}
          <Box pb={0} pt={0} w={'100%'} h={180} bottom={0} position="fixed" bg={'transparent'} zIndex={2000}>
            <Box position={'absolute'} right={4} bottom={14} zIndex={2000}>
              <Toggle checked={checked} size="default" disabled={disabled} onChange={handleChange} offstyle="btn-danger" onstyle="btn-success" />
            </Box>
            <Box position={'absolute'} right={4} bottom={8} zIndex={2000} color="whiteAlpha.800">
              {actionCamera}
            </Box>
            <Container centerContent position={'relative'} top={39}>
              <Box margin={2} padding="4" maxW="md">
                <Stack spacing={0} direction="row" align="center" marginBottom={6} marginLeft={6}>
                  <Button
                    width={'67px'}
                    height={'67px'}
                    borderRadius={'50%'}
                    leftIcon={actionCamera === 'Manual' ? <RiCameraFill size={25} style={{ marginLeft: '6px' }} /> : <RiCameraOffFill size={25} style={{ marginLeft: '6px' }} />}
                    disabled={actionCamera === 'Manual' ? (disabledbottonCamera ? true : false) : true}
                    onClick={actionCamera === 'Manual' ? takeCap : turnOffCamera}
                    colorScheme={actionCamera === 'Manual' ? 'gray' : 'blackAlpha'}
                    bg={actionCamera === 'Manual' ? '#FFFFFF' : 'rgba(0, 0, 0, 0.92)'}
                  ></Button>
                </Stack>
              </Box>
            </Container>
          </Box>
        </>
      ) : null}
    </>
  )
}
