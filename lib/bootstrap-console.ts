export function cbconsole() {
  const t = 'font-size: 1.25em; font-weight: bold; padding: 5px;'
  console.group('%cThanks for coming by! Wanna talk?', t)
  console.log('%c🦋 BlueSky - https://bsky.app/profile/carlosbronze.com.br', t)
  console.log('%c🖥️ Github - https://github.com/bronze', t)
  console.log('%c📝 LinkedIn - https://www.linkedin.com/in/carlosbronze/', t)
  console.log('%c✉️ Email - carlosbronze@gmail.com', t)
  console.groupEnd()
}

// Reference: boosteroid.com console message
//  console.log(`%cWelcome to Boosteroid ❤️`, '\n    padding: 0.4rem 1.5rem; \n    font-family: "Lucida Console"; \n    font-size: 4em; line-height: 1.4em; \n    color: white;\n    border-radius: 10px 50px 50px 10px;\n    background-color: #4158D0; \n    background-image: linear-gradient(43deg, #150947 5%, #460697 50%, #951089 100%);\n')