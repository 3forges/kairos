import { Button, Text, IconButton } from "@chakra-ui/react"
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
  const testSendingPOST = async () => {

    alert(` testSendingPOST // and unsealVaultResponse will arrive after] `);
    /**
     * Wow, it's awesome, it works incredibly good
     */

    const unsealKey = `U0RGRlpFUkVSRlRSSFlEUkZIREhERkdIRkgK`;
    const unsealVaultRawResponse = await fetch('/vault-unseal', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Key: unsealKey })
    }).catch((error) => {
      alert(`testSendingPOST //   ERROR raw  fetching API raw Error: [${error}]`)
      alert(`testSendingPOST //   ERROR  fetching API: [${JSON.stringify({ error: error }, null, 2)}]`)
      console.log(`testSendingPOST //   ERROR  fetching API: [${JSON.stringify({ error: error }, null, 2)}]`)
    });
    alert(`testSendingPOST //  after fetch`)
    const unsealVaultResponse = await unsealVaultRawResponse?.json();

    // 
    console.log(unsealVaultResponse);
    alert(` testSendingPOST //  Here is the  unsealVaultResponse = [${JSON.stringify({ unsealVaultResponse: unsealVaultResponse }, null, 2)}] `);
    //alert(unsealVaultResponse);
  }
  /**
   * (detectedCodes: IDetectedBarcode[]) => void
   */
  const onScanHandler = async (detectedCodes: IDetectedBarcode[]) => {
    console.log(` Here is the scanned code: [${detectedCodes[0]}]`)
    // alert(` Here is the scanned code: [${JSON.stringify(detectedCodes[0], null, 2)}]`);
    alert(` Here is the scanned code: [${detectedCodes[0].rawValue}]  `);
    alert(` And // and unsealVaultResponse will arrive after] `);
    /**
     * Wow, it's awesome, it works incredibly good
     */

    const unsealKey = detectedCodes[0].rawValue;
    // const unsealVaultRawResponse = await fetch('http://192.168.1.12:8751/vault-unseal', {
    const unsealVaultRawResponse = await fetch('/vault-unseal', { // note /vault-unseal is proxied in the [vite.config.ts], this allows ignoring that the golang API navy-seals is serving over a self-signed TLS cert
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Key: unsealKey })
    }).catch((error) => {
      alert(` ERROR raw  fetching API raw Error: [${error}]`)
      alert(` ERROR  fetching API: [${JSON.stringify({ error: error }, null, 2)}]`)
    });
    alert(` after fetch`)
    const unsealVaultResponse = await unsealVaultRawResponse?.json();

    // 
    // console.log(unsealVaultResponse);
    alert(` Here is the scanned code: [${detectedCodes[0].rawValue}] // and unsealVaultResponse = [${JSON.stringify({ unsealVaultResponse: unsealVaultResponse }, null, 2)}] `);
    alert(` Here is the Unseal VAult Response: [${JSON.stringify({unsealVaultResponse: unsealVaultResponse}, null, 2)}]`);
    console.log(` Here is the Unseal VAult Response: [${JSON.stringify({unsealVaultResponse: unsealVaultResponse}, null, 2)}]`);
  }
  const onScanErrorHandler = async (error: unknown) => {
    console.log(` An error occured while trying to scna the QR code, the error is: [${JSON.stringify({ error: error }, null, 2)}]`)
  }
  return (
    <Container>

      {showScanner ? <QRcodeScanner scanDelay={2} onError={onScanErrorHandler} onScan={onScanHandler} /> :
        <Text>
          Click on Button to Scan your Unseal Key
        </Text>}
      <Button title="toggle QR code scanner" variant="solid" type="button" size="md" onClick={() => {
        console.log(`Onclick jbl showScanner=[${showScanner}]`)
        // setShowScanner(true)
        setShowScanner(!showScanner)
      }}>
        <BsQrCodeScan /> Scan QR code
      </Button>
      <Button title="test UNSEAL" variant="solid" type="button" size="md" onClick={() => {
        console.log(`Onclick jbl TEST UNSEAL`)
        // setShowScanner(true)
        testSendingPOST()
      }}>
        <BsQrCodeScan /> TEST UNSEAL
      </Button>

    </Container>
  )
}
