import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

function ModalPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState(null)

  const data = [
    {
      name: 'Cincin',
      url: '?id_customer=&login=true&id_prod=5&prod_name=Unknown&_token=AkIhaMeDpidaOfA4PFpQfy3KsboNEyx0xTdVq9aP',
    },
    {
      name: 'Anting',
      url: '?id_customer=&login=true&id_prod=17&prod_name=Unknown&_token=AkIhaMeDpidaOfA4PFpQfy3KsboNEyx0xTdVq9aP',
    },
    {
      name: 'Kalung',
      url: '?id_customer=&login=true&id_prod=96&prod_name=Unknown&_token=AkIhaMeDpidaOfA4PFpQfy3KsboNEyx0xTdVq9aP',
    },
    {
      name: 'Gelang',
      url: '?id_customer=&login=true&id_prod=14&prod_name=Unknown&_token=AkIhaMeDpidaOfA4PFpQfy3KsboNEyx0xTdVq9aP',
    },
  ]

  const handleOpenModal = (item) => {
    setSelectedItem(item)
    onOpen()
  }

  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <Button onClick={() => handleOpenModal(item)}>{item.name}</Button>
        </div>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={298.4} maxW={498.4}> 
          <ModalHeader>{selectedItem?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            {selectedItem && (
              <iframe
                style={{ position: 'relative', width: '100%', height: '622px', padding:'16px' }}
                src={`https://5558-103-162-62-7.ngrok-free.app/${selectedItem.url}`}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default ModalPage
