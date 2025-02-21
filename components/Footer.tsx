import { Icon } from '@iconify/react'
// import {SiBluesky, SiGithub, SiOnlyfans} from '@icons-pack/react-simple-icons';
import { FaEnvelopeOpenText } from '@react-icons/all-files/fa/FaEnvelopeOpenText'
// import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
// import {FaLinkedin} from '@react-icons/all-files/fa/FaLinkedin'
import { FaMastodon } from '@react-icons/all-files/fa/FaMastodon'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube'
import { FaZhihu } from '@react-icons/all-files/fa/FaZhihu'
// import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
// import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import * as React from 'react'

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
    <footer className={`${styles.footer} footerlinks`}>
      {/* px-4 py-2 w-full flex md:flex-row justify-between items-center flex-col */}
      <div className={styles.copyright}>
        Copyright {currentYear} {config.author}
      </div>

      <div className={styles.settings}>
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

      <div className={styles.social}>
        {config.twitter && (
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
        )}

        {config.github && (
          <a
            className={styles.github}
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            rel='noopener noreferrer'>
            <Icon icon='simple-icons:github' />
          </a>
        )}

        {config.linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            rel='noopener noreferrer'>
            <Icon icon='simple-icons:linkedin' />
          </a>
        )}
        {config.bluesky && (
          <a
            className={styles.bluesky}
            href={`https://bsky.app/profile/${config.bluesky}`}
            title={`BlueSky @${config.bluesky}`}
            rel='noopener noreferrer'>
            <Icon icon='simple-icons:bluesky' />
          </a>
        )}
        {config.onlyfans && (
          <a
            className={styles.onlyfans}
            href={`https://www.carlosbronze.com.br/onlyfans`}
            title={`OnlyFans ${config.author}`}
            rel='noopener noreferrer'>
            <Icon icon='simple-icons:onlyfans' />
          </a>
        )}
        {config.resume && (
          <a
            className={styles.resume}
            href={`${config.resume}`}
            title={`Resume ${config.author}`}
            rel='noopener noreferrer'>
            <Icon icon='mdi:document' />
          </a>
        )}

        {config.newsletter && (
          <a
            className={styles.newsletter}
            href={`${config.newsletter}`}
            title={`Newsletter ${config.author}`}
            rel='noopener noreferrer'>
            <FaEnvelopeOpenText />
          </a>
        )}

        {config.youtube && (
          <a
            className={styles.youtube}
            href={`https://www.youtube.com/${config.youtube}`}
            title={`YouTube ${config.author}`}
            rel='noopener noreferrer'>
            <FaYoutube />
          </a>
        )}
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
