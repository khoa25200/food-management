import useCurrentWidth from '../layout/modules/WidthScreen/WidthScreen'
import React from 'react'

const useDeviceDetect = (number = 0) => {
  const [isMobile, setMobile] = React.useState(false)
  const width = useCurrentWidth()
  React.useEffect(() => {
    if (width > 767 + number) {
      setMobile(false)
    } else {
      setMobile(true)
    }
  }, [width, number])
  return { isMobile }
}

export default useDeviceDetect
