import type * as types from 'notion-types'
import { IoMenu } from '@react-icons/all-files/io5/IoMenu'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleDarkMode}
            title='Dark Mode Toggle'
            className='p-3 cursor-pointer button rounded-[3px] hover:bg-(--bg-color-0)'>
            {hasMounted && isDarkMode ? (
              <IoMoonSharp className='text-base ' />
            ) : (
              <IoSunnyOutline className='text-base' />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Toggle Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  const renderNavigationLinks = () => (
    <>
      {navigationLinks?.map((link, index) => {
        if (!link.pageId && !link.url) return null

        return (
          <NavigationMenu key={index} className='list-none navmenu'>
            <NavigationMenuItem>
              {link.pageId ? (
                <NavigationMenuLink asChild>
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    title={link.title}
                    className='breadcrumb button text-sm font-medium text-muted-foreground hover:text-primary'>
                    {link.title}
                  </components.PageLink>
                </NavigationMenuLink>
              ) : (
                <NavigationMenuLink asChild>
                  <components.Link
                    href={link.url}
                    className='text-sm font-medium text-muted-foreground hover:text-primary'>
                    {link.title}
                  </components.Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          </NavigationMenu>
        )
      })}
    </>
  )

  return (
    <header className='notion-header flex justify-between px-4 py-2'>
      <div className='flex justify-between container items-center max-w-5xl mx-auto'>
        <Breadcrumbs block={block} rootOnly={true} />

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-2 '>
          {renderNavigationLinks()}

          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden'>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant='ghost' size='icon'>
                <IoMenu className='text-xl' />
              </Button>
            </DrawerTrigger>
            <DrawerContent className='p-6 bg-(--bg-color) text-(--fg-color) border-1 !border-(--border)'>
              <nav className='flex flex-col gap-4'>
                {renderNavigationLinks()}

                <ToggleThemeButton />

                {isSearchEnabled && <Search block={block} title={null} />}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  )
}
