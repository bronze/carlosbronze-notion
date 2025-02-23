import React, { Component } from 'react'

const quotes = [
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  },
  {
    quote:
      "In three words I can sum up everything I've learned about life: it goes on.",
    author: 'Robert Frost'
  },
  {
    quote:
      'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    author: 'Winston Churchill'
  },
  { quote: "It's kind of fun to do the impossible.", author: 'Walt Disney' },
  {
    quote:
      'All we have to decide is what to do with the time that is given to us.',
    author: 'J.R.R. Tolkien'
  },
  {
    quote: 'Imagination is the only weapon against reality.',
    author: 'Lewis Carroll'
  },
  {
    quote:
      "You can't go back and change the beginning, but you can start where you are and change the ending.",
    author: 'C. S. Lewis'
  },
  {
    quote:
      'The only way the magic works is by hard work. But hard work can be fun.',
    author: 'Jim Hanson'
  },
  {
    quote: 'Someday you will be old enough to start reading fairy tales again.',
    author: 'C. S. Lewis'
  },
  {
    quote:
      'If you don’t know where you’re going, any road will take you there.',
    author: 'Lewis Carroll'
  },
  {
    quote: 'A goal without a plan is just a wish.',
    author: 'Antoine de Saint-Exupéry'
  },
  {
    quote:
      "Experience is not what happens to you; it's what you do with what happens to you.",
    author: 'Aldous Huxley'
  },
  {
    quote:
      "If the path before you is clear, you're probably on someone else's.",
    author: 'Joseph Campbell'
  }
]

export class HeroHeader extends Component<{ className?: string }> {
  state = {
    quote: '',
    author: ''
  }

  getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  adjustHeroHeader = () => {
    const header = document.querySelector('.notion-header') as HTMLElement
    const footer = document.querySelector('footer') as HTMLElement
    const content = document.querySelector('.notion-page') as HTMLElement
    const heroHeader = document.querySelector('.heroheader') as HTMLElement

    if (!heroHeader) return

    // Get heights of header and footer
    const headerHeight = header ? header.offsetHeight : 0
    const footerHeight = footer ? footer.offsetHeight : 0
    const contentHeight = content ? content.offsetHeight : 0
    console.log(headerHeight, footerHeight, contentHeight)

    // Calculate the new height
    const newHeight = window.innerHeight - (headerHeight + footerHeight + 300)

    // Apply the height to the hero header
    heroHeader.style.minHeight = `${newHeight}px`
  }

  componentDidMount() {
    window.addEventListener('load', this.adjustHeroHeader)
    window.addEventListener('resize', this.adjustHeroHeader)
    this.adjustHeroHeader()

    const { quote, author } = this.getRandomQuote()
    this.setState({ quote, author }, () => {
      const heroHeader = document.querySelector('.heroheader') as HTMLElement
      if (heroHeader) {
        heroHeader.classList.add('loaded')
      }
    })
  }

  componentDidUpdate() {
    this.adjustHeroHeader()
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.adjustHeroHeader)
    window.removeEventListener('resize', this.adjustHeroHeader)
  }

  render() {
    const { quote, author } = this.state
    return (
      <header
        className={
          this.props.className + ' heroheader container max-w-5xl mx-auto '
        }>
        <div className='quotewrapper'>
          <blockquote>
            <p className='quote text-2xl md:text-4xl leading-[1.65] font-bold min-h-[60px]'>
              {quote}
            </p>
          </blockquote>
          <p className='text-lg mt-2 min-h-[30px]'>— {author}</p>
        </div>
      </header>
    )
  }
}

export default HeroHeader
