import { Button, Text , IconButton } from "@chakra-ui/react"
import { BsQrCodeScan } from "react-icons/bs"
import { Container } from "@chakra-ui/react"

/**
 * QR Code scanner
 * 
 */
import { IDetectedBarcode, Scanner as QRcodeScanner } from '@yudiel/react-qr-scanner';
import { useState } from "react";
import React from "react";

/*
interface QRCodeScannerProps {
  something: any
}
*/

export const QRCodeScanner = (/*{ something }: QRCodeScannerProps*/) => {
  const [showScanner, setShowScanner] = useState(false)
  /**
   * (detectedCodes: IDetectedBarcode[]) => void
   */
  const onScanHandler = async (detectedCodes: IDetectedBarcode[] ) => {
    console.log(` Here is the scanned code: [${detectedCodes[0]}]`)
    // alert(` Here is the scanned code: [${JSON.stringify(detectedCodes[0], null, 2)}]`);
    /**
     * Wow, it's awesome, it works incredibly good
     */
    alert(` Here is the scanned code: [${detectedCodes[0].rawValue}]`);
    const unsealKey = detectedCodes[0].rawValue;
    const unsealVaultRawResponse = await fetch('http://192.168.1.12::8751/vault-unseal', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key: unsealKey})
    });
    const unsealVaultResponse = await unsealVaultRawResponse.json();
  
    // 
    console.log(unsealVaultResponse);
    alert(unsealVaultResponse);
  }
  const onScanErrorHandler = async (error: unknown ) => {
    console.log(` An error occured while trying to scna the QR code, the error is: [${JSON.stringify({error: error}, null, 2)}]`)
  }
  return (
    <Container>

        {showScanner?<QRcodeScanner scanDelay={2} onError={onScanErrorHandler} onScan={onScanHandler} />:
        <Text>
          Click on Button to Scan your Unseal Key 
        </Text>}
        <Button title="toggle QR code scanner" variant="solid" type="button" size="md" onClick={() => {
          console.log(`Onclick jbl showScanner=[${showScanner}]`)
          // setShowScanner(true)
          setShowScanner(!showScanner)
        }}>
          <BsQrCodeScan/> Scan QR code
        </Button>
      
    </Container>
  )
}
