import { Icon } from '@iconify/react'
// import {SiBluesky, SiGithub, SiOnlyfans} from '@icons-pack/react-simple-icons';
// import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
// import {FaLinkedin} from '@react-icons/all-files/fa/FaLinkedin'
// import { FaMastodon } from '@react-icons/all-files/fa/FaMastodon'
// import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
// import { FaZhihu } from '@react-icons/all-files/fa/FaZhihu'
import { track } from '@vercel/analytics'
import Link from 'next/link'
import * as React from 'react'

// import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
// import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { Button } from '@/components/ui/button'
import * as config from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

// TODO: merge the data and icons from PageSocial with the social links in Footer

export function FooterImpl() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const currentYear = new Date().getFullYear()

  const onToggleDarkMode = React.useCallback(
    (e) => {
      e.preventDefault()
      toggleDarkMode()
    },
    [toggleDarkMode]
  )

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <footer
      className={`footerlinks container max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-3 place-items-center pb-4 max-md:gap-4`}>
      {/* px-4 py-2 w-full flex md:flex-row justify-between items-center flex-col */}
      <div
        className={`${styles.copyright} copyright justify-self-start order-3 md:order-1`}>
        Copyright {currentYear} {config.author}
      </div>

      <div className={`${styles.settings} settings  order-1  md:order-2`}>
        {hasMounted && (
          <a
            className={styles.toggleDarkMode}
            href='#'
            role='button'
            onClick={onToggleDarkMode}
            title='Dark Mode Toggle'>
            {isDarkMode ? (
              <Icon icon='mdi:theme-light-dark' />
            ) : (
              <Icon icon='mdi:theme-light-dark' />
            )}
          </a>
        )}
      </div>

      <div
        className={`${styles.social} w-[50%] md:w-full place-content-between gap-1 social grid place-items-center grid-cols-5 order-2 md:order-3`}>
        {/* {config.twitter && (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${config.twitter}`}
            title={`Twitter @${config.twitter}`}
            rel='noopener noreferrer'>
            <FaTwitter />
          </a>
        )}

        {config.mastodon && (
          <a
            className={styles.mastodon}
            href={config.mastodon}
            title={`Mastodon ${config.getMastodonHandle()}`}
            rel='me'>
            <FaMastodon />
          </a>
        )}

        {config.zhihu && (
          <a
            className={styles.zhihu}
            href={`https://zhihu.com/people/${config.zhihu}`}
            title={`Zhihu @${config.zhihu}`}
            rel='noopener noreferrer'>
            <FaZhihu />
          </a>
        )} */}

        {config.github && (
          <Button
            asChild
            title={`GitHub @${config.github}`}
            rel='noopener noreferrer'
            onClick={() => {
              track('social.github')
            }}>
            <Link href={`https://github.com/${config.github}`}>
              <Icon icon='simple-icons:github' />
            </Link>
          </Button>
        )}
        {config.linkedin && (
          <Button
            asChild
            title={`LinkedIn ${config.author}`}
            rel='noopener noreferrer'
            onClick={() => {
              track('social.linkedin')
            }}>
            <Link href={`https://www.linkedin.com/in/${config.linkedin}`}>
              <Icon icon='simple-icons:linkedin' />
            </Link>
          </Button>
        )}
        {config.bluesky && (
          <Button
            asChild
            title={`BlueSky @${config.bluesky}`}
            rel='noopener noreferrer'
            onClick={() => {
              track('social.bluesky')
            }}>
            <Link href={`https://bsky.app/profile/${config.bluesky}`}>
              <Icon icon='simple-icons:bluesky' />
            </Link>
          </Button>
        )}
        {config.onlyfans && (
          <Button
            asChild
            title={`OnlyFans ${config.author}`}
            rel='noopener noreferrer'
            onClick={() => {
              track('social.onlyfans')
            }}>
            <Link href={`https://www.carlosbronze.com.br/onlyfans`}>
              <Icon icon='simple-icons:onlyfans' />
            </Link>
          </Button>
        )}
        {config.resume && (
          <Button
            asChild
            title={`Resume ${config.author}`}
            rel='noopener noreferrer'
            onClick={() => {
              track('social.resume')
            }}>
            <Link href={`${config.resume}`}>
              <Icon icon='mdi:document' />
            </Link>
          </Button>
        )}
        {config.newsletter && (
          <a
            className={styles.newsletter}
            href={`${config.newsletter}`}
            title={`Newsletter ${config.author}`}
            rel='noopener noreferrer'>
            <Icon icon='fa6-regular:envelope-open' />
          </a>
        )}

        {config.youtube && (
          <a
            className={styles.youtube}
            href={`https://www.youtube.com/${config.youtube}`}
            title={`YouTube ${config.author}`}
            rel='noopener noreferrer'>
            <Icon icon='fa6-brands:youtube' />
          </a>
        )}
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
