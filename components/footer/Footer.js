import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Text, Heading, Button, Stack, Container, Box, Flex, Tooltip } from '@chakra-ui/react'
import { RiCameraFill, RiAddCircleFill, RiIndeterminateCircleFill } from 'react-icons/ri'
import html2canvas from 'html2canvas'
import downloadjs from 'downloadjs'
import Spinner from 'react-spinner-material'
import { StackHolderSvg, SingleHolderSvg, handsplaceholderSolid } from '../handsplaceholder'
import SliderOnmodel from '../slideOnmodel'
import SliderOnCompare from '../slideOnCompare'
import SliderStack from '../slideStack'
import { isMobile } from 'react-device-detect'
import { useSearchParams } from 'next/navigation'
// import Rings from '../onMe/Rings'
import CaptureModel from '../onMe/CaptureModel'
import Earings from '../onMe/Earings'
import QR from '../qr/QR'
import Header from '../header/Header'
import OnModel from '../onModel/OnModel'
import OnModelCompare from '../onCompare/OnModelCompare'
// import { Koordinatsonme } from '../koordinatonme'
import { URL_CART } from '../api/urls'
// import { productPrice } from '../stackimage'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '../values/product_categories'
import useParamsStore from '../stores/useParamsStore'
import useProductStore from '../stores/useProductStore'
import useModelStore from '../stores/useModelStore'
import { STATE_OFF, STATE_ON, VIEW_ON_COMPARE, VIEW_ON_DETAIL, VIEW_ON_ME, VIEW_ON_MODEL } from '../values/view_modes'
import { Koordinats as KoordinatsModelsFooter } from '../koordinat'
import * as handpose from '@tensorflow-models/handpose'
import * as facemesh from '@tensorflow-models/facemesh'
import { braceletsHolderSvg } from '../handsplaceholder'
import { FaceHolderSolidSvg } from '../faceholder'
import { NecklaceHolderDashSvg } from '../necklaceholder'

export default function Footer() {
  const params = useModelStore(s => s.footer_params)
  const model_id = useModelStore(s => s.index_selected)
  const view_mode = useModelStore(s => s.view_mode)
  const setViewMode = useModelStore(s => s.setViewMode)
  const img_list = useModelStore(s => s.footer_params.img_list)
  const setImgList = useModelStore(s => s.setImgList)

  const productID = params.productID

  const cat = useParamsStore(s => s.cat)
  const id_cat = useParamsStore(s => s.id_cat)
  const id_prod = useParamsStore(s => s.id_prod)
  const customer_id = useParamsStore(s => s.customer_id)
  const login = useParamsStore(s => s.login)
  const index_product = useProductStore(s => s.index_product)

  const [stack_state, setStackState] = useState(STATE_ON)
  const [is_initialized, setIsInitialized] = useState(false)
  const [on_login, setOnLogin] = useState('')
  // const [on_me, SetOnMe] = useState('')
  const param = useSearchParams()
  const on_me = param.get('onme');
  const [image_stack, setimageStack] = useState()
  const [product_name_default, setProductNameDefault] = useState('')
  const [product_price_default, setProductPriceDefault] = useState('')
  const [scale_zoom, setZoomScale] = useState({ scale: 1 })

  function switcStack() {
    setStackState(v => {
      if (v === STATE_ON) {
        setimageStack({
          image: !params.ProductImageThumb ? [] : params.ProductImageThumb,
        })
        return STATE_OFF
      } else {
        return STATE_ON
      }
    })
  }

  // ZoomIn ZoomOut
  function zoomIn() {
    const newscale = scale_zoom.scale + 0.2
    if (newscale <= 2.2) {
      setZoomScale({ scale: newscale })
      document.getElementById('box-onmodel').style.transform = 'scale(' + newscale + ')'
    }
  }

  function zoomOut() {
    const newscale = scale_zoom.scale - 0.2
    if (newscale >= 1) {
      setZoomScale({ scale: newscale })
      document.getElementById('box-onmodel').style.transform = 'scale(' + newscale + ')'
    }
  }
  // end | ZoomIn ZoomOut

  function onClickMe() {
    setViewMode(VIEW_ON_ME)
    setImgList([])
  }

  function onMeCamera() {
    setViewMode(VIEW_ON_ME)
  }

  function onModelBtnAction() {
    // if (cat === CAT_RINGS) {
    //   setImgList(KoordinatsModelsFooter.KoordinatRings.model.image)
    // } else if (cat === CAT_BRACELETS) {
    //   setImgList(KoordinatsModelsFooter.KoordinatBracelets.model.image)
    // } else if (cat === CAT_EARRINGS) {
    //   setImgList(KoordinatsModelsFooter.KoordinatEarrings.model.image)
    // } else if (cat === CAT_BANGLES) {
    //   setImgList(KoordinatsModelsFooter.KoordinatBangles.model.image)
    // } else if (cat === CAT_NECKLACES) {
    //   setImgList(KoordinatsModelsFooter.KoordinatNecklaces.model.image)
    // }

    // setViewMode(VIEW_ON_MODEL)
    // setStackState(STATE_ON)
    window.location.reload();
    // var path = location.protocol + '//' + location.host
    // const url = `${path}/?cat=${cat}&login=true&customer_id=${customer_id}&id_cat=${id_cat}&id_prod=${id_prod}`
    // //console.log(url)
    // window.location.href = url
  }

  function onDetail() {
    const url = `/detail?cat=${cat}&login=${login}&id_cat=${id_cat}&model_id=${model_id}&product_id=${index_product}`
    window.open(url, 'formpopup', 'toolbar=no,scrollbars=yes,resizable=no,top=500,left=500,width=3800,height=4000')
  }

  const addtobag = useCallback(() => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      customer_id,
      quantity: 1,
      product_id: productID[!index_product ? 0 : index_product],
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(URL_CART, requestOptions)
      .then(response => response.text())
      .then(() => {
        document.querySelector('#loader-capture').style.display = 'block'
        setTimeout(() => {
          window.open('https://mizora.jewelry/cart', '_blank')
          document.querySelector('#loader-capture').style.display = 'none'
        }, 3000)
      })
      .catch(error => console.log('error', error))
  }, [customer_id, index_product, productID])

  const init = useCallback(() => {
    const productNameDefault = params.productName[!index_product ? 0 : index_product]
    const productPriceDefault = params.productPrice[!index_product ? 0 : index_product]

    setOnLogin(!login ? 'false' : login)
    setProductNameDefault(productNameDefault)
    setProductPriceDefault(productPriceDefault)

    setIsInitialized(true)
  }, [index_product, login, params.productName, params.productPrice])

  useEffect(() => {
    if (on_me === "on") {
      setViewMode(VIEW_ON_ME)
    } else {
      setViewMode(VIEW_ON_MODEL)
    }
    if (!is_initialized) {
      init()
    }
  }, [init, is_initialized])

  const img_product = useMemo(() => {
    const img = params.ProductImage[index_product]
    return img
  }, [index_product, params.ProductImage])

  const onDownload = useCallback(async () => {
    // let img_src = img_product + ''
    // if (img_src.charAt(0) !== '/') {
    //   const r = await fetch(`/api/img_to_base64?src=${img_product}`)
    //   img_src = await r.text()
    // }
    const el = document.querySelector('#box-onmodel')
    const img_el = document.querySelector('#boxprod').children[0]
    //img_el.setAttribute('src', img_src)
    const control_el = document.getElementsByClassName('moveable-control-box')[0]
    control_el.style.display = 'none'
    let filename = `${(new Date().toJSON().slice(0,19))}_my_model.jpg`

    setTimeout(() =>  {
      html2canvas(el).then(canvas => {
        ///const a = document.createElement('a')
        let dataURL = canvas.toDataURL('image/jpg')
        // a.download = filename
        // a.click()
        // a.remove()
        // setTimeout(() => {
        //   control_el.style.display = 'block'
        // })
        downloadjs(dataURL, filename, 'image/png');
      })
    })
  }, [img_product])

  return (
    <>
      {view_mode === VIEW_ON_MODEL || view_mode === VIEW_ON_DETAIL ? (
        <>
          <OnModel
            params={{
              img_list,
              ProductImage: !params.ProductImage ? [] : params.ProductImage,
              ProductImageThumb: params.ProductImageThumb,
            }}
          />
          <Header params={{ lengslider: img_list.length }} />
        </>
      ) : null}
      {view_mode === VIEW_ON_ME ? (
        <>
          {cat === CAT_BRACELETS ? isMobile ? <CaptureModel pose={handpose} holderSvg={braceletsHolderSvg} /> : <QR /> : null}
          {cat === CAT_BANGLES ? isMobile ? <CaptureModel pose={handpose} holderSvg={braceletsHolderSvg} /> : <QR /> : null}
          {cat === CAT_RINGS ? isMobile ? <CaptureModel pose={handpose} holderSvg={handsplaceholderSolid} /> : <QR /> : null}
          {cat === CAT_EARRINGS ? isMobile ? <CaptureModel pose={facemesh} holderSvg={FaceHolderSolidSvg} /> : <QR /> : null}
          {cat === CAT_NECKLACES ? isMobile ? <CaptureModel pose={facemesh} holderSvg={NecklaceHolderDashSvg} /> : <QR /> : null}

          {/* {cat === CAT_EARRINGS ? isMobile ? <Earings params={{ OnMe: on_me }} /> : <QR /> : <></>} */}
          {/* <Header params={{ lengslider: img_list.length }} /> */}
        </>
      ) : null}
      {view_mode === VIEW_ON_COMPARE ? (
        <>
          <OnModelCompare
            params={{
              onCompare: () => {
                console.log('onCompare()')
              },
            }}
          />
          <Header params={{ lengslider: img_list.length }} />
        </>
      ) : null}
      {view_mode !== VIEW_ON_ME ? (
        <Box w={'100%'} maxH={350} h={210} bg="whiteAlpha" bottom={0} position="fixed" id="box-footer" zIndex={1900}>
          <Box pb={0} pt={0} w={'100%'} h={50} bottom={0} position="relative">
            {view_mode !== VIEW_ON_COMPARE ? (
              <>
                <Flex flexDir="column" position={'absolute'} right={4} top="-30px" zIndex={200} gap="2">
                  {img_list.length === 1 ? (
                    <Tooltip hasArrow label="Download Image" placement="top">
                      <Button
                        colorScheme={'gray'}
                        width={'30px'}
                        minWidth={'30px'}
                        height={'30px'}
                        borderRadius={'50%'}
                        fontSize={2}
                        onClick={onDownload}
                        style={{ paddingLeft: '1px', paddingRight: '0px' }}
                      >
                        {
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5.25589 16C3.8899 15.0291 3 13.4422 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417M12 21V11M12 21L9 18M12 21L15 18"
                              stroke="#000000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      </Button>
                    </Tooltip>
                  ) : null}
                </Flex>
                <Box position={'absolute'} left={-2} top={-3} zIndex={200}>
                  <Button
                    style={{ transform: 'rotate(90deg)' }}
                    width={'80px'}
                    height={'35px'}
                    borderRadius={'50px'}
                    leftIcon={<RiAddCircleFill size={30} onClick={zoomIn} />}
                    rightIcon={<RiIndeterminateCircleFill size={30} style={{ transform: 'rotate(90deg)' }} onClick={zoomOut} />}
                  ></Button>
                </Box>
              </>
            ) : (
              <></>
            )}
            <Container centerContent position={'relative'} top={-4}>
              <Box margin={2} padding="4" maxW="md">
                <Stack spacing={2} direction="row" align="left" marginBottom={0}>
                  <Button
                    colorScheme={'gray'}
                    width={'30px'}
                    minWidth={'30px'}
                    height={'30px'}
                    borderRadius={'50%'}
                    fontSize={2}
                    onClick={onMeCamera}
                    leftIcon={<RiCameraFill size={15} style={{ marginLeft: '-7px' }} />}
                    display={img_list.length === 1 ? 'block' : 'none'}
                  ></Button>
                  <Button
                    colorScheme={view_mode === VIEW_ON_MODEL && img_list.length > 1 ? 'blackAlpha' : 'gray'}
                    bg={view_mode === VIEW_ON_MODEL && img_list.length > 1 ? 'rgba(0, 0, 0, 0.92)' : '#FFFFFF'}
                    width={'70px'}
                    height={'30px'}
                    borderRadius={'20px'}
                    fontSize={9}
                    onClick={onModelBtnAction}
                  >
                    On Model
                  </Button>
                  <Button
                    colorScheme={view_mode === VIEW_ON_ME || (view_mode === VIEW_ON_MODEL && img_list.length === 1) ? 'blackAlpha' : 'gray'}
                    bg={view_mode === VIEW_ON_ME || (view_mode === VIEW_ON_MODEL && img_list.length === 1) ? 'rgba(0, 0, 0, 0.92)' : '#FFFFFF'}
                    width={'70px'}
                    height={'30px'}
                    borderRadius={'20px'}
                    marginRight={0}
                    fontSize={9}
                    onClick={onClickMe}
                  >
                    On Me
                  </Button>
                </Stack>
              </Box>
            </Container>
          </Box>
          {view_mode !== VIEW_ON_ME && view_mode !== VIEW_ON_DETAIL ? (
            <Box pb={0} pt={0} w={'100%'} h={120} bg="gray.400" bottom={0} position="relative" id="box-thumb-slide">
              <Stack>
                <Box>
                  {stack_state === STATE_ON && view_mode !== VIEW_ON_COMPARE ? (
                    <SliderOnmodel />
                  ) : view_mode === VIEW_ON_COMPARE ? (
                    <SliderOnCompare slides={{ img: img_list }} />
                  ) : (
                    <SliderStack slides={{ img: image_stack }} />
                  )}
                </Box>
              </Stack>
            </Box>
          ) : null}
          <Box pb={0} pt={0} w={'100%'} h={180} bg={view_mode !== VIEW_ON_ME ? '#FFFFFF' : 'transparent'} bottom={0} position="relative">
            <Box h="20px" id="box-title-product" position={'absolute'} left={'20px'} top={'70px'}>
              <Text>{!product_name_default ? params.productName[0] : product_name_default}</Text>
            </Box>
            <Heading id="box-price-product" as="h5" size="smll" className="tutor-text" color="black" textAlign="left" position={'absolute'} left={'20px'} top={'90px'}>
              <Text>{!product_price_default ? params.productPrice[0] : product_price_default}</Text>
            </Heading>
            {on_login === 'true' ? (
              <>
                <Box h="20px">
                  <Button
                    bg={'rgba(0, 0, 0, 0.92)'}
                    colorScheme={'blackAlpha'}
                    width={'125px'}
                    height={'30px'}
                    borderRadius={'20px'}
                    position={'absolute'}
                    right={'20px'}
                    top={'70px'}
                    padding={5}
                    onClick={addtobag}
                  >
                    Add to Bag
                  </Button>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      ) : null}
      <Box
        id="loader-capture"
        style={{
          position: 'fixed',
          top: '0px',
          backgroundColor: '#686c70',
          opacity: '0.7',
          width: '100%',
          height: '100%',
          zIndex: 5000,
        }}
        align="center"
        display="none"
      >
        <div
          className="div-loader"
          style={{
            backgroundColor: '#FFFFF',
            position: 'absolute',
            top: '300px',
          }}
        >
          <Spinner radius={60} color={'black'} stroke={9} visible={true} />
        </div>
      </Box>
    </>
  )
}
