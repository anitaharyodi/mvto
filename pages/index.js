import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Metatags from '@/components/metatags'
import { Koordinats } from '@/components/koordinat'
import { URL_PRODUCT, URL_PRODUCT_CATEGORY } from '@/components/api/urls'
import LandingPage from '@/components/home/LandingPage'
import dynamic from 'next/dynamic'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '@/components/values/product_categories'
import { Text } from '@chakra-ui/react'
import useModelStore from '@/components/stores/useModelStore'
import useParamsStore from '@/components/stores/useParamsStore'
import useProductStore from '@/components/stores/useProductStore'
// import LoadingPlaceholder from '@/components/home/LoadingPlaceholder'

const Footer = dynamic(() => import('@/components/footer/Footer'), {
  ssr: false,
})

const imageModelDefault = {
  Rings: { image: Koordinats.KoordinatRings.model.image },
  Bracelets: { image: Koordinats.KoordinatBracelets.model.image },
  Earings: { image: Koordinats.KoordinatEarrings.model.image },
  Bangles: { image: Koordinats.KoordinatBangles.model.image },
  Necklaces: { image: Koordinats.KoordinatNecklaces.model.image },
}

export default function Home() {
  const params = useSearchParams()
  const id_prod = params.get('id_prod')
  var id_cat=null
  var cat=null
  

  const onSelectModel = useModelStore(s => s.onSelect)
  const setParams = useParamsStore(s => s.setParams)
  const [error, setError] = useState('')
  const [items, setItems] = useState([]) // @todo: where does "items" used?

  const productStackList = useProductStore(s => s.productStackList)
  const setProductStackList = useProductStore(s => s.setProductStackList)
  const setIndexProduct = useProductStore(s => s.setIndexProduct)
  const setFooterParams = useModelStore(s => s.setFooterParams)

  const init = useCallback(() => {
    // fetch from API
    const url = `${URL_PRODUCT}/${id_prod}`
    fetch(url)
      .then(res => res.json())
      .then(
        async result => {
          const arrImgStackProduct = []
          const arrImgStackThumb = []
          const arrTitle = []
          const arrPrice = []
          const arrProductID = []
          if (result.data) {
                      //  for (let s = 0; s < result.data.length; s++) {
            id_cat = result.data.category_id
            if(id_cat === 7) 
              cat = CAT_BRACELETS
            else if(id_cat === 8) 
              cat = CAT_BANGLES
            else if(id_cat === 9) 
              cat = CAT_EARRINGS
            else if(id_cat === 10) 
              cat = CAT_RINGS
            else if(id_cat === 11) 
              cat = CAT_NECKLACES

            
            const pricenumb = result.data.price
            const imageslider = result.data.photo_1
            arrProductID.push(result.data.id)
            arrTitle.push(result.data.title)
            arrPrice.push(
              'IDR ' +
                parseFloat(pricenumb)
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            )
            arrImgStackThumb.push(imageslider)
            const r = await fetch(`/api/img_to_base64?src=${result.data.photo_vto}`)
            let image_data_url = await r.text()
            arrImgStackProduct.push(image_data_url)
              // hardcode sementara, pke dummy. @todo: hapus jika API udh bener.
                
              setParams({
                cat : cat,
                id_cat : id_cat,
                id_prod : id_prod,
                login: params.get('login'),
                customer_id: params.get('customer_id'),
              })

              localStorage.setItem('params', JSON.stringify({
                cat : cat,
                id_cat : id_cat,
                id_prod : id_prod,
                login: params.get('login'),
                customer_id: params.get('customer_id'),
              }))
              
            //}

            setTimeout(() => {
              setProductStackList({
                ProductImage: {
                  Rings: cat === CAT_RINGS ? arrImgStackProduct : [],
                  Bracelets: cat === CAT_BRACELETS ? arrImgStackProduct : [],
                  Earings: cat === CAT_EARRINGS ? arrImgStackProduct : [],
                  Bangles: cat === CAT_BANGLES ? arrImgStackProduct : [],
                  Necklaces: cat === CAT_NECKLACES ? arrImgStackProduct : [],
                },
                ProductImageThumb: {
                  Rings: cat === CAT_RINGS ? arrImgStackThumb : [],
                  Bracelets: cat === CAT_BRACELETS ? arrImgStackThumb : [],
                  Earings: cat === CAT_EARRINGS ? arrImgStackThumb : [],
                  Bangles: cat === CAT_BANGLES ? arrImgStackThumb : [],
                  Necklaces: cat === CAT_NECKLACES ? arrImgStackThumb : [],
                },
                productName: {
                  Rings: cat === CAT_RINGS ? arrTitle : [],
                  Bracelets: cat === CAT_BRACELETS ? arrTitle : [],
                  Earings: cat === CAT_EARRINGS ? arrTitle : [],
                  Bangles: cat === CAT_BANGLES ? arrTitle : [],
                  Necklaces: cat === CAT_NECKLACES ? arrTitle : [],
                },
                productPrice: {
                  Rings: cat === CAT_RINGS ? arrPrice : [],
                  Bracelets: cat === CAT_BRACELETS ? arrPrice : [],
                  Earings: cat === CAT_EARRINGS ? arrPrice : [],
                  Bangles: cat === CAT_BANGLES ? arrPrice : [],
                  Necklaces: cat === CAT_NECKLACES ? arrPrice : [],
                },
                productID: {
                  Rings: cat === CAT_RINGS ? arrProductID : [],
                  Bracelets: cat === CAT_BRACELETS ? arrProductID : [],
                  Earings: cat === CAT_EARRINGS ? arrProductID : [],
                  Bangles: cat === CAT_BANGLES ? arrProductID : [],
                  Necklaces: cat === CAT_NECKLACES ? arrProductID : [],
                },
              })
              setItems(result)

              if (cat === CAT_RINGS) {
                setFooterParams( {
                  img_list: imageModelDefault.Rings.image,
                  ProductImageThumb: productStackList.ProductImageThumb.Rings,
                  ProductImage: productStackList.ProductImage.Rings,
                  productName: productStackList.productName.Rings,
                  productPrice: productStackList.productPrice.Rings,
                  productID: productStackList.productID.Rings,
                })
              } else if (cat === CAT_BRACELETS) {
                setFooterParams( {
                  img_list: imageModelDefault.Bracelets.image,
                  ProductImageThumb: productStackList.ProductImageThumb.Bracelets,
                  ProductImage: productStackList.ProductImage.Bracelets,
                  productName: productStackList.productName.Bracelets,
                  productPrice: productStackList.productPrice.Bracelets,
                  productID: productStackList.productID.Bracelets,
                })
              } else if (cat === CAT_EARRINGS) {
                setFooterParams( {
                  img_list: imageModelDefault.Earings.image,
                  ProductImageThumb: productStackList.ProductImageThumb.Earings,
                  ProductImage: productStackList.ProductImage.Earings,
                  productName: productStackList.productName.Earings,
                  productPrice: productStackList.productPrice.Earings,
                  productID: productStackList.productID.Earings,
                })
              } else if (cat === CAT_BANGLES) {
                setFooterParams( {
                  img_list: imageModelDefault.Bangles.image,
                  ProductImageThumb: productStackList.ProductImageThumb.Bangles,
                  ProductImage: productStackList.ProductImage.Bangles,
                  productName: productStackList.productName.Bangles,
                  productPrice: productStackList.productPrice.Bangles,
                  productID: productStackList.productID.Bangles,
                })
              } else if (cat === CAT_NECKLACES) {
                setFooterParams( {
                  img_list: imageModelDefault.Necklaces.image,
                  ProductImageThumb: productStackList.ProductImageThumb.Necklaces,
                  ProductImage: productStackList.ProductImage.Necklaces,
                  productName: productStackList.productName.Necklaces,
                  productPrice: productStackList.productPrice.Necklaces,
                  productID: productStackList.productID.Necklaces,
                })
              }
            })
          }
        },
        error => {
          setError(error)
        }
      )
      .catch(e => {
        alert('Gagal memuat halaman. Silakan refresh halaman kembali')
      })
      .finally(() => {
        localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinats))
        localStorage.setItem('dragableStatus', false)
        // localStorage.setItem('IndexParams', 0)
        onSelectModel(0)
        // localStorage.setItem('indexProductStack', 0)
        setIndexProduct(0)
      })
  }, [id_prod, setProductStackList, onSelectModel, setIndexProduct])

  useEffect(() => {
    if (id_prod) {
      init()
    }
  }, [init, setParams, params, id_prod])

  return (
    <>
      <Metatags />
      {id_prod === null?  <LandingPage /> : <Footer /> }
    
      
    </>
  )
}
