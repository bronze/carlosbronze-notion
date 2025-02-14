import type * as types from 'notion-types'
import { IoMenu } from '@react-icons/all-files/io5/IoMenu'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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
            className='p-2 cursor-pointer'>
            {hasMounted && isDarkMode ? (
              <IoMoonSharp className='text-lg' />
            ) : (
              <IoSunnyOutline className='text-lg' />
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

  return (
    <header className='notion-header flex justify-between px-4 py-2'>
      <div className='flex justify-between container items-center max-w-5xl mx-auto w-full'>
        <Breadcrumbs block={block} rootOnly={true} />

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-2'>
          {navigationLinks?.map((link, index) => {
            if (!link.pageId && !link.url) return null

            return link.pageId ? (
              <components.PageLink
                href={mapPageUrl(link.pageId)}
                key={index}
                className='breadcrumb button text-sm font-medium text-muted-foreground hover:text-primary'>
                {link.title}
              </components.PageLink>
            ) : (
              <components.Link
                href={link.url}
                key={index}
                className='text-sm font-medium text-muted-foreground hover:text-primary'>
                {link.title}
              </components.Link>
            )
          })}

          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon'>
                <IoMenu className='text-xl' />
              </Button>
            </DialogTrigger>
            <DialogContent className='p-6 bg-(--bg-color) text-(--fg-color) border-none'>
              <nav className='flex flex-col gap-4 bg-(--bg-color) text-(--fg-color)'>
                {navigationLinks?.map((link, index) => {
                  if (!link.pageId && !link.url) return null

                  return link.pageId ? (
                    <components.PageLink
                      href={mapPageUrl(link.pageId)}
                      key={index}
                      className='text-lg font-medium'>
                      {link.title}
                    </components.PageLink>
                  ) : (
                    <components.Link
                      href={link.url}
                      key={index}
                      className='text-lg font-medium '>
                      {link.title}
                    </components.Link>
                  )
                })}

                <ToggleThemeButton />

                {isSearchEnabled && <Search block={block} title={null} />}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
