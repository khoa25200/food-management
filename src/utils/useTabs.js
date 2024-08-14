import { useState, useMemo, useEffect } from 'react'
import usePrevious from '@root/src/utils/usePrevious'

const useTabs = (tabs, defaultTab) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const activeIndex = useMemo(() => {
    if (selectedTab) {
      return tabs.indexOf(selectedTab)
    }
    return -1
  }, [selectedTab, tabs])
  const previousActiveIndex = usePrevious(activeIndex)

  useEffect(() => {
    if (tabs.length === 0) {
      setSelectedTab(undefined)
      return
    }
    if (selectedTab === null || (selectedTab && tabs.includes(selectedTab))) {
      return
    }
    if (
      typeof previousActiveIndex === 'number' &&
      previousActiveIndex >= 0 &&
      (tabs[previousActiveIndex] || tabs[previousActiveIndex - 1])
    ) {
      setSelectedTab(tabs[previousActiveIndex] || tabs[previousActiveIndex - 1])
      return
    }
    if (defaultTab === null) {
      return
    }
    setSelectedTab(
      defaultTab && tabs.includes(defaultTab) ? defaultTab : tabs[0],
    )
  }, [selectedTab, defaultTab, tabs, previousActiveIndex])

  return [selectedTab, setSelectedTab]
}

export default useTabs
