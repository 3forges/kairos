import React, { useEffect, useState } from "react"
import {
  Avatar,
  HStack,
  Status,
  HoverCard,
  Icon,
  Link,
  Portal,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react"
import { LuRefreshCcw, LuChartLine, LuGitCommitHorizontal, LuLockOpen, LuLock } from "react-icons/lu"
import { BsPersonStanding, BsPersonDown, BsGit } from "react-icons/bs"
interface VaultStatusHoverCardProps {
  initialVaultStatus?: VaultStatus
}

interface VaultStatus {
  initialized: boolean
  sealed: boolean
  standby: boolean
  server_time_utc: number
  version: string
  cluster_name: string
  cluster_id: string
  last_wal: number
}









export const VaultStatusHoverCard = ({ initialVaultStatus = {
  cluster_id: '',
  cluster_name: '',
  initialized: false,
  last_wal: -1,
  sealed: false,
  server_time_utc: 0,
  standby: false,
  version: "-1.-1.-1"
} }: VaultStatusHoverCardProps): React.JSX.Element => {
  const [vaultStatus, SetVaultStatus] = useState<VaultStatus>(initialVaultStatus)
  const fetchVaultStatus = async (signal: AbortSignal) => {
    console.info(` just calling fetchVaultStatus now`)
    const fetchVaultStatusResponsePromise = await fetch('/vault-status', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: signal
    }).catch((error) => {
      // alert(`fetchVaultStatus //   ERROR raw  fetching API raw Error: [${error}]`)
      // alert(`fetchVaultStatus //   ERROR  fetching API: [${JSON.stringify({ error: error }, null, 2)}]`)
      console.log(`fetchVaultStatus //   ERROR  fetching API: [${JSON.stringify({ error: error }, null, 2)}]`)
    });
    const fetchVaultStatusResponse = await fetchVaultStatusResponsePromise?.json();
    // --- 
    // 
    // console.log(fetchVaultStatusResponse);
    console.log(` fetchVaultStatus //  Here is the  fetchVaultStatusResponse = [${JSON.stringify({ fetchVaultStatusResponse: fetchVaultStatusResponse }, null, 2)}] `);
    const newStatus: VaultStatus = {
      cluster_id: fetchVaultStatusResponse.cluster_id,
      cluster_name: fetchVaultStatusResponse.cluster_name,
      initialized: fetchVaultStatusResponse.initialized,
      last_wal: fetchVaultStatusResponse.last_wal,
      sealed: fetchVaultStatusResponse.sealed,
      server_time_utc: fetchVaultStatusResponse.server_time_utc,
      standby: fetchVaultStatusResponse.standby,
      version: fetchVaultStatusResponse.version,
    }
    console.log(` fetchVaultStatus // JUST BEFORE CALLING SetVaultStatus(newStatus) Here is the  newStatus = [${JSON.stringify({ newStatus: newStatus }, null, 2)}] `);
    
    SetVaultStatus(newStatus)
  }
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal; 
    fetchVaultStatus(signal)
    return () => {
      abortController.abort()
    }
  }, [/* vaultStatus.ClusterID, vaultStatus.ServerTimeUTC */ ])
  /*
  const [vaultStatus, SetVaultStatus] = useState<VaultStatus>({
    ClusterID: '',
    ClusterName: '',
    Initialized: false,
    LastWAL: -1,
    Sealed: false,
    ServerTimeUTC: 0,
    Standby: false,
    Version: "-1"
  })
    */
  return (
    <>
      <HoverCard.Root size="sm">
        <HoverCard.Trigger asChild>
          <Link href="#">@OpenBaoVault</Link>
        </HoverCard.Trigger>
        <Portal>
          <HoverCard.Positioner>
            <HoverCard.Content>
              <HoverCard.Arrow />
              <Stack gap="4" direction="row">
                <Avatar.Root>
                  <Avatar.Image src="https://avatars.githubusercontent.com/u/152585220?s=48&v=4" />
                  <Avatar.Fallback name="Chakra UI" />
                </Avatar.Root>
                <Stack gap="3">
                  <Stack gap="1">
                    <Text textStyle="sm" fontWeight="semibold">
                      Chakra UI
                    </Text>
                    <Text textStyle="sm" color="fg.muted">
                      The most powerful toolkit for building modern web
                      applications.
                    </Text>
                  </Stack>
                  <HStack color="fg.subtle">
                    <BsGit className="sm" />
                    <Text textStyle="xs">{vaultStatus.version}</Text>
                  </HStack>
                  <HStack color="fg.subtle">
                    <Status.Root colorPalette={vaultStatus.initialized?"green":"orange"}>
                      <Status.Indicator />
                      Initialized : {vaultStatus.initialized?"Yes":"No"}
                    </Status.Root>
                    <Status.Root colorPalette={vaultStatus.sealed?"green":"red"}>
                      <Status.Indicator />
                      {vaultStatus.sealed?<LuLock/>:<LuLockOpen />}
                      Sealed: {vaultStatus.sealed?"Yes":"No"}
                    </Status.Root>
                  </HStack>
                  <HStack color="fg.subtle">
                    <Status.Root colorPalette={vaultStatus.standby?"blue":"gray"}>
                      <Status.Indicator />
                      {vaultStatus.standby?<BsPersonStanding />:<BsPersonDown />}
                      Standby
                    </Status.Root>
                    <Status.Root colorPalette={"blue"}>
                      <Status.Indicator />
                      {vaultStatus.server_time_utc?<BsPersonStanding />:<BsPersonDown />}
                      ServerTimeUTC: {vaultStatus.server_time_utc}
                    </Status.Root>
                  </HStack>
                  <HStack color="fg:subtle" >

                  <Button title="Refresh status" variant="solid" type="button" size="md" onClick={async () => {
        console.log(`Onclick jbl Trigger fetch vaultStatus.Version=[${vaultStatus.version}]`)
        // setShowScanner(true)
        const abortController = new AbortController()
        const signal = abortController.signal
        await fetchVaultStatus(signal)
      }}>
        <LuRefreshCcw /> Refresh status
      </Button>
                  </HStack>
                </Stack>
              </Stack>
            </HoverCard.Content>
          </HoverCard.Positioner>
        </Portal>
      </HoverCard.Root>
      
    </>
  )
}












