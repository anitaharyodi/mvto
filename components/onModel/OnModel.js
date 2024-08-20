import React, { useState, useEffect, useMemo } from 'react'
import { Box, Center } from '@chakra-ui/react'
import { Koordinats as KoordinatsModels } from '@/components/koordinat'
import DragUseSpring from '../dragable/DragUseSpring'
import useModelStore from '../stores/useModelStore'
import useParamsStore from '../stores/useParamsStore'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '../values/product_categories'
import { isMobile } from 'react-device-detect'
import { useSearchParams } from 'next/navigation'
import useDeviceType from 'utils/DeviceTypes'

export default function OnModel(props) {
  const screen_width = document.documentElement.clientWidth
  const index_model = useModelStore(s => s.index_selected)
  const param = useSearchParams()
  var onMeParams = param.get('onme')
  let indexCustom
  const indexBottom = onMeParams === 'on' ? 2 : 1
  const onSelectModel = useModelStore(s => s.onSelect)
  const cat = useParamsStore(s => s.cat)
  const mobileType = useDeviceType()

  const img = useMemo(() => props.params.img_list[index_model], [index_model, props.params.img_list])
  const [_, setscaleZoom] = useState({ scale: 1 })

  var on_me = param.get('onme')

  if (onMeParams === 'on') {
    indexCustom = 3
  } else if (screen_width < 360) {
    if(mobileType === 'Android') {
      indexCustom = 1
    }else {
      indexCustom = 4
    }
  } else if (screen_width > 360) {
    indexCustom = 2
  }

  if (props.params.img_list.length === 1) on_me = 'on'
  else on_me = 'off'

  var mobiled = param.get('_token')
  useEffect(() => {
    const scaleZoomLS = localStorage.setItem('scaleZoom', 1)
    if (scaleZoomLS) {
      setscaleZoom(scaleZoomLS)
    }
  }, [props.params.img_list.length])
  const style_model_product_default = useMemo(() => {
    const draggable_status = localStorage.getItem('dragableStatus')
    if (cat === CAT_BANGLES) {
      if (on_me === 'on' && !isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatBangles.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBangles.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatBangles.model.marginOnMe.right[index_model],
          bottom: KoordinatsModels.KoordinatBangles.model.marginOnMe.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBangles.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBangles.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBangles.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBangles.model.bgPositionX[index_model], KoordinatsModels.KoordinatBangles.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBangles.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBangles.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBangles.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBangles.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBangles.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBangles.model.transformOriginOnMe[index_model],
        }
      } else if (on_me === 'on' && isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatBangles.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBangles.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatBangles.model.marginOnMe.right[1],
          bottom: KoordinatsModels.KoordinatBangles.model.marginOnMe.bottom[1],
          rotasi: KoordinatsModels.KoordinatBangles.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBangles.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBangles.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBangles.model.bgPositionX[index_model], KoordinatsModels.KoordinatBangles.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBangles.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBangles.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBangles.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBangles.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBangles.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBangles.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBangles.model.transformOriginOnMe[index_model],
        }
      } else if (isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatBangles.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBangles.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatBangles.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatBangles.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBangles.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBangles.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBangles.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBangles.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBangles.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBangles.model.bgPositionX[index_model], KoordinatsModels.KoordinatBangles.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBangles.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBangles.model.marginMobile.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBangles.model.marginMobile.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBangles.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBangles.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBangles.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBangles.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBangles.model.transformOriginOnMe[index_model],
        }
      } else {
        return {
          widthBox: KoordinatsModels.KoordinatBangles.model.marginDesktop.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBangles.model.marginDesktop.topBox[index_model],
          right: KoordinatsModels.KoordinatBangles.model.marginDesktop.right[index_model],
          bottom: KoordinatsModels.KoordinatBangles.model.marginDesktop.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBangles.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBangles.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBangles.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBangles.model.marginDesktop.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBangles.model.marginDesktop.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBangles.model.bgPositionX[index_model], KoordinatsModels.KoordinatBangles.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBangles.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBangles.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBangles.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBangles.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBangles.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBangles.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBangles.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBangles.model.transformOriginOnMe[index_model],
        }
      }
    } else if (cat === CAT_NECKLACES) {
      if (on_me === 'on' && !isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.right[index_model],
          bottom: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatNecklaces.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatNecklaces.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatNecklaces.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatNecklaces.model.bgPositionX[index_model], KoordinatsModels.KoordinatNecklaces.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatNecklaces.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatNecklaces.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatNecklaces.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatNecklaces.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatNecklaces.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatNecklaces.model.transformOriginOnMe[index_model],
        }
      } else if (on_me === 'on' && isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.right[1],
          bottom: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.bottom[1],
          rotasi: KoordinatsModels.KoordinatNecklaces.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatNecklaces.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatNecklaces.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatNecklaces.model.bgPositionX[index_model], KoordinatsModels.KoordinatNecklaces.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatNecklaces.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatNecklaces.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatNecklaces.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatNecklaces.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatNecklaces.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatNecklaces.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatNecklaces.model.transformOriginOnMe[index_model],
        }
      } else if (isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatNecklaces.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatNecklaces.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatNecklaces.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatNecklaces.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatNecklaces.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatNecklaces.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatNecklaces.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatNecklaces.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatNecklaces.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatNecklaces.model.bgPositionX[index_model], KoordinatsModels.KoordinatNecklaces.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatNecklaces.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatNecklaces.model.marginMobile.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatNecklaces.model.marginMobile.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatNecklaces.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatNecklaces.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatNecklaces.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatNecklaces.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatNecklaces.model.transformOriginOnMe[index_model],
        }
      } else {
        return {
          widthBox: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.topBox[index_model],
          right: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.right[index_model],
          bottom: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatNecklaces.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatNecklaces.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatNecklaces.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatNecklaces.model.bgPositionX[index_model], KoordinatsModels.KoordinatNecklaces.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatNecklaces.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatNecklaces.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatNecklaces.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatNecklaces.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatNecklaces.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatNecklaces.model.transformOriginOnMe[index_model],
        }
      }
    } else if (cat === CAT_EARRINGS) {
      if (on_me === 'on' && !isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatEarrings.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatEarrings.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatEarrings.model.marginOnMe.right[index_model],
          bottom: KoordinatsModels.KoordinatEarrings.model.marginOnMe.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatEarrings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatEarrings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatEarrings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatEarrings.model.bgPositionX[index_model], KoordinatsModels.KoordinatEarrings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatEarrings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatEarrings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatEarrings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatEarrings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatEarrings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatEarrings.model.transformOriginOnMe[index_model],
        }
      } else if (on_me === 'on' && isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatEarrings.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatEarrings.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatEarrings.model.marginOnMe.right[1],
          bottom: KoordinatsModels.KoordinatEarrings.model.marginOnMe.bottom[1],
          rotasi: KoordinatsModels.KoordinatEarrings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatEarrings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatEarrings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatEarrings.model.bgPositionX[index_model], KoordinatsModels.KoordinatEarrings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatEarrings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatEarrings.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatEarrings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatEarrings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatEarrings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatEarrings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatEarrings.model.transformOriginOnMe[index_model],
        }
      } else if (isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatEarrings.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatEarrings.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatEarrings.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatEarrings.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatEarrings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatEarrings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatEarrings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatEarrings.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatEarrings.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatEarrings.model.bgPositionX[index_model], KoordinatsModels.KoordinatEarrings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatEarrings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatEarrings.model.marginMobile.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatEarrings.model.marginMobile.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatEarrings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatEarrings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatEarrings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatEarrings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatEarrings.model.transformOriginOnMe[index_model],
        }
      } else {
        return {
          widthBox: KoordinatsModels.KoordinatEarrings.model.marginDesktop.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatEarrings.model.marginDesktop.topBox[index_model],
          right: KoordinatsModels.KoordinatEarrings.model.marginDesktop.right[index_model],
          bottom: KoordinatsModels.KoordinatEarrings.model.marginDesktop.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatEarrings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatEarrings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatEarrings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatEarrings.model.marginDesktop.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatEarrings.model.marginDesktop.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatEarrings.model.bgPositionX[index_model], KoordinatsModels.KoordinatEarrings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatEarrings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatEarrings.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatEarrings.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatEarrings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatEarrings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatEarrings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatEarrings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatEarrings.model.transformOriginOnMe[index_model],
        }
      }
    } else if (cat === CAT_BRACELETS) {
      if (on_me === 'on' && !isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatBracelets.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBracelets.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatBracelets.model.marginOnMe.right[index_model],
          bottom: KoordinatsModels.KoordinatBracelets.model.marginOnMe.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBracelets.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBracelets.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBracelets.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBracelets.model.bgPositionX[index_model], KoordinatsModels.KoordinatBracelets.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBracelets.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBracelets.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBracelets.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBracelets.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBracelets.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBracelets.model.transformOriginOnMe[index_model],
        }
      } else if (on_me === 'on' && isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatBracelets.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBracelets.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatBracelets.model.marginOnMe.right[1],
          bottom: KoordinatsModels.KoordinatBracelets.model.marginOnMe.bottom[1],
          rotasi: KoordinatsModels.KoordinatBracelets.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBracelets.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBracelets.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBracelets.model.bgPositionX[index_model], KoordinatsModels.KoordinatBracelets.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBracelets.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBracelets.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBracelets.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBracelets.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBracelets.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBracelets.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBracelets.model.transformOriginOnMe[index_model],
        }
      } else if (isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatBracelets.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBracelets.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatBracelets.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatBracelets.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBracelets.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBracelets.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBracelets.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBracelets.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBracelets.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBracelets.model.bgPositionX[index_model], KoordinatsModels.KoordinatBracelets.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBracelets.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBracelets.model.marginMobile.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBracelets.model.marginMobile.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBracelets.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBracelets.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBracelets.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBracelets.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBracelets.model.transformOriginOnMe[index_model],
        }
      } else {
        return {
          widthBox: KoordinatsModels.KoordinatBracelets.model.marginDesktop.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBracelets.model.marginDesktop.topBox[index_model],
          right: KoordinatsModels.KoordinatBracelets.model.marginDesktop.right[index_model],
          bottom: KoordinatsModels.KoordinatBracelets.model.marginDesktop.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBracelets.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBracelets.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBracelets.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBracelets.model.bgPositionX[index_model], KoordinatsModels.KoordinatBracelets.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBracelets.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatBracelets.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatBracelets.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatBracelets.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatBracelets.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatBracelets.model.transformOriginOnMe[index_model],
        }
      }
    } else if (cat === CAT_RINGS) {
      if (on_me === 'on' && !isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatRings.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatRings.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatRings.model.marginOnMe.right[index_model],
          bottom: KoordinatsModels.KoordinatRings.model.marginOnMe.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatRings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatRings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatRings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatRings.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatRings.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatRings.model.bgPositionX[index_model], KoordinatsModels.KoordinatRings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatRings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatRings.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatRings.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatRings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatRings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatRings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatRings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatRings.model.transformOriginOnMe[index_model],
        }
      }
      if (on_me === 'on' && isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatRings.model.marginOnMe.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatRings.model.marginOnMe.topBox[index_model],
          right: KoordinatsModels.KoordinatRings.model.marginOnMe.right[indexCustom],
          bottom: KoordinatsModels.KoordinatRings.model.marginOnMe.bottom[indexBottom],
          rotasi: KoordinatsModels.KoordinatRings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatRings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatRings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatRings.model.marginOnMe.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatRings.model.marginOnMe.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatRings.model.bgPositionX[index_model], KoordinatsModels.KoordinatRings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatRings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatRings.model.marginOnMe.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatRings.model.marginOnMe.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatRings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatRings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatRings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatRings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatRings.model.transformOriginOnMe[index_model],
        }
      }
      // else if (isMobile && !mobiled) {
      //   return {
      //     widthBox: KoordinatsModels.KoordinatRings.model.marginMobiled.widthBox[index_model],
      //     topBox: KoordinatsModels.KoordinatRings.model.marginMobiled.topBox[index_model],
      //     right: KoordinatsModels.KoordinatRings.model.marginMobiled.right[index_model],
      //     bottom: KoordinatsModels.KoordinatRings.model.marginMobiled.bottom[index_model],
      //     rotasi: KoordinatsModels.KoordinatRings.model.rotasi[index_model],
      //     scale: KoordinatsModels.KoordinatRings.model.scaleMobile[index_model],
      //     transformDesktop: KoordinatsModels.KoordinatRings.model.transformDesktop[index_model],
      //     marginLeftMobile: KoordinatsModels.KoordinatRings.model.marginMobiled.marginLeft[index_model],
      //     marginTopMobile: KoordinatsModels.KoordinatRings.model.marginMobiled.marginTop[index_model],
      //     BGPositionMobile: [KoordinatsModels.KoordinatRings.model.bgPositionX[index_model], KoordinatsModels.KoordinatRings.model.bgPositionY[index_model]],
      //     BGSizeMobile: KoordinatsModels.KoordinatRings.model.bgSizeMobile[index_model],
      //     marginLeftDesktop: KoordinatsModels.KoordinatRings.model.marginMobiled.marginLeft[index_model],
      //     marginTopDesktop: KoordinatsModels.KoordinatRings.model.marginMobiled.marginTop[index_model],
      //     BGPositionDesktop1: KoordinatsModels.KoordinatRings.model.bgPositionXDesktop[index_model],
      //     BGPositionDesktop2: KoordinatsModels.KoordinatRings.model.bgPositionYDesktop[index_model],
      //     BGSizeDesktop: KoordinatsModels.KoordinatRings.model.bgSizeDesktop[index_model],
      //     LeftMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
      //     TopMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
      //     LeftDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
      //     TopDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
      //     transformOrigin: KoordinatsModels.KoordinatRings.model.transformOrigin[index_model],
      //     transformOriginOnMe: KoordinatsModels.KoordinatRings.model.transformOriginOnMe[index_model],
      //   }
      // }
      else if (isMobile) {
        return {
          widthBox: KoordinatsModels.KoordinatRings.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatRings.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatRings.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatRings.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatRings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatRings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatRings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatRings.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatRings.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatRings.model.bgPositionX[index_model], KoordinatsModels.KoordinatRings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatRings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatRings.model.marginMobile.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatRings.model.marginMobile.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatRings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatRings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatRings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatRings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatRings.model.transformOriginOnMe[index_model],
        }
      } else {
        return {
          widthBox: KoordinatsModels.KoordinatRings.model.marginDesktop.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatRings.model.marginDesktop.topBox[index_model],
          right: KoordinatsModels.KoordinatRings.model.marginDesktop.right[index_model],
          bottom: KoordinatsModels.KoordinatRings.model.marginDesktop.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatRings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatRings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatRings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatRings.model.marginDesktop.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatRings.model.marginDesktop.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatRings.model.bgPositionX[index_model], KoordinatsModels.KoordinatRings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatRings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatRings.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatRings.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop1: KoordinatsModels.KoordinatRings.model.bgPositionXDesktop[index_model],
          BGPositionDesktop2: KoordinatsModels.KoordinatRings.model.bgPositionYDesktop[index_model],
          BGSizeDesktop: KoordinatsModels.KoordinatRings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          transformOrigin: KoordinatsModels.KoordinatRings.model.transformOrigin[index_model],
          transformOriginOnMe: KoordinatsModels.KoordinatRings.model.transformOriginOnMe[index_model],
        }
      }
    } else {
      return []
    }
  }, [cat, index_model])

  useEffect(() => {
    document.getElementById('boxprod').style.width = `${style_model_product_default.widthBox}%`
    document.getElementById('boxprod').style.top = `${style_model_product_default.topBox}%`

    document.getElementById('productBox').style.right = `${style_model_product_default.right}%`
    document.getElementById('productBox').style.bottom = `${style_model_product_default.bottom}px`
    if (cat === CAT_BRACELETS && on_me == 'on') {
      document.getElementById('productBox').style.transform = 'translate(0px, 0px) rotate(-110deg)'
    } else {
      document.getElementById('productBox').style.transform = `${style_model_product_default.transformDesktop}`
    }
    document.getElementById('box-onmodel').style.backgroundPosition = `${style_model_product_default.BGPositionDesktop1} ${style_model_product_default.BGPositionDesktop2}%`
    document.getElementById('box-onmodel').style.backgroundSize = `${style_model_product_default.BGSizeDesktop}`
    if (on_me === 'on') {
      document.getElementById('box-onmodel').style.transformOrigin = `${style_model_product_default.transformOriginOnMe}`
    } else {
      document.getElementById('box-onmodel').style.transformOrigin = `${style_model_product_default.transformOrigin}`
    }
    onSelectModel(index_model)
    //}
  }, [
    index_model,
    onSelectModel,
    style_model_product_default.BGPositionDesktop,
    style_model_product_default.BGSizeDesktop,
    style_model_product_default.bottom,
    style_model_product_default.right,
    style_model_product_default.topBox,
    style_model_product_default.transformDesktop,
    style_model_product_default.widthBox,
  ])
  if (on_me === 'on' && !isMobile) {
    return (
      <Center>
        <Box
          w="full"
          bg="white"
          style={{
            touchAction: 'none',
            position: 'fixed',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease 0s',
            transformOrigin: '195px 229px 0px',
            bottom: '50px',
            top: '0px',
            zIndex: '1800',
          }}
        >
          &nbsp;
        </Box>
        <Box
          maxW="345px"
          bg="#0e1c28f0"
          id="box-onmodel"
          aaa="1"
          style={{
            touchAction: 'none',
            backgroundPosition: 'center center',
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'fixed',
            // transform: 'scale(1)',
            transition: 'transform 0.3s ease 0s',
            transformOrigin: '195px 229px 0px',
            bottom: '205px',
            top: '0px',
            zIndex: '1800',
            width: '365px',
          }}
        >
          <DragUseSpring
            position="relative"
            // params={{
            //   bgref: bgRef,
            //   lengslider: props.params.lengslider,
            //   ProductImage: props.params.ProductImage,
            // }}
          />
        </Box>
      </Center>
    )
  } else if (on_me === 'on' && isMobile) {
    return (
      <Center>
        <Box
          w="full"
          bg="white"
          style={{
            touchAction: 'none',
            position: 'fixed',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease 0s',
            transformOrigin: '195px 229px 0px',
            bottom: '250px',
            top: '0px',
            zIndex: '1800',
          }}
        >
          &nbsp;
        </Box>
        <Box
          w="330px"
          // h={417.4}
          // marginTop={10}
          bg="#0e1c28f0"
          id="box-onmodel"
          aaa="2"
          style={{
            touchAction: 'none',
            backgroundPosition: 'center center',
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'fixed',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease 0s',
            transformOrigin: '195px 229px 0px',
            bottom: '205px',
            top: '0px',
            zIndex: '1800',
          }}
        >
          <DragUseSpring
            position="relative"
            // params={{
            //   bgref: bgRef,
            //   lengslider: props.params.lengslider,
            //   ProductImage: props.params.ProductImage,
            // }}
          />
        </Box>
      </Center>
    )
  } else {
    return (
      <Center>
        <Box
          w="full"
          bg="white"
          style={{
            touchAction: 'none',
            position: 'fixed',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease 0s',
            transformOrigin: '195px 229px 0px',
            bottom: '250px',
            top: '0px',
            zIndex: '1800',
          }}
        >
          &nbsp;
        </Box>
        <Box
          w="350px"
          // h={417.4}
          // marginTop={10}
          bg="#0e1c28f0"
          id="box-onmodel"
          aaa="3"
          style={{
            touchAction: 'none',
            backgroundPosition: 'center center',
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'fixed',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease 0s',
            transformOrigin: '195px 229px 0px',
            bottom: '205px',
            top: '0px',
            zIndex: '1800',
          }}
        >
          <DragUseSpring
            position="relative"
            // params={{
            //   bgref: bgRef,
            //   lengslider: props.params.lengslider,
            //   ProductImage: props.params.ProductImage,
            // }}
          />
        </Box>
      </Center>
    )
  }
}
